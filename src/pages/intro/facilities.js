import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography, Table, Image } from 'antd';
import { CaretRightOutlined, AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import facilities from '../../images/facilities.png';

import '../../Style.css';

const { Title, Paragraph, Text, Link } = Typography;
const { Sider, Content } = Layout;

export const Intro_Facilities = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('facilities');
    const [isMobileView, setIsMobileView] = useState(false);

    const handleMenuClick = (menuKey) => {
        setSelectedMenu(menuKey);
        navigate('/' + menuKey);
    };

    const [imageStyle, setImageStyle] = useState({
        width: '280px',
        height: 'auto'
    });

    useEffect(() => {
        const handleResize = () => {
            setIsMobileView(window.innerWidth < 768);
            if (window.innerWidth <= 768) {
                setImageStyle({
                    ...imageStyle,
                    width: '200px',
                    marginBottom: '20px'
                });
            } else if (window.innerWidth <= 1000) {
                setImageStyle({
                    ...imageStyle,
                    width: '150px',
                    marginBottom: '20px'
                });
            } else if (window.innerWidth <= 1200) {
                setImageStyle({
                    ...imageStyle,
                    width: '180px',
                    marginBottom: '20px'
                });
            } else if (window.innerWidth <= 1300) {
                setImageStyle({
                    ...imageStyle,
                    width: '200px',
                    marginBottom: '20px'
                });
            } else if (window.innerWidth <= 1500) {
                setImageStyle({
                    ...imageStyle,
                    width: '240px',
                    marginBottom: '-20px'
                });
            } else {
                setImageStyle({
                    ...imageStyle,
                    width: '280px'
                });
            }
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
        <Layout>
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
                            <div>
                                <Title level={5}>
                                    <AntDesignOutlined /> 교육시설 개요
                                </Title>
                                <div className="con_table cop_table">
                                    <table className="table">
                                        <colgroup>
                                            <col style={{ width: '30%' }} />
                                            <col style={{ width: '40%' }} />
                                            <col style={{ width: '30%' }} />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>구분</th>
                                                <th>면적</th>
                                                <th>용도</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="con_table cop_table height300">
                                    <table className="table">
                                        <colgroup>
                                            <col style={{ width: '30%' }} />
                                            <col style={{ width: '40%' }} />
                                            <col style={{ width: '30%' }} />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <td>CBT 교육장</td>
                                                <td>65.7m2 (19.9평)</td>
                                                <td>이론강의 및 CBT 판독실습 등</td>
                                            </tr>
                                            <tr>
                                                <td>X-Ray 실습실</td>
                                                <td>47m2 (14.2평)</td>
                                                <td>대인검색 및 물품검색 실습 등</td>
                                            </tr>
                                            <tr>
                                                <td>항공경비보안교육장</td>
                                                <td>53.1m2 (16평)</td>
                                                <td>이론강의실 및 토론, 회의 등</td>
                                            </tr>
                                            <tr>
                                                <td>원장실 및 교관실</td>
                                                <td>15.6m2 (4.7평)</td>
                                                <td>원장실 / 강사 접견실</td>
                                            </tr>
                                            <tr>
                                                <td>행정실</td>
                                                <td>원장실 / 강사 접견실</td>
                                                <td>교육행정 및 강사대기실</td>
                                            </tr>
                                            <tr>
                                                <td>휴게실</td>
                                                <td>38.3m2 (11.6평)</td>
                                                <td>교육생 휴식공간</td>
                                            </tr>
                                            <tr>
                                                <td>대기실</td>
                                                <td>27m2 (8.1평)</td>
                                                <td>교육생 대기실</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
                            style={{ marginLeft: '30px' }}
                        >
                            <div>
                                <Title level={5}>
                                    <AntDesignOutlined /> X-Ray CBT 훈련프로그램
                                </Title>
                                <div className="con_table cop_table">
                                    <table className="table">
                                        <colgroup>
                                            <col style={{ width: '30%' }} />
                                            <col style={{ width: '40%' }} />
                                            <col style={{ width: '30%' }} />
                                        </colgroup>
                                        <thead>
                                            <tr>
                                                <th>구분</th>
                                                <th>수량</th>
                                                <th>용도</th>
                                            </tr>
                                        </thead>
                                    </table>
                                </div>
                                <div className="con_table cop_table height90">
                                    <table className="table">
                                        <colgroup>
                                            <col style={{ width: '30%' }} />
                                            <col style={{ width: '40%' }} />
                                            <col style={{ width: '30%' }} />
                                        </colgroup>
                                        <tbody>
                                            <tr>
                                                <td>X-Ray CBT 훈련 프로그램</td>
                                                <td>30 Sets</td>
                                                <td>보안검색요원 교육용 X-Ray CBT</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
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
                            style={{ marginLeft: '30px' }}
                        >
                            <Title level={5}>
                                <AntDesignOutlined /> 교육장 배치도
                            </Title>
                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <img src={facilities} alt="" style={{ width: '50%' }} />
                            </div>
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
                            style={{ marginLeft: '30px', marginTop: '50px' }}
                        >
                            <Title level={5}>
                                <AntDesignOutlined /> 시설 및 교보재
                            </Title>
                            <div>
                                <Row justify="space-around" align="middle" style={{ marginTop: '40px' }}>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                </Row>
                                <Row justify="space-around" align="middle" style={{ marginTop: '40px' }}>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                        />
                                    </Col>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                </Row>
                                <Row justify="space-around" align="middle" style={{ marginTop: '40px' }}>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                    <Col span={12} sm={8} md={6} lg={4}>
                                        <Image
                                            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                                            alt=""
                                            style={imageStyle}
                                            preview={false}
                                        />
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};
