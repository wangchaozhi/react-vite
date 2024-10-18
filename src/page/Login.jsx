import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, selectLoginData } from '../store/authSlice.js';
import { Button, Form, Input, Checkbox, message } from 'antd';
import './Login.css';
import { useEffect, useState } from 'react';
import { post } from '../api/index.js'; // 确保路径正确
import { throttle } from '../utils/throttle.js'; // 导入节流工具

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [remember, setRemember] = useState(false);

    // 使用 useSelector 获取 loginData
    const loginData = useSelector(selectLoginData);

    // 页面加载时初始化表单数据
    useEffect(() => {
        const { username = '', password = '', remember = false } = loginData;
        if (remember) {
            console.log(username)
            form.setFieldsValue({ username, password });
            setRemember(remember);
        }
    }, [form, loginData]); // 确保 loginData 在依赖中

    // 表单提交逻辑，使用节流函数包装
    const onFinish = throttle(async (values) => {
        try {
            const response = await post('/user/login', values);

            if (response.code === 200) {
                const { token } = response.data;
                localStorage.setItem('authToken', token); // 存储 Token

                dispatch(login({ ...values, remember })); // 更新 Redux 状态
                message.success('登录成功');
                navigate('/'); // 跳转到主页
            } else {
                message.error(response.message || '登录失败');
            }
        } catch (error) {
            message.error('登录失败，请检查网络或用户名密码');
            console.error('登录请求错误:', error);
        }
    }, 1000); // 设置节流时间为 1 秒

    // 复选框状态变化处理
    const handleRememberChange = (e) => {
        setRemember(e.target.checked);
    };

    return (
        <div className="login-container">
            <Form
                form={form}
                name="login"
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label="用户名"
                    name="username"
                    rules={[{ required: true, message: '请输入用户名！' }]}
                >
                    <Input autoComplete="username" />
                </Form.Item>

                <Form.Item
                    label="密码"
                    name="password"
                    rules={[{ required: true, message: '请输入密码！' }]}
                >
                    <Input.Password autoComplete="current-password" />
                </Form.Item>

                <Form.Item>
                    <Checkbox
                        checked={remember}
                        onChange={handleRememberChange}
                    >
                        记住密码
                    </Checkbox>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block>
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;
