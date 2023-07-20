import React from 'react';
import { BrowserRouter } from 'react-router-dom';
// material-ui
import { AppBar, Box } from '@mui/material';

// project import
import HeaderContent from './HeaderContent';

// ==============================|| MAIN LAYOUT - HEADER ||============================== //
const Header = () => {
    // common header
    const mainHeader = (
        // <BrowserRouter>
        <HeaderContent />
        // </BrowserRouter>
    );

    return (
        <>
            <AppBar color="transparent">{mainHeader}</AppBar>
        </>
    );
};

export default Header;
