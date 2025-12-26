import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function UnauthenticatedLayout() {
  const user = useAuthStore((state) => state.user);

  // 이미 로그인 상태면 메인으로
  if (user) {
    return <Navigate to="/" replace />;
  }

  // 로그아웃 상태면 Auth 페이지 허용
  return <Outlet />;
}
