import { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import StatusSummary from "./StatusSummary";
import CreationTrends from "./CreationTrend";
import DistributionCharts from "./DistributionCharts";
import ResolutionMetrics from "./ResolutionMetrics";
import ActivityFeed from "./ActivityFeed";
import OfficeHeatmap from "./OfficeHeatmap";
import {getAnalytics} from "../../util/http"

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = useState({
    latest_issues: [],
    office_analytics:  [],
    service_analytics: [],
    summary:  {}
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

  if (loading) {
    return (
      <div className="flex items-start justify-center min-h-screen md:ml-150">
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
          <Col xs={24} md={12} lg={12}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <StatusSummary data={analyticsData.summary} />
            </div>
          </Col>
          {/* <Col xs={24} md={12} lg={8}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <CreationTrends data={data.issues_created} />
            </div>
          </Col> */}
          <Col xs={24} md={12} lg={12}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <ResolutionMetrics resolutionRate={analyticsData.summary.resolution_rate} />
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
              <ActivityFeed activities={analyticsData.latest_issues} />
            </div>
          </Col>
          <Col xs={24} lg={12}>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 h-full">
              <OfficeHeatmap offices={analyticsData.office_analytics} />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}