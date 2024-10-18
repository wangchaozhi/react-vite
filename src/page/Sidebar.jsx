import { Layout, Menu } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './Sidebar.css';

const { Sider } = Layout;

// 定义菜单项的数组
const menuItems = [
    { key: '/', icon: <UserOutlined />, label: 'Home' },
    { key: '/about', icon: <LaptopOutlined />, label: 'About' },
    { key: '/contact', icon: <NotificationOutlined />, label: 'Contact' },
];

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Sider width={200} className="sidebar">
            <Menu
                mode="inline"
                defaultSelectedKeys={['/']}
                className="custom-menu"
                style={{ height: '100%', borderRight: 0 }}
                onClick={({ key }) => navigate(key)} // 点击菜单直接切换路由
                items={menuItems.map((item) => ({
                    key: item.key,
                    icon: item.icon,
                    label: item.label,
                }))}
            />
        </Sider>
    );
};

export default Sidebar;
