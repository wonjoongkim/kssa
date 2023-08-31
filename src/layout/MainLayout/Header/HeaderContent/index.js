import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Grid, Button } from '@mui/material';
import { AppstoreOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { Space, Modal, Row, Col } from 'antd';
import kssa_logo from '../../../../images/kssa_logo.png';
import kssa_title from '../../../../images/kssa_title.png';
import 'antd/dist/antd.css';

import { useUserToken } from '../../../../hooks/core/UserToken';
import { useUserStatus } from '../../../../hooks/core/UserStatus';

const linkStyle = {
    color: 'inherit', // 상위 요소의 색상 상속
    textDecoration: 'none', // 텍스트 밑줄 제거
    margin: '0 5px'
};

const HeaderContent = () => {
    const { confirm } = Modal;
    const [activeMenu, setActiveMenu] = useState(null);
    const navigate = useNavigate();

    const handleMenuHover = (menu) => {
        setActiveMenu(menu);
    };

    const handleMenuLeave = () => {
        setActiveMenu(null);
    };

    const MainMenuItems = [
        {
            name: '교육원소개',
            path: '/greetings',
            subMenu: [
                { name: '원장인사', path: '/greetings' },
                { name: '조직도', path: '/organization' },
                { name: '교육시설', path: '/facilities' },
                { name: '오시는길', path: '/directions' }
            ]
        },
        {
            name: '교육과정',
            path: '/security',
            subMenu: [
                { name: '보안검색 교육과정', path: '/security' },
                { name: '항공경비 교육과정', path: '/airline' },
                { name: '정원 및 운영계획', path: '/operate' },
                { name: '입교절차', path: '/admission' }
            ]
        },
        {
            name: '직업훈련비지원',
            path: '/reason',
            subMenu: [
                { name: '관련근거', path: '/reason' },
                { name: '신청방법', path: '/application' }
            ]
        },
        {
            name: '게시판',
            path: '/notification',
            subMenu: [
                { name: '공지사항', path: '/notification' },
                { name: '교육안내', path: '/education' },
                { name: 'FAQ', path: '/faq' }
            ]
        }
    ];

    const [current, setCurrent] = useState();

    const handleSubItemClick = (path) => {
        console.log('Submenu item clicked:', path);
        navigate(path);
        // 페이지 이동
    };

    const isLoggedIn = useUserStatus();
    // 로그인 토큰 정보
    const [userToken] = useUserToken();

    const LoginOut = () => {
        confirm({
            icon: <ExclamationCircleOutlined />,
            content: '로그아웃 하시겠습니까?',
            style: { marginTop: '250px' },
            onOk() {
                userToken.setItem('');
                navigate('/dashboard');
            },
            onCancel() {}
        });
    };

    return (
        <>
            <AppBar position="fixed" color="transparent" style={{ background: '#ffffff' }}>
                <Toolbar>
                    <Grid container alignItems="center" justifyContent="space-between">
                        <Grid item>
                            <Link to="/">
                                <img src={kssa_logo} alt="Korea Security Specialist Academy" title="Korea Security Specialist Academy" />
                            </Link>
                        </Grid>
                        <Grid item>
                            <Box>
                                <Typography variant="body1" style={{ fontSize: '0.95rem' }}>
                                    <Link to="/" style={linkStyle}>
                                        Home
                                    </Link>{' '}
                                    |{' '}
                                    <Link to="/directions" style={linkStyle}>
                                        찾아오시는 길
                                    </Link>{' '}
                                    |{' '}
                                    {/* <Link to="http://www.kasa21.kr" style={linkStyle} target="_blank">
                                        KASA
                                    </Link> */}
                                    <a href="http://www.kasa21.kr" style={linkStyle} target="_blank" rel="noopener noreferrer">
                                        KASA
                                    </a>
                                    |{' '}
                                    {isLoggedIn === false ? (
                                        <Link to="/admin" style={linkStyle}>
                                            Admin
                                        </Link>
                                    ) : (
                                        <Button type="text" style={linkStyle} onClick={LoginOut}>
                                            Log Out
                                        </Button>
                                    )}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
                <div
                    style={{
                        backgroundImage: `url(${kssa_title})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        width: '100%',
                        height: '22vh'
                    }}
                >
                    <Row
                        justify="center"
                        style={{
                            position: 'relative',
                            background: '#000',
                            height: '42px',
                            textAlign: 'center',
                            left: '0px',
                            color: 'rgb(255, 255, 255)',
                            backgroundColor: 'rgba(0, 0, 0, 0.7)'
                        }}
                    >
                        {MainMenuItems.map((item, index) => (
                            <>
                                <Col
                                    span={4}
                                    key={index}
                                    style={{ textAlign: 'center' }}
                                    onMouseEnter={() => handleMenuHover(item.name)}
                                    onMouseLeave={handleMenuLeave}
                                >
                                    <div style={{ textAlign: 'center', alignItems: 'center' }}>
                                        <Button
                                            variant="contained"
                                            style={{
                                                margin: '0px 8px',
                                                color: '#ffffff',
                                                padding: '7px',
                                                cursor: 'pointer',
                                                fontWeight: 'bold',
                                                border: 'none',
                                                background: 'none',
                                                fontSize: '1rem'
                                            }}
                                            onClick={() => handleSubItemClick(item.path)}
                                        >
                                            {item.name}
                                        </Button>
                                    </div>
                                    {activeMenu === item.name && (
                                        <div
                                            className="submenu"
                                            onMouseEnter={() => handleMenuHover(item.name)}
                                            onMouseLeave={handleMenuLeave}
                                            style={{
                                                position: 'fixed',
                                                textAlign: 'center',
                                                left: '0',
                                                width: '100vw',
                                                padding: '10px',
                                                color: '#ffffff',
                                                backgroundColor: 'rgba(0, 0, 0, 0.7)'
                                            }}
                                        >
                                            <Space>
                                                {item.subMenu.map((subItem, subIndex) => (
                                                    <div key={subIndex} style={{ padding: '8px', cursor: 'pointer' }}>
                                                        <Button
                                                            key={subIndex}
                                                            variant="contained"
                                                            onClick={() => handleSubItemClick(subItem.path)}
                                                            style={{
                                                                margin: '0px 7px',
                                                                border: 'none',
                                                                background: 'none',
                                                                fontSize: '1rem',
                                                                fontWeight: '900'
                                                            }}
                                                        >
                                                            · {subItem.name}
                                                        </Button>
                                                    </div>
                                                ))}
                                            </Space>
                                        </div>
                                    )}
                                </Col>
                            </>
                        ))}
                    </Row>
                </div>
            </AppBar>
        </>
    );
};

export default HeaderContent;
