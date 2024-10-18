import ProtectedRoute from './ProtectedRoute';
import Home from '../page/Home';
import About from '../page/About';
import Contact from '../page/Contact';
import Profile from "@/page/Profile.jsx";

const routes = [
    {
        path: '/',
        name: 'Home',
        component: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        ),
    },
    {
        path: '/about',
        name: 'About',
        component: (
            <ProtectedRoute>
                <About />
            </ProtectedRoute>
        ),
    },
    {
        path: '/contact',
        name: 'Contact',
        component: (
            <ProtectedRoute>
                <Contact />
            </ProtectedRoute>
        ),
    },
    {
        path: '/profile',
        name: 'Profile',
        component: (
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        ),
    },
];

export default routes;
