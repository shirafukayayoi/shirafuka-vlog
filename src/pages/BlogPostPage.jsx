import React, { useContext } from "react";
import BlogPost from "../components/blog/BlogPost";
import { BlogContext } from "../context/BlogContext";
import "../styles/BlogPostPage.css";

const BlogPostPage = () => {
  // BlogContextから投稿データを取得
  const { posts } = useContext(BlogContext);

  return (
    <div className="blog-post-page">
      <BlogPost posts={posts} />
    </div>
  );
};

export default BlogPostPage;
