import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

import { Admin_Login } from 'pages/admin';

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

// render - Reference page
import { Reference_News } from 'pages/reference/news';
import { Reference_Laws } from 'pages/reference/laws';
import { Reference_Datum } from 'pages/reference/datum';
import { Schedule_Calendar } from 'pages/schedule/Schedule_Calendar';

// render - Calendar page

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
        },
        {
            path: 'news',
            element: <Reference_News />
        },
        {
            path: 'laws',
            element: <Reference_Laws />
        },
        {
            path: 'datum',
            element: <Reference_Datum />
        },
        {
            path: 'admin',
            element: <Admin_Login />
        },
        {
            path: 'schedule',
            element: <Schedule_Calendar navigate={-1} />
        },
        {
            path: 'monthly',
            element: <Schedule_Calendar navigate={-1} />
        }
    ]
};

export default MainRoutes;
