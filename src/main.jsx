import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";
// import Root from './Components/Root/Root.jsx';
// import Login from './Components/Login/Login.jsx';

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root></Root>,
//     children: [
//       {
//         path: "login",
//         element: <Login></Login>
//       },
//     ],
//   },
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RouterProvider router={router} /> */}
    <App></App>
  </StrictMode>,
)
