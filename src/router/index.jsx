import React from "react";
import { useRoutes } from "react-router-dom";
import Home from "../pages/home/Home";
import Detail from "../pages/detail/Detail";
import Layout from "../pages/layout/Layout";

const Router = () => {
  return (
    <>
      {useRoutes([
        {
          path: "/",
          element: <Layout />,
          children: [
            { path: "/", element: <Home /> },
            {
              path: "product/:id",
              element: <Detail />,
            },
          ],
        },
        {
          path: "*",
          element: <h1>404 Not Found</h1>,
          status: 404,
        },
      ])}
    </>
  );
};

export default Router;
