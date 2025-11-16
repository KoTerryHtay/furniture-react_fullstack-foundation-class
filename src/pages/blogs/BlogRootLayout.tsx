import { Outlet } from "react-router";

export default function BlogRootLayout() {
  return (
    // <Suspense fallback={<div className="mt-16">Loading...</div>}>
    <Outlet />
    // </Suspense>
  );
}
