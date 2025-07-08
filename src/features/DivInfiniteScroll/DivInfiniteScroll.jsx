import { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import "./divinfinite.css";

const DivInfinite = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const scrollContainerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const contentRef = useRef(null);

  const fetchPosts = async (pageNum) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`
    );
    const data = await res.json();

    setPosts((prevPosts) => [...prevPosts, ...data]);

    if (data.length < 10) {
      setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("called");
    fetchPosts(page);
  }, [page]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      console.log(scrollTop + clientHeight, "test", scrollHeight - 500);

      if (
        scrollTop + clientHeight >= scrollHeight - 500 &&
        !loading &&
        hasMore
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const content = contentRef.current;

    if (open) {
      const contentHeight = content.scrollHeight;
      wrapper.style.height = contentHeight + "px";
    }
  }, [open]);

  return (
    <div className="infinite-scroll-wrapper">
      <div className="container">
        <button onClick={() => setOpen((prev) => !prev)}>Toggle Content</button>
        {open && (
          <div className="sliding-wrapper" ref={wrapperRef}>
            <div className="inner" ref={contentRef}>
              {[...Array(10)].map((_, i) => (
                <p key={i}>Paragraph {i + 1}</p>
              ))}
            </div>
          </div>
        )}
      </div>
      <h1>Infinite Scroll Posts</h1>
      <div
        className="infinite-scroll"
        ref={scrollContainerRef}
        style={{
          height: "250px",
          width: "70%",
          overflowY: "auto",
          border: "2px solid green",
          borderRadius: "3px",
          padding: "1rem",
          margin: "auto",
          marginTop: "120px",
        }}
      >
        {posts.map((post, index) => (
          <div key={index} className="post-item">
            <h2>
              {post.id}. {post.title}
            </h2>
            <p>{post.body}</p>
          </div>
        ))}

        {loading && <Loader />}

        {!hasMore && !loading && posts.length > 0 && (
          <p>You have reached the end of the posts.</p>
        )}

        {!loading && posts.length === 0 && !hasMore && (
          <h3>No posts available at the moment.</h3>
        )}
      </div>
    </div>
  );
};

export default DivInfinite;
