import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography, Table, Image } from 'antd';
import { CaretRightOutlined, AppstoreOutlined, BlockOutlined, RightCircleFilled, AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import facilities from '../../images/facilities.png';

import '../../Style.css';

const { Title, Paragraph, Text, Link } = Typography;
const { Sider, Content } = Layout;

export const Training_Application = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('application');
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
            <Menu.Item key="reason" onClick={() => handleMenuClick('reason')}>
                관련근거 {selectedMenu === 'reason' && <CaretRightOutlined />}
            </Menu.Item>
            <Menu.Item key="application" onClick={() => handleMenuClick('application')}>
                신청방법 {selectedMenu === 'application' && <CaretRightOutlined />}
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
                        title={<span style={{ fontWeight: 'bold', color: 'white', marginLeft: '30px' }}>직업훈련비지원</span>}
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
                                    title={<span style={{ fontWeight: 'bold' }}>직업훈련비지원</span>}
                                >
                                    <Button
                                        onClick={() => handleMenuClick('reason')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'reason' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        관련근거 {selectedMenu === 'reason' && '▼'}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('application')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'application' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        신청방법 {selectedMenu === 'application' && '▼'}
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
                                <BlockOutlined /> 신청방법
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
                                            <RightCircleFilled /> 교육비용지원 신청서류
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    사업주 직업능력개발훈련비용 지원신청서 (별지 제58호서식, 또는 별지 제58호의2서식)
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    훈련비용 정산내역서 및 증빙서류 (위탁훈련의 경우)
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    직업능력개발훈련 수료자명부
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    임금대장사본 (유급휴가훈련에 한함)
                                                </li>
                                            </ul>
                                        </Paragraph>
                                    </p>
                                    <p style={{ marginBottom: '50px' }}>
                                        <Title level={5}>
                                            <RightCircleFilled /> 교육비용지원 신청절차
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    인재개발원은 교육과정 개시 7일전까지 고용노동부(중부지방고용노동청)에
                                                    교육훈련과정(교육일정 및 대상자 포함) 지정승인 신청의뢰
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    고용노동부의 교육훈련과정 지정승인 (접수 후 7일 이내)
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    사업주는 훈련이 끝난 후나 매 3개월간의 훈련 실시 후 30일 이내에 "사업주 직업능력개발
                                                    훈련비용 지원 신청서"를 작성하여 고용노동부(중부지방고용노동청) 신청 의뢰 가능
                                                </li>
                                            </ul>
                                        </Paragraph>
                                    </p>
                                    <p style={{ marginBottom: '50px' }}>
                                        <Title level={5}>
                                            <RightCircleFilled /> 교육비용지원 유의사항
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    고용보험 적용근로자에 한하여 훈련비용지원
                                                </li>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    업체별로 고용노동부(관할 지청)에 신청
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
