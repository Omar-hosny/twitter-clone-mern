import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/auth/LoginPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import HomePage from "@/pages/HomePage";
import Notifications from "@/pages/Notifications";
import ProfilePage from "@/pages/ProfilePage";
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/profile/:username",
    element: (
      <Layout>
        <ProfilePage />
      </Layout>
    ),
  },
  {
    path: "/notfications",
    element: (
      <Layout>
        <Notifications />
      </Layout>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <>
        <LoginPage />
      </>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <>
        <SignUpPage />
      </>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
