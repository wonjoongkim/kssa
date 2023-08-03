import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

import organization from '../../images/organization.png';

const { Title, Paragraph, Text, Link } = Typography;
const { Sider, Content } = Layout;

export const Intro_Organization = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('organization');
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
        <Layout style={{ minHeight: '55vw' }}>
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
                        <Col xs={{ span: 24, order: 2 }} sm={{ span: 24, order: isMobileView ? 1 : 3 }}>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={organization} alt="" style={{ width: '75%' }} />
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};
