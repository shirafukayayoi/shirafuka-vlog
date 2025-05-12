import React from "react";
import { Link } from "react-router-dom"; // ページリンク用のコンポーネント
import ReactMarkdown from "react-markdown"; // マークダウンレンダリング用
import remarkGfm from "remark-gfm"; // GFM (GitHub Flavored Markdown) サポート用
import "../../styles/BlogList.css"; // ブログリストのスタイル

/**
 * ブログ記事一覧コンポーネント
 *
 * 複数のブログ記事をカード形式で一覧表示するコンポーネントです。
 * 各カードには記事のタイトル、日付、抜粋が表示され、詳細ページへのリンクが含まれます。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.posts - 表示するブログ記事の配列
 */
const BlogList = ({ posts }) => {
  return (
    <div className="blog-list">
      {/* posts配列をmapで反復処理し、各記事ごとにカードを生成 */}
      {posts.map((post) => (
        <article key={post.id} className="blog-card">
          <div className="blog-card-content">
            <h2 className="blog-title">
              {/* 各記事詳細ページへのリンク。/blog/[記事のスラッグ]のURL形式 */}
              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="blog-meta">
              <span className="blog-date">
                {/* 日付を日本語形式で表示 */}
                {new Date(post.date).toLocaleDateString("ja-JP")}{" "}
              </span>
            </div>
            {/* 記事の抜粋文を表示 */}
            <div className="blog-excerpt">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {post.excerpt}
              </ReactMarkdown>
            </div>
            {/* 記事詳細ページへのリンク */}
            <Link to={`/blog/${post.slug}`} className="read-more">
              続きを読む &rarr;
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogList;
