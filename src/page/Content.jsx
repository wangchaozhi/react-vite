import { Outlet } from 'react-router-dom';

import './Content.css'
const Content = () => (
    <div className="content-container">
        <Outlet /> {/* 用于渲染基于路由的内容 */}
    </div>
);

export default Content;
