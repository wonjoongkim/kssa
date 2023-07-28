import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';

// render - login
// const AuthAdmin = Loadable(lazy(() => import('pages/admin')));
import { AuthAdmin } from 'pages/admin';

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'admin',
            element: <AuthAdmin />
        }
    ]
};

export default LoginRoutes;
