import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { useAuthStore } from "../stores/useAuthStore";

type PageType = "login" | "register";

export default function Auth() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s: { setAuth: any }) => s.setAuth);

  const [pageType, setPageType] = useState<PageType>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [username, setUsername] = useState("");

  const handlePageChange = (type: PageType) => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
    setUsername("");
    setPageType(type);
  };

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!email || !password || !username) {
        alert("모든 항목을 입력해 주세요.");
        return;
      }

      if (password !== passwordConfirm) {
        alert("비밀번호 확인이 일치하지 않습니다.");
        return;
      }

      await axiosInstance.post("/register", {
        email,
        password,
        username,
      });

      alert("회원가입 성공! 로그인 해주세요.");
      setPassword("");
      setPasswordConfirm("");
      setUsername("");
      setPageType("login");
    } catch (error: any) {
      alert(error?.response?.data?.message ?? "회원가입 실패");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        alert("이메일과 비밀번호를 입력해 주세요.");
        return;
      }

      const { data } = await axiosInstance.post("/login", {
        email,
        password,
      });

      setAuth(data.user, data.accessToken);
      navigate("/");
    } catch (error: any) {
      alert(error?.response?.data?.message ?? "로그인 실패");
    }
  };

  return (
    <main className="page__main">
      <article className="page-auth">
        <section className="page-auth__container">
          <nav className="page-auth__toggle">
            <button
              type="button"
              className={`page-auth__toggle-button ${
                pageType === "login" &&
                "page-auth__toggle-button--active"
              }`}
              onClick={() => handlePageChange("login")}
            >
              로그인
            </button>
            <button
              type="button"
              className={`page-auth__toggle-button ${
                pageType === "register" &&
                "page-auth__toggle-button--active"
              }`}
              onClick={() => handlePageChange("register")}
            >
              회원가입
            </button>
          </nav>

          <div className="page-auth__form-section">
            {/* 로그인 */}
            <form
              className={`auth-form ${
                pageType === "login" && "auth-form--active"
              }`}
              onSubmit={handleLogin}
            >
              <label htmlFor="login-email" className="a11y-hidden">
                이메일
              </label>
              <input
                id="login-email"
                type="email"
                className="auth-form__input"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={pageType === "login"}
              />

              <label htmlFor="login-password" className="a11y-hidden">
                비밀번호
              </label>
              <input
                id="login-password"
                type="password"
                className="auth-form__input"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={pageType === "login"}
              />

              <button type="submit" className="auth-form__submit">
                로그인
              </button>
            </form>

            {/* 회원가입 */}
            <form
              className={`auth-form ${
                pageType === "register" && "auth-form--active"
              }`}
              onSubmit={handleSignup}
            >
              <label htmlFor="signup-email" className="a11y-hidden">
                이메일
              </label>
              <input
                id="signup-email"
                type="email"
                className="auth-form__input"
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={pageType === "register"}
              />

              <label htmlFor="signup-name" className="a11y-hidden">
                이름
              </label>
              <input
                id="signup-name"
                type="text"
                className="auth-form__input"
                placeholder="이름"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={pageType === "register"}
              />

              <label htmlFor="signup-password" className="a11y-hidden">
                비밀번호
              </label>
              <input
                id="signup-password"
                type="password"
                className="auth-form__input"
                placeholder="비밀번호"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={pageType === "register"}
              />

              <label
                htmlFor="signup-confirm-password"
                className="a11y-hidden"
              >
                비밀번호 확인
              </label>
              <input
                id="signup-confirm-password"
                type="password"
                className="auth-form__input"
                placeholder="비밀번호 확인"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                required={pageType === "register"}
              />

              <button type="submit" className="auth-form__submit">
                회원가입
              </button>
            </form>
          </div>
        </section>
      </article>
    </main>
  );
}
