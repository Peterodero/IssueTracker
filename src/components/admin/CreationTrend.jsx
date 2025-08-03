import { Card, Statistic, Row, Col } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import Trend from 'react-trend';

export default function CreationTrends({ data }) {
  // Sample trend data (in a real app, you'd get this from your API)
  const trendData = [5, 12, 8, 15, 20, 25, 18];
  
  const weekVsMonth = data.week / (data.month / 4); // Compare weekly rate to monthly average
  
  return (
    <Card 
      title="Issue Creation Trends" 
      extra={<InfoCircleOutlined />}
    >
      <Row gutter={16}>
        <Col span={8}>
          <Statistic 
            title="Today" 
            value={data.today}
            prefix={<ArrowUpOutlined />}
            valueStyle={{ color: '#3f8600' }}
          />
        </Col>
        <Col span={8}>
          <Statistic 
            title="This Week" 
            value={data.week}
          />
        </Col>
        <Col span={8}>
          <Statistic 
            title="This Month" 
            value={data.month}
            valueStyle={{ color: weekVsMonth > 1.1 ? '#3f8600' : '#cf1322' }}
            prefix={weekVsMonth > 1.1 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          />
        </Col>
      </Row>
      
      <div style={{ marginTop: 20, height: 80 }}>
        <Trend
          smooth
          autoDraw
          autoDrawDuration={3000}
          autoDrawEasing="ease-out"
          data={trendData}
          gradient={['#1890ff', '#52c41a']}
          radius={10}
          strokeWidth={2}
          strokeLinecap={'round'}
        />
      </div>
    </Card>
  );
}