import { useEffect, useRef, useState, useCallback } from "react";
import Loader from "../Loader/Loader";

const InfiniteScroll = () => {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observer = useRef();

  const lastPostElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchPosts = async (pageNum) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_page=${pageNum}&_limit=10`
    );
    const data = await res.json();

    setPosts((prevPosts) => [...prevPosts, ...data]);

    // JSONPlaceholder has 100 posts max
    if (data.length < 10 
        // || pageNum * 10 >= 100
    ) {
      setHasMore(false);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  return (
    <div className="infinite-scroll">
      <h1>Infinite Scroll Posts</h1>
      <div className="posts-container">
        {posts.map((post, index) => {
          if (index === posts.length - 1 && hasMore) {
            return (
              <div ref={lastPostElementRef} key={index} className="post-item">
                <h2>
                  {post.id}. {post.title}
                </h2>
                <p>{post.body}</p>
              </div>
            );
          } else {
            return (
              <div key={index} className="post-item">
                <h2>
                  {post.id}. {post.title}
                </h2>
                <p>{post.body}</p>
              </div>
            );
          }
        })}

        {loading && <Loader/>}

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

export default InfiniteScroll;
