import { useMemo } from "react";
import { useSearchParams } from "react-router";
import { useAxios } from "../../hooks/useAxios";
import type { Post } from "../../types/post";
import PostItem from "./PostItem";

export default function PostArea() {
  const [params] = useSearchParams();
  const q = params.get("q") ?? "";

  const url = useMemo(() => {
    const query = q.trim();
    return query ? `/posts/search?title=${encodeURIComponent(query)}` : "/posts";
  }, [q]);

  const { data, isLoading, error } = useAxios<Post[]>(url, []);

  return (
    <section className="posts-area">
      {isLoading && <p className="page__loading">Loading...</p>}
      {error && <p className="page__error">{error}</p>}

      {data?.map((post) => (
        <PostItem key={post.id} {...post} />
      ))}
    </section>
  );
}
