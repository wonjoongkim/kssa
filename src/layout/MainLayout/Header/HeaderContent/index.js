import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Grid, Button } from '@mui/material';
import { AppstoreOutlined } from '@ant-design/icons';
import { Space } from 'antd';
import kssa_logo from '../../../../images/kssa_logo.png';
import kssa_title from '../../../../images/kssa_title.png';
import 'antd/dist/antd.css';

const linkStyle = {
    color: 'inherit', // 상위 요소의 색상 상속
    textDecoration: 'none' // 텍스트 밑줄 제거
};

const HeaderContent = () => {
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
            subMenu: [
                { name: '원장인사', path: '/greetings' },
                { name: '조직도', path: '/organization' },
                { name: '교육시설', path: '/facilities' },
                { name: '오시는길', path: '/directions' }
            ]
        },
        {
            name: '교육과정',
            subMenu: [
                { name: '보안검색 교육과정', path: '/security' },
                { name: '항공경비 교육과정', path: '/airline' },
                { name: '정원 및 운영계획', path: '/operate' },
                { name: '입교절차', path: '/admission' }
            ]
        },
        {
            name: '직업훈련비지원',
            subMenu: [
                { name: '관련근거', path: '/reason' },
                { name: '신청방법', path: '/application' }
            ]
        },
        {
            name: '게시판',
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
                                <Typography variant="body1">
                                    <Link to="/" style={linkStyle}>
                                        Home
                                    </Link>{' '}
                                    |{' '}
                                    <Link to="/directions" style={linkStyle}>
                                        찾아오시는길
                                    </Link>{' '}
                                    |{' '}
                                    <Link to="/kasa" style={linkStyle}>
                                        KASA
                                    </Link>
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Toolbar>
                <div style={{ backgroundColor: '#5099c7', display: 'flex', justifyContent: 'center' }}>
                    {MainMenuItems.map((item, index) => (
                        <div
                            key={index}
                            style={{
                                margin: '0 10px',
                                position: 'relative',
                                display: 'inline-block'
                            }}
                            onMouseEnter={() => handleMenuHover(item.name)}
                            onMouseLeave={handleMenuLeave}
                        >
                            <div
                                style={{
                                    margin: '0px 8px',
                                    color: '#ffffff',
                                    padding: '10px',
                                    cursor: 'pointer',
                                    fontWeight: 'bold'
                                }}
                            >
                                <AppstoreOutlined /> {item.name}
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
                                            <div key={subIndex} style={{ padding: '5px', cursor: 'pointer' }}>
                                                <Button
                                                    key={subIndex}
                                                    variant="contained"
                                                    onClick={() => handleSubItemClick(subItem.path)}
                                                    style={{ margin: '0px 7px', border: 'none', background: 'none' }}
                                                >
                                                    {subItem.name}
                                                </Button>
                                            </div>
                                        ))}
                                    </Space>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        backgroundImage: `url(${kssa_title})`,
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        width: '100%',
                        height: '18vh'
                    }}
                />
            </AppBar>
        </>
    );
};

export default HeaderContent;
