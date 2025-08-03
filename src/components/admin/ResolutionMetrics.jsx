import { Card, Statistic, Progress, Tooltip } from 'antd';
import { ClockCircleOutlined, CheckCircleOutlined } from '@ant-design/icons';

export default function ResolutionMetrics({ avgTime }) {
  const targetResolutionTime = 24; // Your target in hours
  
  const resolutionRate = Math.min(100, Math.round((targetResolutionTime / avgTime) * 100));
  
  return (
    <Card title="Resolution Metrics" >
      <Statistic
        title="Avg. Resolution Time"
        value={avgTime.toFixed(1)}
        suffix="hours"
        prefix={<ClockCircleOutlined />}
        style={{ marginBottom: 24 }}
      />
      
      <div style={{ marginBottom: 8 }}>
        <span style={{ marginRight: 8 }}>Target Achievement</span>
        <Tooltip title={`${resolutionRate}% of issues resolved within ${targetResolutionTime} hours`}>
          <span style={{ fontWeight: 500 }}>{resolutionRate}%</span>
        </Tooltip>
      </div>
      
      <Progress
        percent={resolutionRate}
        status={resolutionRate >= 90 ? 'success' : resolutionRate >= 70 ? 'normal' : 'exception'}
        strokeColor={resolutionRate >= 90 ? '#52c41a' : '#1890ff'}
      />
      
      <div style={{ marginTop: 16 }}>
        <CheckCircleOutlined style={{ color: '#52c41a', marginRight: 8 }} />
        <span>Target: {targetResolutionTime} hours</span>
      </div>
    </Card>
  );
}