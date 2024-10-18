import {Layout, Menu, Avatar, Badge, Button, Dropdown, message, Modal, Form, Input} from 'antd';
import {BellOutlined, UserOutlined, MenuOutlined, SmileOutlined, EditOutlined, LogoutOutlined} from '@ant-design/icons';
import './Navbar.css';
import viteLogo from '/vite.svg';
import reactLogo from '../assets/react.svg';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {logout} from "@/store/authSlice.js";
import {useState} from "react";

const {Header} = Layout;


const Navbar = ({toggleSidebar}) => {

    const dispatch = useDispatch(); // 用于调用 Redux 动作
    const navigate = useNavigate(); // 用于页面跳转
    const [isModalVisible, setIsModalVisible] = useState(false); // 控制弹窗显示状态

// 菜单项点击处理函数
    const handleMenuClick = ({key}) => {
        if (key === 'logout') {
            dispatch(logout()); // 更新登录状态
            message.success('已退出登录');
            navigate('/login'); // 跳转到登录页面
        } else if (key === 'change-password') {
            setIsModalVisible(true); // 打开修改密码弹窗
        }else if (key === 'profile') {
            navigate('/profile'); // 跳转到登录页面
        }
    };

    // 处理弹窗确认事件
    const handleOk = () => {
        message.success('密码已修改');
        setIsModalVisible(false); // 关闭弹窗
    };

    // 处理弹窗取消事件
    const handleCancel = () => {
        setIsModalVisible(false); // 关闭弹窗
    };

// 定义菜单项
    const menuItems = [
        {
            key: 'profile',
            icon: <SmileOutlined/>,
            label: '个人中心',
        },
        {
            key: 'change-password',
            icon: <EditOutlined/>,
            label: '修改密码',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined/>,
            label: '退出登录',
        },
    ];
    return (
        <>
            <Header className="header">
                <div className="menu-button">
                    <Button className="custom-button" type="primary" icon={<MenuOutlined/>}
                            onClick={toggleSidebar}>菜单</Button>
                </div>
                {/*<div className="logo">*/}
                {/*    <img src={viteLogo} alt="Vite logo" />*/}
                {/*    <img src={reactLogo} alt="React logo" />*/}
                {/*</div>*/}
                <div className="right-section">
                    {/* 通知图标 */}
                    <Badge count={0} className="notification-badge">
                        <BellOutlined style={{fontSize: '20px', color: '#fff'}}/>
                    </Badge>


                    {/* 用户头像下拉菜单 */}
                    <Dropdown
                        menu={{items: menuItems, onClick: handleMenuClick}} // 绑定菜单点击事件
                        trigger={['hover']}
                    >
                        <Avatar className="avatar" src="/images/avatar.jpg" style={{cursor: 'pointer'}}/>
                    </Dropdown>
                    {/*/!* 用户头像 *!/*/}
                    {/*<Avatar className="avatar"  src="/images/avatar.jpg" /> /!* 使用头像图片 *!/*/}
                </div>
            </Header>
            {/* 修改密码弹窗 */}
            <Modal
                title="修改密码"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                okText="确定"
                cancelText="取消"
                className="custom-modal"
            >

                <Form layout="vertical"  className="custom-form">
                    <Form.Item name="username" initialValue="hidden-user" style={{ display: 'none' }}>
                        <Input id="username" autoComplete="username" />
                    </Form.Item>
                    <Form.Item label="旧密码" name="oldPassword" rules={[{required: true, message: '请输入旧密码！'}]}>
                        <Input.Password id="oldPassword" autoComplete="current-password" />
                    </Form.Item>
                    <Form.Item label="新密码" name="newPassword" rules={[{required: true, message: '请输入新密码！'}]}>
                        <Input.Password id="newPassword" autoComplete="new-password" />
                    </Form.Item>
                    <Form.Item label="确认密码" name="confirmPassword"
                               rules={[{required: true, message: '请确认新密码！'}]}>
                        <Input.Password id="confirmPassword" autoComplete="new-password" />
                    </Form.Item>
                </Form>

            </Modal>
        </>

    );
};

export default Navbar;
