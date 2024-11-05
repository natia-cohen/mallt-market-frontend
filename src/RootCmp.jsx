import React from 'react'
import { Routes, Route } from 'react-router'

import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { StoreIndex } from './pages/StoreIndex.jsx' 
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { StoreDetails } from './pages/StoreDetails'  
import { UserDetails } from './pages/UserDetails'

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'

export function RootCmp() {

    const routes = [
        { path: '', element: <HomePage /> },
        {
            path: 'about', element: <AboutUs />, children: [
                { path: 'team', element: <AboutTeam /> },
                { path: 'vision', element: <AboutVision /> }
            ]
        },
        { path: 'store', element: <StoreIndex /> },  // היה car, עכשיו store
        { path: 'store/:storeId', element: <StoreDetails /> },  // היה carId, עכשיו storeId
        { path: 'user/:id', element: <UserDetails /> },
        { path: 'review', element: <ReviewIndex /> },
        { path: 'chat', element: <ChatApp /> },
        { path: 'admin', element: <AdminIndex /> },
        {
            path: 'login', element: <LoginSignup />, children: [
                { path: '', element: <Login /> },
                { path: 'signup', element: <Signup /> }
            ]
        }
    ]

    return (
        <div className="main-container">
            <AppHeader />
            <UserMsg />

            <main>
                <Routes>
                    {routes.map((route, idx) => (
                        route.children ? (
                            <Route key={idx} path={route.path} element={route.element}>
                                {route.children.map((child, idx) => (
                                    <Route key={idx} path={child.path} element={child.element} />
                                ))}
                            </Route>
                        ) : (
                            <Route key={idx} path={route.path} element={route.element} />
                        )
                    ))}
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}
