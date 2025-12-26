import { NavLink, useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { useAuthStore } from "../stores/useAuthStore";

export default function Header() {
  const navigate = useNavigate();
  const { user, unsetAuth } = useAuthStore();

  const handleWriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!user) navigate("/auth");
    else navigate("/write");
  };

  const handleLogout = async () => {
    try {
      const { status } = await axiosInstance.post("/logout");

      if (status === 200) {
        // ✅ PDF 요구사항: zustand 상태 초기화
        unsetAuth();

        // ✅ 로그아웃 후 메인 페이지 이동
        navigate("/");
      } else {
        throw new Error("로그아웃에 실패했습니다.");
      }
    } catch (error) {
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  return (
    <header className="page__header">
      <h1 className="page__logo">
        <NavLink to="/" className="page__logo-link">
          JBNU
        </NavLink>
      </h1>

      <nav className="page__navigation">
        <ul className="page__nav-list">
          <li className="page__nav-item">
            <a href="/write" className="page__nav-link" onClick={handleWriteClick}>
              글쓰기
            </a>
          </li>

          <li className="page__nav-item">
            {user ? (
              <button
                type="button"
                className="page__nav-link"
                onClick={handleLogout}
              >
                로그아웃
              </button>
            ) : (
              <NavLink to="/auth" className="page__nav-link">
                인증
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}
