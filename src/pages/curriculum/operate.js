import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography, Table, Image } from 'antd';
import { CaretRightOutlined, AppstoreOutlined, BlockOutlined, RightCircleFilled, AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import facilities from '../../images/facilities.png';

import '../../Style.css';

const { Title, Paragraph, Text, Link } = Typography;
const { Sider, Content } = Layout;

export const Curriculum_Operate = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('operate');
    const [isMobileView, setIsMobileView] = useState(false);

    const handleMenuClick = (menuKey) => {
        setSelectedMenu(menuKey);
        navigate('/' + menuKey);
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const menuItems = (
        <>
            <Menu.Item key="security" onClick={() => handleMenuClick('security')}>
                보안검색 교육과정 {selectedMenu === 'security' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="airline" onClick={() => handleMenuClick('airline')}>
                항공경비 교육과정 {selectedMenu === 'airline' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="operate" onClick={() => handleMenuClick('operate')}>
                정원 및 운영계획 {selectedMenu === 'operate' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="admission" onClick={() => handleMenuClick('admission')}>
                입교절차 {selectedMenu === 'admission' && <CaretRightOutlined />}
            </Menu.Item>
        </>
    );

    return (
        <Layout>
            {!isMobileView && (
                <Sider width={230} theme="light">
                    <Card
                        type="inner"
                        style={{ width: '225px' }}
                        title={<span style={{ fontWeight: 'bold', color: 'white', marginLeft: '30px' }}>교육과정</span>}
                        headStyle={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', backgroundColor: '#599bc4' }}
                    >
                        <Menu
                            mode="vertical"
                            selectedKeys={[selectedMenu]}
                            style={{ borderRight: 0 }}
                            onClick={() => setIsMobileView(false)}
                        >
                            {menuItems}
                        </Menu>
                    </Card>
                </Sider>
            )}
            <Layout style={{ background: '#ffffff' }}>
                <Content>
                    <Row gutter={[24, 24]}>
                        {isMobileView && (
                            <Col span={24}>
                                <Card
                                    type="inner"
                                    style={{ width: '100%', marginBottom: '24px' }}
                                    title={<span style={{ fontWeight: 'bold' }}>교육과정</span>}
                                >
                                    <Button
                                        onClick={() => handleMenuClick('security')}
                                        style={{
                                            margin: '0px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'security' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        보안검색 {selectedMenu === 'security' && '▼'}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('airline')}
                                        style={{
                                            margin: '0px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'airline' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        항공경비 {selectedMenu === 'airline' && '▼'}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('operate')}
                                        style={{
                                            margin: '0px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'operate' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        정원 및 운영계획 {selectedMenu === 'operate' && '▼'}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('admission')}
                                        style={{
                                            margin: '0px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'admission' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        입교절차 {selectedMenu === 'admission' && '▼'}
                                    </Button>
                                </Card>
                            </Col>
                        )}

                        <Col
                            xs={{
                                span: 24,
                                offset: 1
                            }}
                            lg={{
                                span: 21,
                                offset: 2
                            }}
                            style={{ marginLeft: '30px' }}
                        >
                            <Title level={3}>
                                <BlockOutlined /> 정원 및 운영계획
                            </Title>
                        </Col>
                        <Col
                            xs={{
                                span: 24,
                                offset: 1
                            }}
                            lg={{
                                span: 21,
                                offset: 2
                            }}
                            style={{ marginLeft: '45px' }}
                        >
                            <div>
                                <div style={{ marginLeft: '20px' }}>
                                    <p style={{ marginBottom: '50px' }}>
                                        <Title level={5}>
                                            <RightCircleFilled /> 교육생 정원
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    항공보안검색요원 초기교육과정 : 30명 이내
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    항공보안검색요원 정기교육과정 : 30명 이내
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    항공보안검색요원 인증평가 : 30명 이내
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    항공경비요원 초기교육과정 : 30명 이내
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    항공경비요원 정기교육과정 : 30명 이내
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    항공경비요원 인증평가 : 30명 이내
                                                </li>
                                            </ul>
                                        </Paragraph>
                                    </p>
                                    <p style={{ marginBottom: '50px' }}>
                                        <Title level={5}>
                                            <RightCircleFilled /> 교육과정 개설 기준
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    최소 7일 전 입교신청서 및 인재개발원 요구 서류 제출
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    업체/기관 위탁의 경우 최소 3주 전 교육개설의뢰 상담 후 공문 접수
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    한국보안인재개발원 교육계획 및 교육 인원에 의거 교육개설 확정
                                                </li>
                                            </ul>
                                        </Paragraph>
                                    </p>
                                    <p style={{ marginBottom: '50px' }}>
                                        <Title level={5}>
                                            <RightCircleFilled /> 입교기준
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    관계 법령에 의한 자격기준에 부합하는 자
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    보안검색업체 또는 위탁업체 소속직원인 자
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    시력, 색맹, 청력 등의 장애가 없는 자
                                                </li>
                                            </ul>
                                        </Paragraph>
                                    </p>
                                    <p style={{ marginBottom: '50px' }}>
                                        <Title level={5}>
                                            <RightCircleFilled /> 입교대상
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    공항운영자 또는 항공운송사업자가 지정 또는 지정 예정인 보안감독자
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    특수경비업체 소속으로 보안업무를 수행하는 사람 또는 예정된 사람
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    보안장비 유지보수 업무를 수행하는 사람 또는 예정된 사람
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    기관 업체에서 보안업무에 종사하는 사람
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    기타 인재개발원에서 입교가 가능하다고 인정하는 사람
                                                </li>
                                            </ul>
                                        </Paragraph>
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};
