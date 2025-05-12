import React, { useContext } from "react";
import { Link } from "react-router-dom"; // ページリンク用
import BlogList from "../components/blog/BlogList"; // ブログ記事一覧コンポーネント
import { BlogContext } from "../context/BlogContext"; // ブログコンテキスト
import "../styles/HomePage.css"; // ホームページのスタイル

/**
 * ホームページコンポーネント
 *
 * サイトのメインページを表示します。以下の要素を含みます：
 * - ヒーローセクション（サイト概要と呼びかけ）
 * - 最新の記事一覧（最大3件）
 */
const HomePage = () => {
  // BlogContextから投稿データを取得
  const { posts } = useContext(BlogContext);

  // 日付の新しい順に並べ替えて、最新の3件のみを抽出
  const latestPosts = [...posts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3);

  return (
    <div className="home-page">
      {/* ヒーローセクション：サイトの紹介と呼びかけ */}
      <section className="hero">
        <div className="hero-content">
          <h1>白深ブログへようこそ</h1>
          <p>日々の出来事や趣味、考えたことなどを綴っています</p>
          <Link to="/blog" className="cta-button">
            ブログを読む
          </Link>
        </div>
      </section>

      {/* 最新の記事セクション */}
      <section className="latest-posts">
        <div className="section-header">
          <h2>最新の記事</h2>
          <Link to="/blog" className="view-all">
            すべての記事を見る &rarr;
          </Link>
        </div>
        {/* BlogListコンポーネントを使って最新記事を表示 */}
        <BlogList posts={latestPosts} />
      </section>
    </div>
  );
};

export default HomePage;
