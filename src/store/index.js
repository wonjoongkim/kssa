// third-party
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { mainManagement } from '../hooks/api/MainManagement/MainManagement';
import { loginManagement } from '../hooks/api/LoginManagement/LoginManagement';
// project import
import reducers from './reducers';

// ==============================|| REDUX TOOLKIT - MAIN STORE ||============================== //

export const store = configureStore({
    reducer: {
        [loginManagement.reducerPath]: loginManagement.reducer,
        [mainManagement.reducerPath]: mainManagement.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loginManagement.middleware).concat(mainManagement.middleware)
});

setupListeners(store.dispatch);
// const { dispatch } = store;
// export { store, dispatch };
