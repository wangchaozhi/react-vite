import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('isAuthenticated'); // 检查登录状态

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />; // 未登录时重定向到登录页面
    }

    return children; // 已登录则正常渲染子组件
};

export default ProtectedRoute;
