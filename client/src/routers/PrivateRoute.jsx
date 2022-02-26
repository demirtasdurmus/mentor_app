import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';


export default function PrivateRoute({ children }) {
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
        return children;
    };
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />;
};