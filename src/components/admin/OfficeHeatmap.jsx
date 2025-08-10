import { Card, Row, Col, Tooltip } from 'antd';
import { HeatMapOutlined } from '@ant-design/icons';

export default function OfficeHeatmap({ offices }) {
  // // Generate mock heatmap data (replace with real data from API)
  // const heatmapData = offices.map(office => ({
  //   name: office.office__name,
  //   value: office.count,
  //   intensity: Math.min(100, Math.round((office.count / Math.max(...offices.map(o => o.count))) * 100))
  // }));

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
        {offices.map((office, index) => (
          <Col key={index} xs={12} sm={6} md={6} lg={8}>
            <Tooltip title={`${office.office_name}: ${office.total_issues} issues`}>
              <div style={{ 
                backgroundColor: getIntensityColor(office.intensity),
                padding: '12px 5px',
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
                <span className='text-sm text-black'>{office.office_name}</span><br></br>
                {`${office.total_issues} issues`}
              </div>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </Card>
  );
}