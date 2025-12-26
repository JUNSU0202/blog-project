import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { useAuthStore } from "../stores/useAuthStore";

function encodeFileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() ?? "");
    reader.onerror = (error) => reject(error);
  });
}

export default function Write() {
  const navigate = useNavigate();
  const user = useAuthStore((s: { user: any }) => s.user);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [desc, setDesc] = useState("");

  const writer = useMemo(() => user?.username ?? "", [user]);

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    try {
      const file = e.target.files?.[0];
      if (!file) return;
      const base64 = await encodeFileToBase64(file);
      setThumbnail(base64);
    } catch {
      alert("파일을 읽는 데 실패했습니다.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (!title || !category || !writer || !thumbnail || !desc) {
        alert("모든 항목을 입력해 주세요.");
        return;
      }

      const { status } = await axiosInstance.post("/posts", {
        title,
        category,
        username: writer,
        thumbnail,
        desc,
      });

      if (status === 201) {
        alert("글이 등록되었습니다.");
        navigate("/");
      } else {
        throw new Error("등록 실패");
      }
    } catch (error: any) {
      alert(error?.response?.data?.message ?? "글 등록 실패");
    }
  };

  return (
    <main className="page__main">
      <article className="page__write">
        <h2 className="page__title">글쓰기</h2>

        <div className="page__write-container">
          <form className="write-form" onSubmit={handleSubmit}>
            <div className="page__write-form">
              <div className="page__write-group">
                <label htmlFor="title" className="page__write-label">
                  제목
                </label>
                <input
                  id="title"
                  type="text"
                  className="page__write-input"
                  placeholder="Type product name"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="page__write-group">
                <label htmlFor="category" className="page__write-label">
                  카테고리
                </label>
                <select
                  id="category"
                  className="page__write-select"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select category</option>
                  <option value="Travel">Travel</option>
                  <option value="Food">Food</option>
                  <option value="Life">Life</option>
                </select>
              </div>

              <div className="page__write-group">
                <label htmlFor="writer" className="page__write-label">
                  작성자
                </label>
                <input
                  id="writer"
                  type="text"
                  className="page__write-input"
                  value={writer}
                  readOnly
                  required
                />
              </div>

              <div className="page__write-group">
                <label htmlFor="user_avatar" className="page__write-label">
                  썸네일
                </label>
                <label
                  htmlFor="user_avatar"
                  className="page__write-file--hidden"
                >
                  Upload file
                </label>
                <input
                  id="user_avatar"
                  type="file"
                  className="page__write-file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                />
              </div>

              <div className="page__write-group">
                <label htmlFor="description" className="page__write-label">
                  내용
                </label>
                <textarea
                  id="description"
                  className="page__write-textarea"
                  placeholder="Your description here"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="page--btn">
              글등록
            </button>
          </form>
        </div>
      </article>
    </main>
  );
}
