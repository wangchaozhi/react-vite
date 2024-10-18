import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import tabsReducer from './tabsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,  // 管理认证状态
        tabs: tabsReducer,  // 管理 Tab 状态
    },
});
