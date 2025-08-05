import { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import StatusSummary from "./StatusSummary";
import CreationTrends from "./CreationTrend";
import DistributionCharts from "./DistributionCharts";
import ResolutionMetrics from "./ResolutionMetrics";
import ActivityFeed from "./ActivityFeed";
import OfficeHeatmap from "./OfficeHeatmap";
import { mockGetAnalytics } from "../../data/model";

export default function AnalyticsPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await mockGetAnalytics();
        setData(response.data);
      } catch (error) {
        console.error("Error fetching analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen md:ml-150">
        <Spin size="large" className="text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black border-b-2 border-orange-300 pb-2 inline-block">
            Analytics Dashboard
          </h1>
        </div>

        {/* Dashboard Content */}
        <Row gutter={[24, 24]}>
          {/* Top Row */}
          <Col xs={24} md={12} lg={8}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <StatusSummary data={data.status_counts} />
            </div>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <CreationTrends data={data.issues_created} />
            </div>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <ResolutionMetrics avgTime={data.avg_resolution_time} />
            </div>
          </Col>

          {/* <Col span={24}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <DistributionCharts 
                offices={data.office_distribution}
                services={data.service_distribution}
              />
            </div>
          </Col> */}

          {/* Bottom Row */}
          <Col xs={24} lg={12}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <ActivityFeed activities={data.recent_activity} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <OfficeHeatmap offices={data.office_distribution} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}