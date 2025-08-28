import { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import StatusSummary from "./StatusSummary";
import CreationTrends from "./CreationTrend";
import DistributionCharts from "./DistributionCharts";
import ResolutionMetrics from "./ResolutionMetrics";
import ActivityFeed from "./ActivityFeed";
import OfficeHeatmap from "./ServiceHeatmap";
import { authFetch, getAnalytics, url } from "../../util/http";
import SaccoHeatmap from "./SaccoHeatmap";
import ServiceHeatmap from "./ServiceHeatmap";

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState({
    latest_issues: [],
    sacco_analytics: [],
    service_analytics: [],
    summary: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAnalytics();
        setAnalyticsData(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function handleDeleteSacco(id) {
    const response = await authFetch(url + "/saccos/delete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to resolve issue");
    }

    const resData = await response.json();

    setLoading(true);
    await getAnalytics();
    setLoading(false);
    return resData;
  }

  async function handleDeleteService(id) {
    const response = await authFetch(url + "/services/delete/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to delete service");
    }

    const resData = await response.json();

    setLoading(true);
    await getAnalytics();
    setLoading(false);
    return resData;
  }

  if (loading) {
    return (
      <div className="flex items-start justify-center h-screen w-screen fixed top-30 left-0">
        <Spin size="large" className="text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-black border-b-2 border-orange-300 pb-2 inline-block">
            Analytics Dashboard
          </h2>
        </div>
        {/* Dashboard Content */}
        <Row gutter={[24, 24]}>
          {/* Top Row */}
          <Col xs={24} md={8} lg={12}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <StatusSummary data={analyticsData.summary} />
            </div>
          </Col>

          <Col xs={24} md={8} lg={12}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <ResolutionMetrics
                resolutionRate={analyticsData.summary.resolution_rate}
              />
            </div>
          </Col>

          {/* Bottom Row */}
          <Col xs={24} lg={12}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <ActivityFeed activities={analyticsData.latest_issues} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="flex flex-col gap-5 bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <div>
                <SaccoHeatmap
                  saccos={analyticsData.sacco_analytics}
                  handleDeleteSacco={handleDeleteSacco}
                />
              </div>
              <div>
                <ServiceHeatmap
                  services={analyticsData.service_analytics}
                  handleDeleteService={handleDeleteService}
                />
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}
