import React from 'react';
import { Routes, Route } from 'react-router';

import { HomePage } from './pages/HomePage';
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs';
import { VendorIndex } from './pages/VendorIndex.jsx';
import { ReviewIndex } from './pages/ReviewIndex.jsx';
import { ChatApp } from './pages/Chat.jsx';
import { AdminIndex } from './pages/AdminIndex.jsx';

import { VendorDetails } from './pages/VendorDetails';
import { UserDetails } from './pages/UserDetails';

import { AppHeader } from './cmps/AppHeader';
import { AppFooter } from './cmps/AppFooter';
import { UserMsg } from './cmps/UserMsg.jsx';

import { LoginSignup } from './pages/LoginSignup.jsx';
import { Login } from './pages/Login.jsx';
import { Signup } from './pages/Signup.jsx';

import { Provider } from 'react-redux';
import { store } from './store/store.js';

export function RootCmp() {
  return (
    <Provider store={store}>
      <div className="main-layout">
        <UserMsg />
        <AppHeader />

        <main className="main-container">
          <Routes>
            <Route path="" element={<HomePage />} />
            <Route path="about" element={<AboutUs />}>
              <Route path="team" element={<AboutTeam />} />
              <Route path="vision" element={<AboutVision />} />
            </Route>
            <Route path="vendor" element={<VendorIndex />} />
            <Route path="vendor/:vendorId" element={<VendorDetails />} />
            <Route path="user/:id" element={<UserDetails />} />
            <Route path="review" element={<ReviewIndex />} />
            <Route path="chat" element={<ChatApp />} />
            <Route path="admin" element={<AdminIndex />} />
            <Route path="login" element={<LoginSignup />}>
              <Route index element={<Login />} />
              <Route path="signup" element={<Signup />} />
            </Route>
          </Routes>
        </main>

        <AppFooter />
      </div>
    </Provider>
  );
}


// import React from 'react';
// import { Routes, Route } from 'react-router';
// import { Provider } from 'react-redux'; // ייבוא ה-Provider
// import { store } from './store/store'; // ייבוא ה-Redux Store

// import { HomePage } from './pages/HomePage';
// import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs';
// import { VendorIndex } from './pages/VendorIndex.jsx';
// import { ReviewIndex } from './pages/ReviewIndex.jsx';
// import { ChatApp } from './pages/Chat.jsx';
// import { AdminIndex } from './pages/AdminIndex.jsx';

// import { VendorDetails } from './pages/VendorDetails';
// import { UserDetails } from './pages/UserDetails';

// import { AppHeader } from './cmps/AppHeader';
// import { AppFooter } from './cmps/AppFooter';
// import { UserMsg } from './cmps/UserMsg.jsx';
// import { LoginSignup } from './pages/LoginSignup.jsx';
// import { Login } from './pages/Login.jsx';
// import { Signup } from './pages/Signup.jsx';

// export function RootCmp() {
//     const routes = [
//         { path: '', element: <HomePage /> },
//         {
//             path: 'about', element: <AboutUs />, children: [
//                 { path: 'team', element: <AboutTeam /> },
//                 { path: 'vision', element: <AboutVision /> }
//             ]
//         },
//         { path: 'vendor', element: <VendorIndex /> },
//         { path: 'vendor/:vendorId', element: <VendorDetails /> },
//         { path: 'user/:id', element: <UserDetails /> },
//         { path: 'review', element: <ReviewIndex /> },
//         { path: 'chat', element: <ChatApp /> },
//         { path: 'admin', element: <AdminIndex /> },
//         {
//             path: 'login', element: <LoginSignup />, children: [
//                 { path: '', element: <Login /> },
//                 { path: 'signup', element: <Signup /> }
//             ]
//         }
//     ];

//     return (
//         <Provider store={store}> {/* עטיפת כל הקומפוננטות ב-Provider */}
//             <div className="main-container">
//                 <AppHeader />
//                 <UserMsg />
//                 <main>
//                     <Routes>
//                         {routes.map((route, idx) => (
//                             route.children ? (
//                                 <Route key={idx} path={route.path} element={route.element}>
//                                     {route.children.map((child, idx) => (
//                                         <Route key={idx} path={child.path} element={child.element} />
//                                     ))}
//                                 </Route>
//                             ) : (
//                                 <Route key={idx} path={route.path} element={route.element} />
//                             )
//                         ))}
//                     </Routes>
//                 </main>
//                 <AppFooter />
//             </div>
//         </Provider>
//     );
// }
