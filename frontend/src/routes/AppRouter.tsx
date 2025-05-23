import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Layout from "@/layouts/Layout";
import LoginPage from "@/pages/auth/LoginPage";
import SignUpPage from "@/pages/auth/SignUpPage";
import HomePage from "@/pages/HomePage";
import Notifications from "@/pages/Notifications";
import ProfilePage from "@/pages/ProfilePage";
import PostDetailsPage from "@/pages/PostDetailsPage";
import { createBrowserRouter, RouterProvider } from "react-router";
import PrivateRoute from "@/services/PrivateRoute";
import PublicRoute from "@/services/PublicRoute";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout>
          <HomePage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/profile/:username",
    element: (
      <PrivateRoute>
        <Layout>
          <ProfilePage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/notfications",
    element: (
      <PrivateRoute>
        <Layout>
          <Notifications />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/post/:postId",
    element: (
      <PrivateRoute>
        <Layout>
          <PostDetailsPage />
        </Layout>
      </PrivateRoute>
    ),
  },
  {
    path: "/sign-in",
    element: (
      <>
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      </>
    ),
  },
  {
    path: "/sign-up",
    element: (
      <>
        <PublicRoute>
          <SignUpPage />
        </PublicRoute>
      </>
    ),
  },
]);

const AppRouter = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
      <Toaster />
    </QueryClientProvider>
  );
};

export default AppRouter;
