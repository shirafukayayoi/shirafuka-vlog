import React, { useContext, useEffect } from "react";
import BlogPost from "../components/blog/BlogPost";
import { BlogContext } from "../context/BlogContext";
import "../styles/BlogPostPage.css";
import { useParams } from "react-router-dom";

const BlogPostPage = () => {
  // BlogContextから投稿データを取得
  const { posts } = useContext(BlogContext);
  const { slug } = useParams();

  useEffect(() => {
    console.log("BlogPostPage - Current slug:", slug);
    console.log("BlogPostPage - Posts from context:", posts);
    console.log(
      "BlogPostPage - Matching post:",
      posts.find((post) => post.slug === slug)
    );
  }, [posts, slug]);

  return (
    <div className="blog-post-page">
      <BlogPost posts={posts} />
    </div>
  );
};

export default BlogPostPage;
