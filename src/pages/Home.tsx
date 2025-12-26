import SearchArea from "../components/home/SearchArea";
import PostArea from "../components/home/PostArea";

export default function Home() {
  return (
    <main className="page__main">
      <section className="search-area">
        <SearchArea />
      </section>

      <section className="posts-area">
        <PostArea />
      </section>
    </main>
  );
}
