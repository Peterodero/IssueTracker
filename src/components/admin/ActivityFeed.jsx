import { Card, List, Tag, Avatar } from "antd";
import {
  ClockCircleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import moment from "moment";

export default function ActivityFeed({ activities }) {
  const getActivityIcon = (status) => {
    switch (status) {
      case "open":
        return <ExclamationCircleOutlined style={{ color: "#faad14" }} />;
      case "resolved":
        return <CheckCircleOutlined style={{ color: "#52c41a" }} />;
      default:
        return <ClockCircleOutlined style={{ color: "#1890ff" }} />;
    }
  };

  return (
    <Card title="Recent Activity">
      <List
        itemLayout="horizontal"
        dataSource={activities}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={
                <span>
                  {getActivityIcon(item.status)}
                  <span style={{ marginLeft: 8 }}>Issue - {item.type}</span>
                  <div className="flex flex-row items-center gap-2 m-2">
                    <label className="text-lg">Description : </label>
                    <span>{item.description}</span>
                  </div>
                </span>
              }
              description={
                <span>
                  <Tag color={getStatusColor(item.status)}>
                    {item.status.toUpperCase()}
                  </Tag>
                  Posted {moment(item.created_at).fromNow()}
                </span>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

// Reuse from StatusSummary.js
function getStatusColor(status) {
  const colors = {
    open: "gold",
    pending: "orange",
    in_progress: "blue",
    resolved: "green",
    closed: "gray",
    rejected: "red",
  };
  return colors[status.toLowerCase()] || "purple";
}
