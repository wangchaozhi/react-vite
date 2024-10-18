// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

// 初始化状态，尝试从 localStorage 获取状态
const initialState = {
    isAuthenticated: localStorage.getItem('isAuthenticated') === 'true',
    loginData: JSON.parse(localStorage.getItem('loginData')) || {},
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            const { username, password, remember } = action.payload;


            const loginData = { username, password, remember };
            state.loginData = loginData; // 更新 Redux 状态中的 loginData

            if (remember) {
                localStorage.setItem('loginData', JSON.stringify(loginData));
            } else {
                localStorage.removeItem('loginData');
            }

            localStorage.setItem('isAuthenticated', 'true');
        },
        logout: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem('isAuthenticated');
        },
    },
});

export const { login, logout } = authSlice.actions;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectLoginData = (state) => state.auth.loginData;

// 导出 reducer 作为默认导出
export default authSlice.reducer;
