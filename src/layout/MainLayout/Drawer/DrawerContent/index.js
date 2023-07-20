// project import
import NavCard from './NavCard';
import Navigation from './Navigation';
import LeftMenus from './LeftMenus/LeftMenus';
import SimpleBar from 'components/third-party/SimpleBar';

// ==============================|| DRAWER CONTENT ||============================== //

const DrawerContent = () => (
    <SimpleBar
        sx={{
            '& .simplebar-content': {
                display: 'flex',
                flexDirection: 'column'
            }
        }}
    >
        {/* <Navigation /> */}
        <LeftMenus />
        <NavCard />
    </SimpleBar>
);

export default DrawerContent;
