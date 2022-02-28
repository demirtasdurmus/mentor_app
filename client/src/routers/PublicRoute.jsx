import { Outlet, Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function PublicRoute(props) {
    console.log("props", props)
    let location = useLocation();
    // extracting raw session token from cookies
    const rawSessionToken = Cookies.get('__session');
    console.log('raw cookie', rawSessionToken)
    let session;
    try {
        if (rawSessionToken) {
            const sessionToken = (window.atob(rawSessionToken));
            console.log('cookie', sessionToken)
            const base64Url = sessionToken.split('.')[1]
            const base64 = base64Url.replace('-', '+').replace('_', '/')
            session = JSON.parse(window.atob(base64))
        };
    } catch (error) {
        console.log(error)
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    console.log('session', session)

    if (session && session.id) {
        return <Outlet />
    };
    return <Navigate to="/" replace />;
};