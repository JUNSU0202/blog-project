interface User {
  email: string; // 이메일
  username: string; // 이름
}

interface AuthStore {
  user: User | null; // 로그인 한 사용자 정보 (로그인 하지 않은 경우 null)
  accessToken: string | null; // 현재 사용 중인 Access Token (로그인 하지 않은 경우 null)
  setAuth: (user: User, accessToken: string) => void; // 사용자 정보 및 Access Token 저장하는 함수 (로그인 시)
  unsetAuth: () => void; // 사용자 정보와 토큰을 초기화하는 함수 (로그아웃 시)
}