import { Link } from 'react-router-dom';
import { Space, Row, Col, Carousel } from 'antd';
import { Toolbar } from '@mui/material';
import kssa_logo from '../../../images/kssa_logo.png';
import incheon_airport from '../../../images/incheon_airport.png';
import incheon_airport_security from '../../../images/incheon_airport_security.png';
import Korea_avitation_security_association from '../../../images/Korea_avitation_security_association.png';
import 'antd/dist/antd.css';

export const Footer = () => {
    const carouselContentStyle = {
        height: '80px',
        lineHeight: '90px'
    };
    const containerStyle = {
        display: 'flex !important',
        justifyContent: 'center',
        alignContent: 'center'
    };
    return (
        <>
            <Toolbar
                style={{
                    display: 'block',
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    borderTop: '1px solid #e8e8e8',
                    background: '#e8e8e8',
                    fontSize: '12px'
                }}
            >
                {/* <Row gutter={24} style={{ marginTop: '5px', height: '80px', width: 'auto' }}>
                    <Col xs={{ span: 24 }} type="flex" align="middle">
                        <Carousel autoplay dotPosition={'top'}>
                            <div style={containerStyle}>
                                <img
                                    style={carouselContentStyle}
                                    src={incheon_airport}
                                    alt="Korea Avitation Security Association"
                                    title="Korea Avitation Security Association"
                                />
                            </div>
                            <div style={containerStyle}>
                                <img
                                    style={carouselContentStyle}
                                    src={incheon_airport_security}
                                    alt="Incheon Airport"
                                    title="Incheon Airport"
                                />
                            </div>
                            <div style={containerStyle}>
                                <img
                                    style={carouselContentStyle}
                                    src={Korea_avitation_security_association}
                                    alt="Incheon Airport Security"
                                    title="Incheon Airport Security"
                                />
                            </div>
                        </Carousel>
                    </Col>
                </Row> */}
                <Row gutter={24} style={{ marginTop: '5px' }}>
                    <Col xs={{ span: 24, order: 1 }} sm={{ span: 8, order: 1 }}>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%'
                            }}
                        >
                            <Link to="/">
                                <img
                                    src={kssa_logo}
                                    alt="Korea Security Specialist Academy"
                                    title="Korea Security Specialist Academy"
                                    style={{ filter: 'grayscale(100%)' }}
                                />
                            </Link>
                        </div>
                    </Col>

                    <Col xs={{ span: 24, order: 2 }} sm={{ span: 6, order: 2 }}>
                        <div style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                            <Space size="large" style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <Link
                                    to="/"
                                    style={{
                                        color: 'inherit',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap' // Prevent text from wrapping onto the next line
                                    }}
                                >
                                    개인정보보호정책
                                </Link>
                                <Link
                                    to="/"
                                    style={{
                                        color: 'inherit',
                                        fontWeight: 'bold',
                                        whiteSpace: 'nowrap' // Prevent text from wrapping onto the next line
                                    }}
                                >
                                    이용약관
                                </Link>
                            </Space>
                        </div>
                    </Col>

                    <Col xs={{ span: 24, order: 3 }} sm={{ span: 10, order: 3 }}>
                        <div style={{ margin: '3px 0', whiteSpace: 'nowrap' }}>
                            서울특별시 강서구 방화대로 21길 72 범천빌딩 4층 | T. 031-8027-9590 F. 031-8027-9591
                        </div>
                        <div style={{ margin: '3px 0', whiteSpace: 'nowrap' }}>
                            &copy; KOREA SECURITY SPECIALIST ACADEMY. All rights reserved.
                        </div>
                    </Col>
                </Row>
            </Toolbar>
        </>
    );
};
