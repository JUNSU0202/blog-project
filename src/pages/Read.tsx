import ReadArea from "../components/read/ReadArea";
import RecommendationArea from "../components/read/RecommendationArea";

export default function Read() {
  return (
    <main className="page__main">
      <article className="page__read">
        <ReadArea />
      </article>

      <article className="page__recommend">
        <RecommendationArea />
      </article>
    </main>
  );
}