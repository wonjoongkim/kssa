import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

// material-ui
import { Box } from '@mui/material';

// project import
import Header from './Header';
import { Footer } from './Footer';
import { Schedule_Calendar } from 'pages/schedule/Schedule_Calendar';
// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    const [location, setLocation] = useState(useLocation());

    useEffect(() => {
        console.log('current page path : ', location?.pathname);
    }, [location]);

    return (
        <>
            {location.pathname === '/' || location.pathname === '/dashboard' ? <Schedule_Calendar navigate={0} /> : ''}
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', height: '100%' }}>
                <Header />
                <Box
                    component="main"
                    sx={{
                        width: '100%',
                        flexGrow: 1,
                        overflowY: 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <Box style={{ flex: 'none', marginBottom: '310px' }}></Box>
                    <Box sx={{ p: { xs: 2, sm: 2 }, flexGrow: 1, overflowY: 'auto' }}>
                        <Outlet />
                    </Box>
                    <Box style={{ flex: 'none', marginBottom: '75px' }}></Box>
                </Box>
                <Footer />
            </Box>
        </>
    );
};

export default MainLayout;
