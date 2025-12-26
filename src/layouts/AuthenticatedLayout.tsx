import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

export default function AuthenticatedLayout() {
  const user = useAuthStore((state) => state.user);

  // 로그아웃 상태면 인증 페이지로
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // 로그인 상태면 자식 페이지 렌더링
  return <Outlet />;
}
