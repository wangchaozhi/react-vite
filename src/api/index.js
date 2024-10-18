import axios from 'axios';


// // 根据环境动态设置 baseURL
// const baseURL = process.env.NODE_ENV === 'production'
//     ? 'https://api.production.com' // 生产环境地址（打包后）
//     : 'http://localhost:8090'; // 开发环境地址（开发时
// 定义全局的 loading 状态
// 从环境变量中获取 API 的 baseURL
export const baseURL = import.meta.env.VITE_APP_API_BASE_URL;



// 创建 axios 实例时确保 baseURL 正确
const apiClient = axios.create({
    baseURL: baseURL+"/api", // 后端的基础URL
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json', // 设置默认的请求头
    },
});


// 请求拦截器
apiClient.interceptors.request.use(
    (config) => {
        // 在发送请求之前将 loading 设置为 true
        // 在发送请求之前做一些操作，例如添加认证 token
        const token = localStorage.getItem('authToken'); // 获取存储的 token
        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // 添加到请求头中
        }
        return config;
    },
    (error) => {
        // 请求错误时，将 loading 设置为 false
        // 处理请求错误
        return Promise.reject(error);
    }
);



// 响应拦截器
apiClient.interceptors.response.use(
    (response) => {
        // 请求成功后，将 loading 设置为 false
        // 可以根据后端的返回结构处理响应数据
        return response.data; // 只返回响应的 data
    },
    (error) => {
        // 请求失败时，将 loading 设置为 false
        // 统一处理响应错误
        if (error.response) {
            // 服务器返回的错误
            console.error('API Error:', error.response.data.message || '请求失败');
        } else {
            console.error('Network Error:', error.message || '网络错误');
        }
        return Promise.reject(error);
    }
);

// 导出统一的 API 调用函数
export const get = (url, params) => apiClient.get(url, { params });
export const post = (url, data) => apiClient.post(url, data);
export const put = (url, data) => apiClient.put(url, data);
export const del = (url) => apiClient.delete(url);

// 示例 API 调用
export const fetchUsers = () => get('/users'); // 示例：获取用户列表
export const createUser = (userData) => post('/users', userData); // 示例：创建用户
// 添加到 api/index.js 文件
// 封装搜索接口的 POST 请求
// export const searchTest = (data) => post('/officeAutomation/test/search', data);
export const searchTest = (data) => get('/officeAutomation/test/search', data);




