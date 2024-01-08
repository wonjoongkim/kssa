import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography, Table, Image } from 'antd';
import { CaretRightOutlined, AppstoreOutlined, BlockOutlined, RightCircleFilled, AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import facilities from '../../images/facilities.png';

import '../../Style.css';

const { Title, Paragraph, Text, Link } = Typography;
const { Sider, Content } = Layout;

export const Curriculum_Security = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('security');
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
                                <BlockOutlined />
                                항공보안검색요원 교육과정
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
                                <Title level={4}>
                                    <blockquote>항공보안검색요원 초기 교육과정</blockquote>
                                </Title>
                                <br />
                                <div style={{ marginLeft: '20px' }}>
                                    <Title level={5}>
                                        <RightCircleFilled /> 교육목적
                                    </Title>
                                    <Paragraph style={{ margin: '0px 25px' }}>
                                        <ul>
                                            <li>
                                                항공보안검색요원은 보안검색업무를 수행하기 전에 국가민간항공보안 교육 훈련지침 제20조제1항
                                                및 별표8에 기술된 항공보안검색요원 초기교육을 이수하여야 한다.
                                            </li>
                                        </ul>
                                    </Paragraph>
                                    <br />
                                    <Paragraph>
                                        <Title level={5}>
                                            <RightCircleFilled /> 교육개요
                                        </Title>

                                        <div className="con_table cop_table">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>교육기간</th>
                                                        <th>교육기관</th>
                                                        <th>교육대상자</th>
                                                        <th>교육인원</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="con_table cop_table height110">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ lineHeight: '32px' }}>5일 / 40시간</td>
                                                        <td>한국보안인재개발원</td>
                                                        <td>항공보안검색요원</td>
                                                        <td>1회 30명</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Paragraph>
                                    <Paragraph>
                                        <Title level={5}>
                                            <RightCircleFilled /> 교육프로그램
                                        </Title>

                                        <div className="con_table cop_table">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '20%' }} />
                                                    <col style={{ width: '60%' }} />
                                                    <col style={{ width: '20%' }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>교과목</th>
                                                        <th>주요교육내용</th>
                                                        <th>교육시간</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="con_table cop_table height750">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '20%' }} />
                                                    <col style={{ width: '60%' }} />
                                                    <col style={{ width: '20%' }} />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td>항공보안 개요</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안의 목적
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안 사례 및 강화방안
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>40h</td>
                                                    </tr>
                                                    <tr>
                                                        <td>항공보안 보안관련 법규</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    국가, 공항 및 항공사 보안조직
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안 위협관련 사항(항공테러대응방안)
                                                                </li>

                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보안검색관련 법적근거 및 권한
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항안법, 위험물운송기술기준 등 관련법규
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    관세법 및 보세구역 통제
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>40h</td>
                                                    </tr>
                                                    <tr>
                                                        <td>보안검색실무</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보안검색업무 : 보안검색 목적 및 임무
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    공항배치도, 검색대위치, 보호구역 설정 등
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보안검색 인적요소
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    위해물품 식별요령
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    대인검색장비, 검색요령 및 승객대응방법
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    검색업무 예절 및 외국승객 대응방법
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    금속탐지장비, 촉수검색 등 승객검색
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    휴대물품검색절차 : 검색장비 및 검색요령
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    X-RAY 등 검색장비 운영 및 테스트
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    수하물 등 검색절차 : X-RAY 및 물리적검색
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    폭발물 탐지시스템의 운영 및 테스트 지식
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    MD/HMD/X-RAY검색, 물리적검색(개봉, 촉수)
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    특수승객 검색(VIP, 장애인, 어린이 등)
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    특수물품 검색(종교물품, 외교행낭 등) 비상사태시 경보, 통보절차
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>40h</td>
                                                    </tr>
                                                    <tr>
                                                        <td>보안검색실습(CBT)</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    시뮬레이션을 통한 X-RAY 판독훈련(CBT) X-RAY 판독능력평가 등
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>40h</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Paragraph>
                                    <Paragraph>
                                        <Title level={5}>
                                            <RightCircleFilled /> 평가 및 수료기준
                                        </Title>

                                        <div className="con_table cop_table">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '30%' }} />
                                                    <col style={{ width: '70%' }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>교육시간</th>
                                                        <th>평가 및 수료 기준</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="con_table cop_table height200">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '30%' }} />
                                                    <col style={{ width: '70%' }} />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td>5일 / 40시간</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    총 100점 만점의 80점 이상 득점시 수료
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    배점: 이론평가(30점) + CBT 실습평가(40점) + 보안검색실습(30점)
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    총 교육시간의 90%이상 출석자
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Paragraph>
                                </div>
                            </div>

                            <div>
                                <Title level={4}>
                                    <blockquote>항공보안검색요원 정기 교육과정</blockquote>
                                </Title>
                                <br />
                                <div style={{ marginLeft: '20px' }}>
                                    <Title level={5}>
                                        <RightCircleFilled /> 교육목적
                                    </Title>
                                    <Paragraph style={{ margin: '0px 25px' }}>
                                        <ul>
                                            <li>
                                                항공보안검색요원 초기교육과정을 수료한 항공보안검색요원은 연1회 국가 민간항공보안
                                                교육훈련지침 제20조 제3항 및 별표 8의3에 기술된 항공보안 검색요원 정기교육을 이수하여야
                                                한다.
                                            </li>
                                        </ul>
                                    </Paragraph>
                                    <br />
                                    <Paragraph>
                                        <Title level={5}>
                                            <RightCircleFilled /> 교육개요
                                        </Title>

                                        <div className="con_table cop_table">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>교육기간</th>
                                                        <th>교육기관</th>
                                                        <th>교육대상자</th>
                                                        <th>교육인원</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="con_table cop_table height110">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ lineHeight: '32px' }}>1일 / 8시간</td>
                                                        <td>한국보안인재개발원</td>
                                                        <td>항공보안검색요원 초기교육이수자원</td>
                                                        <td>1회 30명</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Paragraph>
                                    <Paragraph>
                                        <Title level={5}>
                                            <RightCircleFilled /> 교육프로그램
                                        </Title>

                                        <div className="con_table cop_table ">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '20%' }} />
                                                    <col style={{ width: '60%' }} />
                                                    <col style={{ width: '20%' }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>교과목</th>
                                                        <th>주요교육내용</th>
                                                        <th>교육시간</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="con_table cop_table height500">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '20%' }} />
                                                    <col style={{ width: '60%' }} />
                                                    <col style={{ width: '20%' }} />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td>보안검색</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    관련법 및 규정 변경사항
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안관련 새로운 위협
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    위협상황에 대한 정보 및 보안위해물품
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보안관련 사고/사례 분석
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보안 검색절차 및 기법 반복
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    미신고 항공위험물 인지 및
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    승객/승무원에 관한 규정 등
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>8h</td>
                                                    </tr>
                                                    <tr>
                                                        <td>X-RAY 판독</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    X-RAY 시뮬레이션 판독훈련
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    컴퓨터 X-ray 영상을 통한 위해물품 인지
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    X-ray 판독 능력 숙달훈련
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    X-ray 판독 능력 평가
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>8h</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Paragraph>
                                    <Paragraph>
                                        <Title level={5}>
                                            <RightCircleFilled /> 평가 및 수료기준
                                        </Title>

                                        <div className="con_table cop_table">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '75%' }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>교육시간</th>
                                                        <th>평가 및 수료 기준</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="con_table cop_table height200">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '75%' }} />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td>5일 / 40시간</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    총 100점 만점의 80점 이상 득점시 수료
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    배점: 이론평가(50점) + CBT 실습평가(50점)
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    총 교육시간의 90%이상 출석자
                                                                </li>
                                                            </ul>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Paragraph>
                                </div>
                            </div>

                            <div>
                                <Title level={4}>
                                    <blockquote>항공보안검색요원 인증평가</blockquote>
                                </Title>
                                <br />
                                <div style={{ marginLeft: '20px' }}>
                                    <Title level={5}>
                                        <RightCircleFilled /> 교육목적
                                    </Title>
                                    <Paragraph style={{ margin: '0px 25px' }}>
                                        <ul>
                                            <li>
                                                「국가항공보안계획」 제10.2호에 따라 보안검색요원 자격인증시험에 합격한 자에 대하여 원장은
                                                인증서를 발급한다
                                            </li>
                                        </ul>
                                    </Paragraph>
                                    <br />
                                    <Paragraph>
                                        <Title level={5}>
                                            <RightCircleFilled /> 교육개요
                                        </Title>

                                        <div className="con_table cop_table">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>교육기간</th>
                                                        <th>교육기관</th>
                                                        <th>교육대상자</th>
                                                        <th>교육인원</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="con_table cop_table height110">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                    <col style={{ width: '25%' }} />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ lineHeight: '32px' }}>1일 / 4시간</td>
                                                        <td>한국보안인재개발원</td>
                                                        <td>항공보안검색요원 자격인증시험 합격자</td>
                                                        <td>1회 30명</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Paragraph>
                                    <Paragraph>
                                        <Title level={5}>
                                            <RightCircleFilled /> 인증평가 주요내용
                                        </Title>

                                        <div className="con_table cop_table">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '75%' }} />
                                                    <col style={{ width: '25%' }} />
                                                </colgroup>
                                                <thead>
                                                    <tr>
                                                        <th>인증평가 주요 내용</th>
                                                        <th>교육시간</th>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                        <div className="con_table cop_table height300">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '75%' }} />
                                                    <col style={{ width: '25%' }} />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    현장의 직무 내용을 중심으로 평가 실시
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안장비 기본 이론
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    기내반입금지물품에 대한 지식
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보안사고 사례∙분석
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>보고절차</li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    최신 위해물품
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    공항상주직원 보안 통제절차
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안 인적요소
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    기본적인 보안검색절차 등
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>4h</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </Paragraph>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Layout>
        </Layout>
    );
};
