import { Outlet } from 'react-router-dom';

// material-ui
import { Box } from '@mui/material';

// project import
import Header from './Header';
import { Footer } from './Footer';
// ==============================|| MAIN LAYOUT ||============================== //

const MainLayout = () => {
    return (
        <>
            <Box sx={{ display: 'flex', width: '100%', flexDirection: 'column', height: '100vh' }}>
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
                    <Box style={{ flex: 'none', marginBottom: '270px' }}></Box>
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
