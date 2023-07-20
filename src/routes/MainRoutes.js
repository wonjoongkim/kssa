import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - Intro page
import { Intro_Greetings } from 'pages/intro/greetings';
import { Intro_Facilities } from 'pages/intro/facilities';
import { Intro_Directions } from 'pages/intro/directions';
import { Intro_Organization } from 'pages/intro/organization';

// render - Curriculum page
import { Curriculum_Admission } from 'pages/curriculum/admission';
import { Curriculum_Airline } from 'pages/curriculum/airline';
import { Curriculum_Operate } from 'pages/curriculum/operate';
import { Curriculum_Security } from 'pages/curriculum/security';

// render - Training page
import { Training_Application } from 'pages/training/application';
import { Training_Reason } from 'pages/training/reason';

// render - Notice page
import { Notice_Education } from 'pages/notice/education';
import { Notice_Faq } from 'pages/notice/faq';
import { Notice_Notification } from 'pages/notice/notification';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />
        },
        {
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            path: 'greetings',
            element: <Intro_Greetings />
        },
        {
            path: 'facilities',
            element: <Intro_Facilities />
        },
        {
            path: 'directions',
            element: <Intro_Directions />
        },
        {
            path: 'organization',
            element: <Intro_Organization />
        },
        {
            path: 'admission',
            element: <Curriculum_Admission />
        },
        {
            path: 'airline',
            element: <Curriculum_Airline />
        },
        {
            path: 'operate',
            element: <Curriculum_Operate />
        },
        {
            path: 'security',
            element: <Curriculum_Security />
        },
        {
            path: 'application',
            element: <Training_Application />
        },
        {
            path: 'reason',
            element: <Training_Reason />
        },

        {
            path: 'education',
            element: <Notice_Education />
        },
        {
            path: 'faq',
            element: <Notice_Faq />
        },
        {
            path: 'notification',
            element: <Notice_Notification />
        }
    ]
};

export default MainRoutes;
