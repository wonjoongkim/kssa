import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography, Table, Image } from 'antd';
import { CaretRightOutlined, AppstoreOutlined, BlockOutlined, RightCircleFilled, AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import facilities from '../../images/facilities.png';

import '../../Style.css';

const { Title, Paragraph, Text, Link } = Typography;
const { Sider, Content } = Layout;

export const Training_Reason = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('reason');
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
                                <BlockOutlined /> 관련근거
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
                                            <RightCircleFilled /> 근로자직업능력개발법 제24조(직업능력개발훈련과정의 인정)
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    제20조 · 제22조 및 제23조의 규정에 따라 직업능력개발훈련에 대하여 지원 또는 융자를
                                                    받고자 하는 자(직업능력개발훈련을 위탁받아 실시하는 자를 포함한다)와 제21조 제1항
                                                    제1호에 따라 근로자가 훈련비용을 지원 또는 융자받을 수 있는 직업능력개발훈련을
                                                    실시하려는 자는 그 직업능력개발훈련과정에 대하여 고용노동부장관으로부터 인정을 받아야
                                                    한다.
                                                </li>
                                            </ul>
                                        </Paragraph>
                                    </p>
                                    <p style={{ marginBottom: '50px' }}>
                                        <Title level={5}>
                                            <RightCircleFilled /> 고용보험법 시행령 제41조(사업주에 대한 직업능력개발 훈련비용의 지원) 및
                                            동법 시행규칙 제60조 제2항
                                        </Title>
                                        <Paragraph style={{ margin: '0px 25px' }}>
                                            <ul>
                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 15px', lineHeight: '30px' }}>
                                                    「근로자직업능력 개발법」제24조에 따라 훈련과정의 인정을 받은 훈련과정으로서 다음 각
                                                    호의 어느 하나에 해당하는 훈련을 말한다.
                                                    <br />
                                                    <ol>
                                                        <li>피보험자를 대상으로 실시하는 직업능력개발 훈련</li>
                                                        <li>
                                                            피보험자가 아닌 자로서 해당 사업주에게 고용된 자를 대상으로 실시하는
                                                            직업능력개발 훈련
                                                        </li>
                                                        <li>
                                                            해당 사업이나 그 사업과 관련되는 사업에서 고용하려는 자를 대상으로 실시하는
                                                            직업능력개발 훈련
                                                        </li>
                                                        <li>직업안정기관에 구직등록한 자를 대상으로 실시하는 직업능력개발 훈련</li>
                                                        <li>
                                                            해당 사업에 고용된 피보험자[법 제113조에 따른 자영업자(이하 "자영업자"라 한다)는
                                                            제외한다]에게 다음 각 목의 어느 하나의 요건을 갖춘 유급휴가[「근로기준법」
                                                            제60조의 연차 유급휴가가 아닌 경우로서 휴가기간 중 「근로기준법 시행령」제6조에
                                                            따른 통상임금(이하 "통상임금"이라 한다)에 해당하는 금액 이상의 임금을 지급한
                                                            경우를 말한다]를 주어 실시하는 직업능력개발 훈련
                                                        </li>
                                                    </ol>
                                                    <code style={{ lineHeight: '45px' }}>가</code> 우선지원 대상기업의 사업주나 상시
                                                    사용하는 근로자 수가 150명 미만인 사업주가 해당 근로자를 대상으로 계속하여 7일 이상의
                                                    유급휴가를 주어 30시간 이상의 훈련을 실시할 것
                                                    <br />
                                                    <code style={{ lineHeight: '45px' }}>나</code> 가목에 해당하지 아니하는 사업주가 1년
                                                    이상 재직하고 있는 근로자를 대상으로 30일 이상의 유급 휴가를 주어 120시간 이상의 훈련을
                                                    실시할 것
                                                    <br />
                                                    <code style={{ lineHeight: '45px' }}>다</code> 사업주가 기능ㆍ기술을 장려하기 위하여
                                                    근로자 중 생산직 또는 관련 직에 종사하는 근로자로서 고용노동부장관이 고시하는 자를
                                                    대상으로 유급휴가를 주어 20시간 이상의 훈련을 실시할 것
                                                    <br />※ 고용노동부지정 직업훈련개발과정에 대한 보다 자세한 사항은 http://www.hrd.go.kr을
                                                    참조하시기 바랍니다.
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
