import React, { useContext } from "react";
import BlogList from "../components/blog/BlogList";
import { BlogContext } from "../context/BlogContext";
import "../styles/BlogPage.css";

const BlogPage = () => {
  // BlogContextから投稿データを取得
  const { posts } = useContext(BlogContext);

  // 日付の新しい順に並べ替え
  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return (
    <div className="blog-page">
      <header className="page-header">
        <h1>ブログ記事一覧</h1>
        <p>これまでに投稿したすべての記事を時系列順で表示しています</p>
      </header>

      <BlogList posts={sortedPosts} />
    </div>
  );
};

export default BlogPage;
