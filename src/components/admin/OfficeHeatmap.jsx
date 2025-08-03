import { Card, Row, Col, Tooltip } from 'antd';
import { HeatMapOutlined } from '@ant-design/icons';

export default function OfficeHeatmap({ offices }) {
  // Generate mock heatmap data (replace with real data from API)
  const heatmapData = offices.map(office => ({
    name: office.office__name,
    value: office.count,
    intensity: Math.min(100, Math.round((office.count / Math.max(...offices.map(o => o.count))) * 100))
  }));

  const getIntensityColor = (intensity) => {
    if (intensity > 80) return '#f5222d';
    if (intensity > 60) return '#fa8c16';
    if (intensity > 40) return '#faad14';
    if (intensity > 20) return '#a0d911';
    return '#52c41a';
  };

  return (
    <Card 
      title={
        <span>
          <HeatMapOutlined style={{ marginRight: 8 }} />
          Office Activity Heatmap
        </span>
      }
    
    >
      <Row gutter={[16, 16]}>
        {heatmapData.map((office, index) => (
          <Col key={index} xs={12} sm={8} md={6} lg={4}>
            <Tooltip title={`${office.name}: ${office.value} issues`}>
              <div style={{ 
                backgroundColor: getIntensityColor(office.intensity),
                padding: '12px 0',
                borderRadius: 4,
                textAlign: 'center',
                color: '#fff',
                fontWeight: 'bold',
                opacity: 0.8,
                transition: 'all 0.3s',
                cursor: 'pointer',
                ':hover': {
                  opacity: 1,
                  transform: 'scale(1.05)'
                }
              }}>
                {office.name}
              </div>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </Card>
  );
}