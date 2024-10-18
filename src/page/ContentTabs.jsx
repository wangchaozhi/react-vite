import { Tabs } from 'antd';
import './ContentTabs.css'; // 引入自定义样式

const ContentTabs = ({ tabs, activeKey, onChange, onRemove }) => {
    const items = tabs.map((tab) => ({
        label: tab.title,
        key: tab.key,
        closable: tab.key !== '/', // 控制是否可以关闭标签
    }));

    return (
        <div className="tabs-container">
        <Tabs

            activeKey={activeKey}
            onChange={onChange}
            type="editable-card"
            hideAdd
            onEdit={(targetKey, action) => {
                if (action === 'remove') onRemove(targetKey);
            }}
            items={items} // 使用 items 传递标签页数据
        />
        </div>
    );
};

export default ContentTabs;
