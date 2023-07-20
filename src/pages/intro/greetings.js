import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import greetings from '../../images/greetings.jpg';

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
                                    title={<span style={{ fontWeight: 'bold' }}>교육원소개</span>}
                                >
                                    <Button
                                        onClick={() => handleMenuClick('greetings')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'greetings' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        원장인사 {selectedMenu === 'greetings' && <CaretRightOutlined />}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('organization')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'organization' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        조직도 {selectedMenu === 'organization' && <CaretRightOutlined />}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('facilities')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'facilities' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        교육시설 {selectedMenu === 'facilities' && <CaretRightOutlined />}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('directions')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'directions' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        오시는길 {selectedMenu === 'directions' && <CaretRightOutlined />}
                                    </Button>
                                </Card>
                            </Col>
                        )}
                        <Col xs={{ span: 24, order: 2 }} sm={{ span: 8, order: isMobileView ? 1 : 3 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={greetings} alt="" style={{ width: '87%' }} />
                            </div>
                        </Col>

                        <Col xs={{ span: 24, order: 1 }} sm={{ span: 16, order: isMobileView ? 2 : 4 }}>
                            <div>
                                <Typography>
                                    <Title level={4}>최첨단 교육환경을 갖춘 선도적 교육기관!</Title>
                                    <br />
                                    <Paragraph>
                                        안녕하십니까? <br />
                                        <br />
                                        한국보안인재개발원을 찾아주셔서 감사드립니다.
                                        <br />
                                        항공보안 분야 전문가들로 구성된 “대한민국항공보안협회”는 인공지능(AI) 기반 Web CBT(Computer based
                                        Training)를 보유하고 있는 ㈜준과 협업하여 항공보안 전문교육기관인 한국보안인재개발원을 설립하게
                                        되었습니다.
                                        <br />
                                        최근 공항에서 빈번하게 발생하고 있는 다양한 ***, *** 등의 보안검색 문제는 기존 CBT
                                        교육프로그램만으로는 한계에 이르고 있음을 반증하고 있습니다.
                                    </Paragraph>
                                    <Paragraph>
                                        본 인재개발원은
                                        <br />
                                        <br />
                                        <Text strong>첫 번째,</Text> AI X-Ray 이미지 합성 기술을 적용하여 수억장의 X-Ray 이미지로 훈련할 수
                                        있는 이미지를 제공하고, AI 3D X-Ray 생성 기술을 적용하여 다양한 각도에서 X-Ray 이미지를 반복학습할
                                        수 있는 X-Ray 영상이미비를 제공합니다.
                                    </Paragraph>
                                    <Paragraph>
                                        <Text strong>두 번째,</Text> AI 강화학습 기술을 적용하여 교육생별 X-Ray 이미지 학습능력, 이미지
                                        분석능력 등을 고려하여 부족한 X-Ray 이미지에 대한 강화학습 훈련을 적용함으로서 X-Ray 판독기술을 상향
                                        평준화하여 교육생을 배출하겠습니다.
                                    </Paragraph>
                                    <Paragraph>
                                        <Text strong>세 번째,</Text> 현재 공항에서 운영하고 있는 양방향 X-Ray 장비를 교육현장에서 실습하고
                                        운영할 수 있는 기술 교육을 실시하고, X-Ray 학습이미지도 양방향 X-Ray와 동일한 정면과 측면의 X-Ray
                                        이미지를 통해 교육을 현실화 하겠습니다.
                                    </Paragraph>
                                    <Paragraph>
                                        <Text strong>네 번째,</Text> EOD(Explosive Ordnance Disposal) 장비를 구비하여 폭발물처리장치의
                                        활용방법에 대한 확장교육을 실시하겠습니다.
                                    </Paragraph>
                                    <Paragraph>
                                        <Text strong>다섯 번째,</Text> 전·현직의 우수한 보안전문 강사진과 앞서가는 기술력으로 언제든지
                                        웹기반 CBT 서버 프로그램에 교육생이 접속하여 학습할 수 있는 최상의 교육 환경과 맞춤형 교육을
                                        실현하였습니다. 인재개발원은 최첨단 시설과 솔루션을 통해 전세계에서 가장 우수한 보안검색인력을
                                        배출할 수 있는 항공보안과 안전에 밑거름이 될 수 있는 보안전문교육기기관으로서 선도적인 역활을
                                        수행하겠습니다.
                                    </Paragraph>
                                    <Paragraph>감사합니다.</Paragraph>
                                    <br />
                                    <Paragraph>
                                        <Title level={5}>한국보안인재개발원 원장 서일수</Title>
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
