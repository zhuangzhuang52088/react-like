//路由配置
import Layout from "@/pages/Layout"; //引入布局组件
import Login from "@/pages/Login";
import Article from "@/pages/Article";
import Publish from "@/pages/Publish";
import Home from "@/pages/Home";

import { createBrowserRouter } from "react-router-dom";
import { AuthRoute } from "@/components/AuthRoute";

//路由实例配置

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthRoute>
        <Layout />
      </AuthRoute>
    ),
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "article",
        element: <Article />,
      },
      {
        path: "publish",
        element: <Publish />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router; //导出路由实例
