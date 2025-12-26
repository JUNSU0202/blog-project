import { format } from "date-fns";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../../api/axiosInstance.ts";
import { useAxios } from "../../hooks/useAxios";
import { useAuthStore } from "../../stores/useAuthStore.ts";
import type { Post } from "../../types/post";

export default function ReadArea() {
  const params = useParams(); // :id
  const navigate = useNavigate();
  const user = useAuthStore((s) => s.user);

  const {
    data: post,
    isLoading,
    error,
  } = useAxios<Post>(`/posts/${params.id}`, {} as Post);

  const handleDelete = async () => {
    try {
      const { status } = await axiosInstance.delete(`/posts/${params.id}`);
      if (status === 204) {
        alert("삭제되었습니다.");
        navigate("/");
      } else {
        throw new Error("삭제에 실패했습니다.");
      }
    } catch (e: any) {
      alert(e?.response?.data?.message ?? "삭제 실패");
    }
  };

  if (isLoading) return <p className="page__loading">Loading...</p>;
  if (error) return <p className="page__error">{error}</p>;
  if (!post?.id) return <p className="page__error">게시글을 찾을 수 없습니다.</p>;

  return (
    <article className="page__read">
      <section>
        <strong className="page__read-tag">{post.category}</strong>
        <h2 className="page__read-title">{post.title}</h2>
        <div className="page__read-meta-group">
          <p className="page__read-profile">
            {post.username} • {format(new Date(post.regdate), "MMM dd, yyyy")}
          </p>

          {/* 로그인 유저와 게시글 작성자가 같은 경우에만 삭제 버튼 렌더링 */}
          {user?.email === post.author && (
            <button className="page__read-btn" onClick={handleDelete}>
              삭제
            </button>
          )}
        </div>

        <img src={post.thumbnail} alt={post.title} className="page__read-image" />
      </section>

      <section className="page__read-desc">
        {post.desc.split("\n").map((line, idx) => (
          <p key={idx}>{line}</p>
        ))}
      </section>
    </article>
  );
}
