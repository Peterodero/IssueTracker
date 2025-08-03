import { Card, Progress, Tag, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function StatusSummary({ data }) {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  
  return (
    <Card 
      title={
        <span>
          Issue Status Summary 
          <Tooltip title="Distribution of issues by their current status">
            <QuestionCircleOutlined style={{ marginLeft: 8 }} />
          </Tooltip>
        </span>
      }
    >
      {data.map((item) => (
        <div key={item.status} style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <Tag color={getStatusColor(item.status)}>{item.status.toUpperCase()}</Tag>
            <span>
              {item.count} ({Math.round((item.count / total) * 100)}%)
            </span>
          </div>
          <Progress 
            percent={Math.round((item.count / total) * 100)}
            strokeColor={getStatusColor(item.status)}
            showInfo={false}
            strokeLinecap="round"
          />
        </div>
      ))}
      <div style={{ marginTop: 16, fontWeight: 500 }}>
        Total Issues: {total}
      </div>
    </Card>
  );
}

function getStatusColor(status) {
  const colors = {
    open: 'gold',
    pending: 'orange',
    in_progress: 'blue',
    resolved: 'green',
    closed: 'gray',
    rejected: 'red'
  };
  return colors[status.toLowerCase()] || 'purple';
}