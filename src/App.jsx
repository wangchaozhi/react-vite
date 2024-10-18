import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AppLayout from './AppLayout';
import Login from './page/Login';

const App = () => {
    const [isSidebarVisible, setSidebarVisible] = useState(true);
    const [tabs, setTabs] = useState([{ title: 'Home', key: '/' }]);
    const [activeKey, setActiveKey] = useState('/');
    const location = useLocation();
    const navigate = useNavigate();

    const toggleSidebar = () => {
        setSidebarVisible(!isSidebarVisible);
    };

    // 添加新 Tab
    const addTab = (title, key, content) => {
        const exists = tabs.some((tab) => tab.key === key);
        if (!exists) {
            setTabs((prevTabs) => [...prevTabs, { title, key, content }]);
        }
        setActiveKey(key);
        navigate(key);
    };

    // 关闭 Tab
    const removeTab = (targetKey) => {
        const newTabs = tabs.filter((tab) => tab.key !== targetKey);
        setTabs(newTabs);
        if (activeKey === targetKey && newTabs.length) {
            setActiveKey(newTabs[0].key);
            navigate(newTabs[0].key);
        }
    };

    if (location.pathname === '/login') {
        return <Login />;
    }

    return (
        <AppLayout
            isSidebarVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
            tabs={tabs}
            activeKey={activeKey}
            addTab={addTab}
            setActiveKey={setActiveKey}
            removeTab={removeTab}
        />
    );
};

export default App;
