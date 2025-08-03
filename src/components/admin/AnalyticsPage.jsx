import { useEffect, useState } from "react";
import { Row, Col, Spin } from "antd";
import StatusSummary from "./StatusSummary";
import CreationTrends from "./CreationTrend";
import DistributionCharts from "./DistributionCharts";
import ResolutionMetrics from "./ResolutionMetrics";
import ActivityFeed from "./ActivityFeed";
import OfficeHeatmap from "./OfficeHeatmap";
// import { getAnalytics } from '../../util/http';
import { mockGetAnalytics } from "../../data/model";
import LoadingIndicator from "../UI/LoadingIndicator";

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
      <div className="md:ml-100 ml-45">
        <Spin size="large" />;
      </div>
    );

    // return <LoadingIndicator/>
  }

  return (
    <div className="analytics-container">
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h1 className="text-center">Analytics</h1>
        </Col>

        {/* Top Row */}
        <Col xs={24} md={12} lg={8}>
          <StatusSummary data={data.status_counts} />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <CreationTrends data={data.issues_created} />
        </Col>
        <Col xs={24} md={12} lg={8}>
          <ResolutionMetrics avgTime={data.avg_resolution_time} />
        </Col>

        {/* Middle Row */}
        {/* <Col span={24}>
          <DistributionCharts 
            offices={data.office_distribution}
            services={data.service_distribution}
          />
        </Col> */}

        {/* Bottom Row */}
        <Col xs={24} lg={12}>
          <ActivityFeed activities={data.recent_activity} />
        </Col>
        <Col xs={24} lg={12}>
          <OfficeHeatmap offices={data.office_distribution} />
        </Col>
      </Row>
    </div>
  );
}
