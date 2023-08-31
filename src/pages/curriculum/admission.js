import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography, Table, Image } from 'antd';
import { CaretRightOutlined, AppstoreOutlined, BlockOutlined, RightCircleFilled, AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import facilities from '../../images/facilities.png';

import '../../Style.css';

const { Title, Paragraph, Text, Link } = Typography;
const { Sider, Content } = Layout;

export const Curriculum_Admission = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('admission');
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
                보안검색 교육과정{selectedMenu === 'security' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="airline" onClick={() => handleMenuClick('airline')}>
                항공경비 교육과정{selectedMenu === 'airline' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="operate" onClick={() => handleMenuClick('operate')}>
                정원 및 운영계획{selectedMenu === 'operate' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="admission" onClick={() => handleMenuClick('admission')}>
                입교절차{selectedMenu === 'admission' && <CaretRightOutlined />}
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
                        title={<span style={{ fontWeight: 'bold', color: 'white', marginLeft: '50px' }}>교육과정</span>}
                        headStyle={{ borderTopLeftRadius: '8px', borderTopRightRadius: '8px', backgroundColor: '#215482' }}
                    >
                        <Menu
                            mode="vertical"
                            selectedKeys={[selectedMenu]}
                            style={{ float: 'left', borderRight: 0, fontWeight: '900' }}
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
                                <BlockOutlined /> 입교절차
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
                                            <RightCircleFilled /> 입교신청
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', height: '75px' }}>
                                                    인재원에 입교하고자 하는 사람 관련기관 업체 등은 다음의 각 호의 서류를 교육 시작 7일
                                                    전까지 제출
                                                    <br />
                                                    <span style={{ fontSize: '0.65rem' }}>①</span> 입교 신청서(온라인 신청포함)
                                                    <br />
                                                    <span style={{ fontSize: '0.65rem' }}>②</span> 기타 인재개발원에서 요구하는 자료
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    입교신청을 한 사람은 교육비를 입교 전까지 인재개발원 지정계좌에 납부
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    교육입교 대상자 선발은 접수순서에 따라 정하고 그 결과를 신청기관에 전화 또는 팩스 등으로
                                                    통보
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    신청 차수에 교육대상자로 선정되지 않은 인원에 대해서는 차기 교육대상자에 우선 선발
                                                </li>
                                            </ul>
                                        </Paragraph>
                                    </p>
                                    <p style={{ marginBottom: '50px' }}>
                                        <Title level={5}>
                                            <RightCircleFilled /> 퇴교처분
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    타인으로 하여금 대리 출석, 출석부 대리서명, 대리시험 등 부정행위를 한 사람
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>수업에 극히 태만한 사람</li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px' }}>
                                                    기타 교육운영규정 및 제반 수칙을 위반하거나 교육에 관한 정당한 지시에 따르지 아니하는
                                                    사람 등
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
