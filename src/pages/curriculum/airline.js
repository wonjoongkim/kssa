import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Button, Row, Col, Divider, Typography, Table, Image } from 'antd';
import { CaretRightOutlined, AppstoreOutlined, BlockOutlined, RightCircleFilled, AntDesignOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import facilities from '../../images/facilities.png';

import './style.css';

const { Title, Paragraph, Text, Link } = Typography;
const { Sider, Content } = Layout;

export const Curriculum_Airline = () => {
    const navigate = useNavigate();
    const [selectedMenu, setSelectedMenu] = useState('airline');
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
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'security' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        보안검색 교육과정 {selectedMenu === 'security' && <CaretRightOutlined />}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('airline')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'airline' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        항공경비 교육과정 {selectedMenu === 'airline' && <CaretRightOutlined />}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('operate')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'operate' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        정원 및 운영계획 {selectedMenu === 'operate' && <CaretRightOutlined />}
                                    </Button>
                                    <Button
                                        onClick={() => handleMenuClick('admission')}
                                        style={{
                                            margin: '10px',
                                            border: 'none',
                                            background: 'none',
                                            fontWeight: 'bold',
                                            color: selectedMenu === 'admission' ? '#599bc4' : 'inherit'
                                        }}
                                    >
                                        입교절차 {selectedMenu === 'admission' && <CaretRightOutlined />}
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
                                <BlockOutlined /> 항공경비요원 교육과정
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
                                    <blockquote>항공경비요원 초기 교육과정</blockquote>
                                </Title>
                                <br />
                                <div style={{ marginLeft: '20px' }}>
                                    <Title level={5}>
                                        <RightCircleFilled /> 교육목적
                                    </Title>
                                    <Paragraph style={{ margin: '0px 25px' }}>
                                        <ul>
                                            <li>
                                                공항운영자등은 항공경비요원에 대하여 국가민간항공보안 교육훈련지침 제21조 제1항 및 별표9의
                                                내용을 이수하여야 한다.
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
                                                        <td style={{ lineHeight: '32px' }}>4일 / 30시간</td>
                                                        <td>한국보안인재개발원</td>
                                                        <td>항공경비요원</td>
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
                                                        <td>항공보안 관련 법률</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안의 목적
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안사례 및 항공보안 강화방안
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    공항/항공사 보안시행계획 및 절차
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    공항보안현황(공항배치)
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보호구역 설정 및 출입통제시스템/출입증
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    관계법령 및 항공경비요원의 권한
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    관세법 및 보세구역 통제
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    국가, 공항 및 항공사 보안조직
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안 위협관련 현황, 불법 및 테러대응
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    위법자들의 보안대책 및 절차 회피방법
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>12h</td>
                                                    </tr>
                                                    <tr>
                                                        <td>항공경비실무</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    공항(여객터미널)출입통제 절차 및 방법
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    건물수색 및 순찰요령, 수상한자 발견/체포
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    공항(여객터미널) 경비보안절차, 순찰 및 상황별조치
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    공항(터미널)내 정상 및 비상시 통신/보고 방법
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    공항(외곽,화물터미널)출입통제 절차 및 방법
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    공항(외곽,화물터미널) 경비보안절차/상황별조치
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    초소근무/차량검색/검문검색/순찰, 통신/보고방법
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공기경비 및 통제, 수상한자 발견/체포
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    공항보안현황(검색대 배치 등)
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보안장비 사용법 및 인원/물품 검색
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    MD, HMD, 개봉검색, 수검색 등 보안검색방법
                                                                </li>
                                                            </ul>
                                                        </td>
                                                        <td>12h</td>
                                                    </tr>
                                                    <tr>
                                                        <td>우발계획 및 인적요소</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    우발계획에 의한 대처방법, 사고관리/보고/기록
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    군중통제 기법, 분쟁해결 기법, 인적요소
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공경비 인적요소
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    폭발물 및 위해물품 인지 및
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    수상한 물건 발견시 조치
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>평가</li>
                                                            </ul>
                                                        </td>
                                                        <td>6h</td>
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
                                                        <td>4일 / 30시간</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    총 100점 만점의 80점 이상 득점시 수료
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    배점: 이론평가(100점)
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
                                    <blockquote>항공경비요원 정기 교육과정</blockquote>
                                </Title>
                                <br />
                                <div style={{ marginLeft: '20px' }}>
                                    <Title level={5}>
                                        <RightCircleFilled /> 교육목적
                                    </Title>
                                    <Paragraph style={{ margin: '0px 25px' }}>
                                        <ul>
                                            <li>
                                                항공경비요원 초기교육을 수료한 항공경비요원이 국가민간항공보안 교육훈련지침 제21조제2항 및
                                                별표 9의3에 기술된 항공경비요원 정기교육을 연1회 8시간이상 이수하여야 한다.
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
                                                        <td>항공경비요원 초기교육이수자원</td>
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
                                        <div className="con_table cop_table height330">
                                            <table className="table">
                                                <colgroup>
                                                    <col style={{ width: '20%' }} />
                                                    <col style={{ width: '60%' }} />
                                                    <col style={{ width: '20%' }} />
                                                </colgroup>
                                                <tbody>
                                                    <tr>
                                                        <td>항공보안 관련 법률</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안관련 법령내용
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보안절차관련 변경사항
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공테러유형 및 새로 입수된 위험 정보 전파
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보안사고 사례∙분석
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>보고절차</li>
                                                            </ul>
                                                        </td>
                                                        <td>8h</td>
                                                    </tr>
                                                    <tr>
                                                        <td>항공경비 실무</td>
                                                        <td>
                                                            <ul>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    최신 위해물품
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    변경된 보안 통제절차 등
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공보안 인적요소
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    기본 검색절차 및 기법 반복
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
                                    <blockquote>항공경비요원 인증평가</blockquote>
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
                                                        <td>항공경비요원 자격인증시험 합격자</td>
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
                                                                    현장 직무내용을 중심으로 평가 실시
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    보호구역 지정 및 출입 통제
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    항공경비요원의 임무
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    불법방해행위에 대한 이해 수준
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    출입통제 출입증 확인 절차 및 내용
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    상주직원 보안검색 수준
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    검문소 판독업무 및 절차 등
                                                                </li>
                                                                <li style={{ textAlign: 'left', margin: '8px 0px 8px 40px' }}>
                                                                    국가항공보안우발계획 대처요령
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
