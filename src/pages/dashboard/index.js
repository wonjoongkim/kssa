// material-ui
import { Typography } from '@mui/material';
import { Card, Row, Col } from 'antd';
import { NotificationOutlined } from '@ant-design/icons';

// project import
import MainCard from 'components/MainCard';

// project import

// ==============================|| DASHBOARD - DEFAULT ||============================== //

const DashboardDefault = () => {
    return (
        <MainCard>
            <Row justify="space-around" gutter={[16, 16]}>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Card
                        type="inner"
                        title={
                            <span style={{ color: '#00b0f0', fontWeight: 'bold' }}>
                                <NotificationOutlined /> 교육안내
                            </span>
                        }
                        extra={<a href="#">More</a>}
                    >
                        <Row gutter={24} style={{ margin: '20px 0px' }}>
                            <Col span={18}>23년 6월 공항/항공사 보안검색요원 초기교육</Col>
                            <Col span={6}>2023.05.29</Col>
                        </Row>
                        <Row gutter={24} style={{ margin: '20px 0px' }}>
                            <Col span={18}>23년 6월 공항/항공사 보안검색요원 초기교육</Col>
                            <Col span={6}>2023.05.29</Col>
                        </Row>
                        <Row gutter={24} style={{ margin: '20px 0px' }}>
                            <Col span={18}>23년 6월 공항/항공사 보안검색요원 초기교육</Col>
                            <Col span={6}>2023.05.29</Col>
                        </Row>
                        <Row gutter={24} style={{ margin: '20px 0px' }}>
                            <Col span={18}>23년 6월 공항/항공사 보안검색요원 초기교육</Col>
                            <Col span={6}>2023.05.29</Col>
                        </Row>
                        <Row gutter={24} style={{ margin: '20px 0px' }}>
                            <Col span={18}>23년 6월 공항/항공사 보안검색요원 초기교육</Col>
                            <Col span={6}>2023.05.29</Col>
                        </Row>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={12} lg={12} xl={12}>
                    <Card
                        type="inner"
                        title={
                            <span style={{ color: '#00b0f0', fontWeight: 'bold' }}>
                                <NotificationOutlined /> 공지사항
                            </span>
                        }
                        extra={<a href="#">More</a>}
                    >
                        <Row gutter={24} style={{ margin: '20px 0px' }}>
                            <Col span={18}>23년 6월 공항/항공사 보안검색요원 초기교육</Col>
                            <Col span={6}>2023.05.29</Col>
                        </Row>
                        <Row gutter={24} style={{ margin: '20px 0px' }}>
                            <Col span={18}>23년 6월 공항/항공사 보안검색요원 초기교육</Col>
                            <Col span={6}>2023.05.29</Col>
                        </Row>
                        <Row gutter={24} style={{ margin: '20px 0px' }}>
                            <Col span={18}>23년 6월 공항/항공사 보안검색요원 초기교육</Col>
                            <Col span={6}>2023.05.29</Col>
                        </Row>
                        <Row gutter={24} style={{ margin: '20px 0px' }}>
                            <Col span={18}>23년 6월 공항/항공사 보안검색요원 초기교육</Col>
                            <Col span={6}>2023.05.29</Col>
                        </Row>
                        <Row gutter={24} style={{ margin: '20px 0px' }}>
                            <Col span={18}>23년 6월 공항/항공사 보안검색요원 초기교육</Col>
                            <Col span={6}>2023.05.29</Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </MainCard>
    );
};

export default DashboardDefault;
