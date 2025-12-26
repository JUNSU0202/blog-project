import { useEffect,  useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import searchIcon from "../../assets/images/search.png";

export default function SearchArea() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const initialQ = params.get("q") ?? "";

  const [query, setQuery] = useState(initialQ);

  // debounce 300ms
  const debounceMs = 300;

  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = query.trim();
      navigate(trimmed ? `/?q=${encodeURIComponent(trimmed)}` : "/");
    }, debounceMs);
    return () => clearTimeout(timer);
  }, [query, navigate]);

  // 검색 버튼은 제출만 (실제 검색은 debounce로 자동)
  const onSubmit = (e: React.FormEvent) => e.preventDefault();

  return (
    <section className="search-area">
      <article className="search-area__search">
        <h2 className="search-area__title">Blog Project</h2>
        <p className="search-area__description">
          A Blog About Food, Experience, and Recipes.
        </p>

        <form method="get" className="search-area__form" onSubmit={onSubmit}>
          <input
            type="text"
            name="q"
            placeholder="Search"
            className="search-area__input"
            autoComplete="off"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" className="search-area__submit" aria-label="search">
            <img
              src={searchIcon}
              alt="search-icon"
              className="search-area__icon"
            />
          </button>
        </form>
      </article>
    </section>
  );
}
