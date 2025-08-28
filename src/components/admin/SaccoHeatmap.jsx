import { Card, Row, Col, Tooltip } from 'antd';
import { HeatMapOutlined } from '@ant-design/icons';

export default function SaccoHeatmap({ saccos,handleDeleteSacco }) {

  const getIntensityColor = (intensity) => {
    if (intensity > 80) return '#f5222d';
    if (intensity > 60) return '#fa8c16';
    if (intensity > 40) return '#faad14';
    if (intensity > 20) return '#a0d911';
    return ' #88E788';
  };

  return (
    <Card 
      title={
        <span>
          <HeatMapOutlined style={{ marginRight: 8 }} />
          Sacco Activity Heatmap
        </span>
      }
    
    >
      <Row gutter={[16, 16]}>
        {saccos.map((sacco, index) => (
          <Col key={index} xs={12} sm={6} md={8} lg={12}>
            <Tooltip title={`${sacco.sacco_name}: ${sacco.total_issues} issues`}>
              <div style={{ 
                backgroundColor: getIntensityColor(sacco.intensity),
                padding: '10px 5px',
                borderRadius: 4,
                display: 'flex',
                flexDirection: 'column',
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
                <span className='text-sm text-black'>{sacco.sacco_name}</span><br></br>
                <span className='text-sm text-gray-500'>{`${sacco.total_issues} issues`}</span>
                <button className=' items-center text-red-500 mt-2' onClick={()=>handleDeleteSacco(sacco.sacco_id)}>Delete</button>
              </div>
            </Tooltip>
          </Col>
        ))}
      </Row>
    </Card>
  );
}