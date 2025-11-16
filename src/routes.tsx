import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router";

import RootLayout from "@/pages/RootLayout";
import HomePage from "@/pages/Home";
import ErrorPage from "@/pages/Error";
import AboutPage from "@/pages/About";
import ProductRootLayout from "./pages/products/ProductRootLayout";
import ProductPage from "./pages/products/Product";
import ProductDetailPage from "./pages/products/ProductDetail";
import LoginPage from "./pages/auth/Login";

import {
  blogInfiniteLoader,
  confirmLoader,
  homeLoader,
  loginLoader,
  newPasswordLoader,
  otpLoader,
  postLoader,
  productInfiniteLoader,
  productLoader,
  verifyLoader,
} from "./router/loader";
import {
  confirmAction,
  loginAction,
  logoutAction,
  newPasswordAction,
  otpAction,
  registerAction,
  resetAction,
  verifyAction,
} from "./router/action";
import AuthRootLayout from "./pages/auth/AuthRootLayout";
import SignUpPage from "./pages/auth/SignUp";
import OtpPage from "./pages/auth/Otp";
import ConfirmPasswordPage from "./pages/auth/ConfirmPassword";
import ResetPasswordPage from "./pages/auth/ResetPassword";
import VerifyOtpPage from "./pages/auth/VerifyOtp";
import NewPasswordPage from "./pages/auth/NewPassword";

const BlogRootLayout = lazy(() => import("@/pages/blogs/BlogRootLayout"));
const BlogPage = lazy(() => import("@/pages/blogs/Blog"));
const BlogDetailPage = lazy(() => import("@/pages/blogs/BlogDetail"));

// const BlogDetailPage = lazy(
//   async () =>
//     await new Promise((resolve) => setTimeout(resolve, 3000)).then(
//       () => import("@/pages/blogs/BlogDetail"),
//     ),
// );

// const SuspenseFallback = () => <div className="text-center">Loading</div>;

// const SuspenseBlog = () => (
//   <Suspense fallback={<p className="mt-16">Loading...</p>}>
//     <BlogPage />
//   </Suspense>
// );

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        Component: HomePage,
        loader: homeLoader,
      },
      { path: "about", Component: AboutPage },
      {
        path: "blogs",
        lazy: async () => ({ Component: BlogRootLayout }),
        // Component: BlogRootLayout,
        children: [
          {
            index: true,
            // Component: BlogPage,
            lazy: async () => ({ Component: BlogPage }),
            loader: blogInfiniteLoader,
            // element: (
            //   <Suspense fallback={<SuspenseFallback />}>
            //     <BlogPage />
            //   </Suspense>
            // ),
          },
          {
            path: ":postId",
            // Component: BlogDetailPage,
            lazy: async () => ({ Component: BlogDetailPage }),
            loader: postLoader,
          },
        ],
      },
      {
        path: "products",
        Component: ProductRootLayout,
        children: [
          {
            index: true,
            Component: ProductPage,
            loader: productInfiniteLoader,
          },
          {
            path: ":productId",
            Component: ProductDetailPage,
            loader: productLoader,
            // action: favouriteAction,
          },
        ],
      },
    ],
  },
  {
    path: "login",
    Component: LoginPage,
    action: loginAction,
    loader: loginLoader,
  },
  {
    path: "register",
    Component: AuthRootLayout,
    children: [
      {
        index: true,
        Component: SignUpPage,
        loader: loginLoader,
        action: registerAction,
      },
      {
        path: "otp",
        Component: OtpPage,
        loader: otpLoader,
        action: otpAction,
      },
      {
        path: "confirm-password",
        Component: ConfirmPasswordPage,
        loader: confirmLoader,
        action: confirmAction,
      },
    ],
  },
  {
    path: "/logout",
    action: logoutAction,
    loader: () => redirect("/"),
  },
  {
    path: "/reset",
    Component: AuthRootLayout,
    children: [
      {
        index: true,
        Component: ResetPasswordPage,
        action: resetAction,
      },
      {
        path: "verify",
        Component: VerifyOtpPage,
        loader: verifyLoader,
        action: verifyAction,
      },
      {
        path: "new-password",
        Component: NewPasswordPage,
        loader: newPasswordLoader,
        action: newPasswordAction,
      },
    ],
  },
]);
