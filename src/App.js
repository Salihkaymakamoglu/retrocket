
import React, { useState, useEffect } from "react";
import "./App.css";
import jsonData from "./assets/posts/1.json";
import PostModal from "./postModal";

function App() {
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    setPosts(jsonData.data);
    console.log(jsonData.data);
    const storedRecentlyViewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];
    setRecentlyViewed(storedRecentlyViewed);
  }, []);

  function clearLocalStorageOnReload() {
    localStorage.clear();
  }

  window.addEventListener("beforeunload", clearLocalStorageOnReload);

  const handlePostClick = (post) => {
    const postId = post.id;
    if (!recentlyViewed.some((item) => item.id === postId)) {
      const updatedRecentlyViewed = [...recentlyViewed, post];
      if (updatedRecentlyViewed.length > 5) {
        updatedRecentlyViewed.shift();
      }
      setRecentlyViewed(updatedRecentlyViewed);
      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(updatedRecentlyViewed)
      );
    }
    openModal();
  };
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  // const fetchPostDetails = (postId) => {
  //   const postDetailsUrl = `src/assets/post-details/${postId}.json`;
  //   fetch(postDetailsUrl)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setPostDetails(data);
  //     })
  //     .catch((error) => console.error("Error fetching post details:", error));
  // };

  return (
    <>
      <div class="header">
        <nav class="navbar">
          <a href="">HOME</a>
          <a href="">AUTHORS</a>
        </nav>
      </div>
      <div>
        <section class="recent-posts flex">
          <h2 class="heading">Recent Posts</h2>
          <a href="#">
            <div id="posts">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="card home-card"
                  onClick={() => handlePostClick(post)}
                >
                  <h2 className="post-title center">{post.title}</h2>
                  <img
                    className="featured-image"
                    src={post.featured_image_url}
                    alt="Featured Image"
                  />
                  <div className="row">
                    <div className="column">
                      <p className="post-info">
                        Published by{" "}
                        <h5>
                          {post.user.name} {post.user.surname}
                        </h5>
                      </p>
                    </div>
                    <div className="column">
                      <p className="post-info">
                        Published at <h5>{post.published_at}</h5>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              <PostModal
                isOpen={isModalOpen}
                onClose={closeModal}
              />
            </div>
          </a>
        </section>
        {recentlyViewed.length > 0 && (
        <section class="recently-viewed flex">
          <h2 class="heading">Recently viewed</h2>
          <a href="#">
            <div id="recently-viewed">
              {recentlyViewed.map((post) => (
                <div
                  key={post.id}
                  className="card home-card"
                  onClick={() => handlePostClick(post)}
                >
                  <h2 className="post-title center">{post.title}</h2>
                  <img
                    className="featured-image"
                    src={post.featured_image_url}
                    alt="Featured Image"
                  />
                  <div className="row">
                    <div className="column">
                      <p className="post-info">
                        Published by
                        <h5>
                          {" "}
                          {post.user.name} {post.user.surname}{" "}
                        </h5>
                      </p>
                    </div>
                    <div className="column">
                      <p className="post-info">
                        Published at<h5> {post.published_at} </h5>
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </a>
        </section>
        )}
      </div>
    </>
  );
}
export default App;
