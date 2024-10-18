import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tabs: JSON.parse(localStorage.getItem('tabs')) || [], // 从 localStorage 初始化
    activeKey: localStorage.getItem('activeKey') || '/', // 初始激活的 tab
};

const tabsSlice = createSlice({
    name: 'tabs',
    initialState,
    reducers: {
        addTab: (state, action) => {
            const newTab = action.payload;
            if (!state.tabs.some((tab) => tab.key === newTab.key)) {
                state.tabs.push(newTab);
            }
            state.activeKey = newTab.key;
            localStorage.setItem('tabs', JSON.stringify(state.tabs)); // 同步到 localStorage
        },
        removeTab: (state, action) => {
            const keyToRemove = action.payload;
            state.tabs = state.tabs.filter((tab) => tab.key !== keyToRemove);
            if (state.activeKey === keyToRemove && state.tabs.length) {
                state.activeKey = state.tabs[state.tabs.length - 1].key;
            } else if (!state.tabs.length) {
                state.activeKey = '/';
            }
            localStorage.setItem('tabs', JSON.stringify(state.tabs)); // 同步到 localStorage
        },
        setActiveKey: (state, action) => {
            state.activeKey = action.payload;
            localStorage.setItem('activeKey', state.activeKey); // 同步到 localStorage
        },
    },
});

export const { addTab, removeTab, setActiveKey } = tabsSlice.actions;
export default tabsSlice.reducer;
