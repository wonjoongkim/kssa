import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import greetings from '../../images/greetings.jpg';
import '../../Style.css';

const { Title, Paragraph, Text, Link } = Typography;
const { Sider, Content } = Layout;

export const Intro_Greetings = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('greetings');
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
            <Menu.Item key="greetings" onClick={() => handleMenuClick('greetings')}>
                원장인사 {selectedMenu === 'greetings' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="organization" onClick={() => handleMenuClick('organization')}>
                조직도 {selectedMenu === 'organization' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="facilities" onClick={() => handleMenuClick('facilities')}>
                교육시설 {selectedMenu === 'facilities' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="directions" onClick={() => handleMenuClick('directions')}>
                오시는길 {selectedMenu === 'directions' && <CaretRightOutlined />}
            </Menu.Item>
        </>
    );

    return (
        <Layout style={{ minHeight: '40vw' }}>
            {!isMobileView && (
                <Sider width={230} theme="light">
                    <Card
                        type="inner"
                        style={{ width: '225px' }}
                        title={<span style={{ fontWeight: 'bold', color: 'white', marginLeft: '30px' }}>교육원소개</span>}
                        headStyle={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', backgroundColor: '#215482' }}
                    >
                        <Menu
                            mode="vertical"
                            selectedKeys={[selectedMenu]}
                            style={{ borderRight: 0, fontWeight: '900' }}
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
                                    title={<span style={{ fontWeight: 'bold' }}>교육원소개</span>}
                                >
                                    <Button
                                        onClick={() => handleMenuClick('greetings')}
                                        style={{
                                            margin: '8px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'greetings' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        원장인사 {selectedMenu === 'greetings' && '▼'}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('organization')}
                                        style={{
                                            margin: '8px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'organization' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        조직도 {selectedMenu === 'organization' && '▼'}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('facilities')}
                                        style={{
                                            margin: '8px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'facilities' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        교육시설 {selectedMenu === 'facilities' && '▼'}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('directions')}
                                        style={{
                                            margin: '8px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'directions' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        오시는길 {selectedMenu === 'directions' && '▼'}
                                    </Button>
                                </Card>
                            </Col>
                        )}
                        <Col xs={{ span: 24, order: 1 }} sm={{ span: 8, order: isMobileView ? 1 : 4 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={greetings} alt="" style={{ width: '88%' }} />
                            </div>
                        </Col>

                        <Col xs={{ span: 24, order: 2 }} sm={{ span: 14, order: isMobileView ? 2 : 3 }} style={{ marginLeft: '30px' }}>
                            <div>
                                <Typography>
                                    <Paragraph>
                                        <Title level={3}>항공보안 웹기반 CBT 서버</Title>
                                        <Title level={4}>최첨단 교육환경을 갖춘 선도적 교육기관!</Title>
                                    </Paragraph>
                                    <br />

                                    <Paragraph>
                                        안녕하십니까? <br />
                                        <br />
                                        한국보안인재개발원을 찾아주셔서 감사드립니다.
                                    </Paragraph>
                                    <Paragraph>
                                        항공보안 분야 전문가들로 구성된 “대한민국항공보안협회”가 웹기반 CBT 최고의 기술을 보유하고 있는 ㈜
                                        준 과의 협약으로 보안전문 교육기관을 설립하게 되었습니다.
                                    </Paragraph>
                                    <Paragraph>
                                        최근 공항에서 빈번히 발생하고 있는 보안검색 실패는 이제는 더 이상 구형 CBT(Computer based
                                        Training)를 PC에 설치하여 교육하는 방식으로는 한계에 이르렀습니다.
                                    </Paragraph>
                                    <Paragraph>
                                        한국보안인재개발원은 보안검색 교육의 혁신 필요성을 인식하고 CBT 서버 프로그램에 수십명, 수백명이
                                        동시에 접속하여, 교육생 필요 수 만큼 CBT 프로그램으로 반복 학습할 수 있도록 하였습니다.
                                    </Paragraph>
                                    <Paragraph>
                                        전  현직의 우수한 보안전문 강사진과 앞서가는 기술력으로 언제든지 웹기반 CBT 서버 프로그램에
                                        교육생이 접속하여 학습할 수 있는 최상의 교육 환경과 맞춤형 교육을 실현할 수 있는 교육기관입니다.
                                    </Paragraph>
                                    <Paragraph>
                                        이러한 보안전문 프로그램을 통해 학생들의 학습 효과를 극대화하고, 항공보안 검색분야에서 향후 항만 
                                        관세 등 보안 분야의 선도적인 역활을 수행하는 교육기관이 되겠습니다.
                                    </Paragraph>
                                    <Paragraph>감사합니다.</Paragraph>

                                    <br />
                                    <br />
                                    <Paragraph style={{ letterSpacing: '1px' }}>
                                        <Title level={4}>한국보안인재개발원장 서일수</Title>
                                    </Paragraph>
                                </Typography>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};
