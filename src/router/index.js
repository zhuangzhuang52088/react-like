//路由配置
import Layout from "@/pages/Layout"; //引入布局组件
import Login from "@/pages/Login";

import { createBrowserRouter } from "react-router-dom";

//路由实例配置

const router = createBrowserRouter([
  { path: "/", element: <Layout /> },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router; //导出路由实例
