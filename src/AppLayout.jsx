import { Layout } from 'antd';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from './page/Navbar';
import Sidebar from './page/Sidebar';
import Footer from './page/Footer';
import ContentTabs from './page/ContentTabs'; // 自定义 Tabs 组件
import routes from './route/routes';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, removeTab, setActiveKey } from './store/tabsSlice';

const AppLayout = ({ isSidebarVisible, toggleSidebar }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { tabs, activeKey } = useSelector((state) => state.tabs); // 从 Redux 读取 tabs 和 activeKey

    useEffect(() => {
        const route = routes.find((r) => r.path === location.pathname);
        if (route) {
            const newTab = { key: route.path, title: route.name };
            dispatch(addTab(newTab)); // 添加新的 Tab
        }
        dispatch(setActiveKey(location.pathname)); // 更新激活的 Tab
    }, [location, dispatch]);

    const onTabChange = (key) => {
        dispatch(setActiveKey(key));
        navigate(key); // 跳转到对应的路由
    };

    const onRemove = (targetKey) => {
        dispatch(removeTab(targetKey));
        if (tabs.length === 1) {
            navigate('/'); // 当所有 Tab 都关闭时，跳转到首页
        }
    };

    return (
        <Layout>
            <Navbar toggleSidebar={toggleSidebar} />
            <Layout>
                {isSidebarVisible && <Sidebar />}
                <Layout style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <ContentTabs
                        tabs={tabs}
                        activeKey={activeKey}
                        onChange={onTabChange}
                        onRemove={onRemove}
                    />
                    <div style={{ flex: 1, padding: '1.5rem', fontSize: '1rem' }}>
                        <Routes>
                            {routes.map((route) => (
                                <Route key={route.path} path={route.path} element={route.component} />
                            ))}
                        </Routes>
                    </div>
                    <Footer />
                </Layout>
            </Layout>
        </Layout>
    );
};

export default AppLayout;
