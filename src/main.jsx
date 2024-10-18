import { StrictMode  } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'; // 引入 Redux Provider
import { store } from './store/store.js'; // 引入 Redux store
import App from './App.jsx'
import './index.css'
import { BrowserRouter as Router } from 'react-router-dom'; // 引入 Router

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <StrictMode>
            <Router>
                <App />
            </Router>
        </StrictMode>
    </Provider>

)


