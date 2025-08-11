import { Card, Progress, Tag, Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export default function StatusSummary({ data }) {
  // const total = data.reduce((sum, item) => sum + item.count, 0);
  console.log(data.total_issues)
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
      {/* {data.map((item) => ( */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <Tag color={getStatusColor("UNRESOLVED")}>UNRESOLVED ISSUES</Tag>
            <span>
              {data.unresolved_issues} {data.unresolved_issues && `(${Math.round((data.unresolved_issues / data.total_issues) * 100)}%)`}
            </span>
          </div>
          <Progress 
            percent={data.unresolved_issues && Math.round((data.unresolved_issues  / data.total_issues) * 100)}
            strokeColor={getStatusColor("UNRESOLVED")}
            showInfo={false}
            strokeLinecap="round"
          />
        </div>
         <div style={{ marginBottom: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
            <Tag color={getStatusColor("RESOLVED")}>RESOLVED ISSUES</Tag>
            <span>
              {data.resolved_issues} {data.resolved_issues && `(${Math.round((data.unresolved_issues / data.total_issues) * 100)}%)`}
            </span>
          </div>
          <Progress 
            percent={data.unresolved_issues && Math.round((data.resolved_issues / data.total_issues) * 100)}
            strokeColor={getStatusColor("RESOLVED")}
            showInfo={false}
            strokeLinecap="round"
          />
        </div>
      <div style={{ marginTop: 16, fontWeight: 500 }}>
        Total Issues: {data.total_issues ? data.total_issues : 0}
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