// components/analytics/DistributionCharts.js
import { Card, Tabs } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';
import SafeChart from './SafeChart';

const { TabPane } = Tabs;

export default function DistributionCharts({ offices, services }) {
  const officeData = {
    labels: offices.map(o => o.office__name || 'Unknown'),
    datasets: [{
      data: offices.map(o => o.count),
      backgroundColor: [
        '#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'
      ],
      borderWidth: 1
    }]
  };

  const serviceData = {
    labels: services.map(s => s.service__name || 'Unknown'),
    datasets: [{
      data: services.map(s => s.count),
      backgroundColor: [
        '#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1'
      ],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((context.raw / total) * 100);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      }
    }
  };

  return (
    <Card bordered={false}>
      <Tabs defaultActiveKey="1" destroyInactiveTabPane>
        <TabPane
          tab={<span><AppstoreOutlined /> By Office</span>}
          key="1"
        >
          <div style={{ height: 300 }}>
            <SafeChart
              type="pie" 
              data={officeData} 
              options={options}
            />
          </div>
        </TabPane>
        <TabPane
          tab={<span><BarsOutlined /> By Service</span>}
          key="2"
        >
          <div style={{ height: 300 }}>
            <SafeChart 
              type="bar" 
              data={serviceData} 
              options={options}
            />
          </div>
        </TabPane>
      </Tabs>
    </Card>
  );
}