import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom"; // URLパラメータの取得とリンク用
import ReactMarkdown from "react-markdown"; // マークダウンレンダリング用
import remarkGfm from "remark-gfm"; // GFM (GitHub Flavored Markdown) サポート用
import rehypeRaw from "rehype-raw"; // HTML処理用
import "../../styles/BlogPost.css"; // ブログ記事専用のスタイル

/**
 * ブログ記事詳細コンポーネント
 *
 * URLパラメータから取得したslugに対応するブログ記事を表示します。
 * 記事が見つからない場合は、エラーメッセージを表示します。
 * ReactMarkdownを使用してマークダウン形式のコンテンツをレンダリングします。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Array} props.posts - ブログ記事の配列
 */
const BlogPost = ({ posts }) => {
  // React RouterのuseParams フックを使用してURLからslugパラメータを取得
  // 例：/blog/welcome-to-shirafuka-blog の場合、slugは"welcome-to-shirafuka-blog"になる
  const { slug } = useParams();

  useEffect(() => {
    console.log("BlogPost - Current slug:", slug);
    console.log("BlogPost - Posts received:", posts);
    if (posts && posts.length > 0) {
      console.log("BlogPost - First post:", posts[0]);
      console.log(
        "BlogPost - Matching post:",
        posts.find((p) => p.slug === slug)
      );
    } else {
      console.log("BlogPost - No posts available or empty array");
    }
  }, [posts, slug]);

  // 受け取ったslugに一致する記事を探す
  const post = Array.isArray(posts)
    ? posts.find((post) => post.slug === slug)
    : null;

  // 記事が見つからない場合のエラー表示
  if (!post) {
    return (
      <div className="blog-post-not-found">
        <h2>記事が見つかりませんでした</h2>
        <p>お探しの記事は存在しないか、削除された可能性があります。</p>
        <Link to="/blog" className="back-to-blog">
          ブログ一覧に戻る
        </Link>
      </div>
    );
  }

  // 記事が見つかった場合、記事の内容を表示
  return (
    <article className="blog-post">
      {" "}
      <header className="blog-post-header">
        <h1 className="blog-post-title">{post.title}</h1>
        <div className="blog-post-meta">
          {/* 日付をJapanese形式で表示 */}
          <span className="blog-post-date">
            {new Date(post.date).toLocaleDateString("ja-JP")}
          </span>
        </div>
      </header>
      <div className="blog-post-content">
        {/* ReactMarkdownを使用してマークダウンコンテンツをレンダリング */}
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: (props) => <h1 className="blog-post-h1" {...props} />,
            h2: (props) => <h2 className="blog-post-h2" {...props} />,
            h3: (props) => <h3 className="blog-post-h3" {...props} />,
            p: (props) => <p className="blog-post-p" {...props} />,
            ul: (props) => <ul className="blog-post-ul" {...props} />,
            ol: (props) => <ol className="blog-post-ol" {...props} />,
            li: (props) => <li className="blog-post-li" {...props} />,
            blockquote: (props) => (
              <blockquote className="blog-post-blockquote" {...props} />
            ),
            a: (props) => (
              <a
                className="blog-post-a"
                target="_blank"
                rel="noopener noreferrer"
                {...props}
              />
            ),
            code: ({ inline, ...props }) =>
              inline ? (
                <code className="blog-post-inline-code" {...props} />
              ) : (
                <code className="blog-post-code-block" {...props} />
              ),
            pre: (props) => <pre className="blog-post-pre" {...props} />,
            table: (props) => <table className="blog-post-table" {...props} />,
            thead: (props) => <thead className="blog-post-thead" {...props} />,
            tbody: (props) => <tbody className="blog-post-tbody" {...props} />,
            tr: (props) => <tr className="blog-post-tr" {...props} />,
            th: (props) => <th className="blog-post-th" {...props} />,
            td: (props) => <td className="blog-post-td" {...props} />,
            img: (props) => (
              <img className="blog-post-img" {...props} alt={props.alt || ""} />
            ),
          }}
        >
          {post.content.trim()}
        </ReactMarkdown>
      </div>
      <footer className="blog-post-footer">
        <Link to="/blog" className="back-to-blog">
          ブログ一覧に戻る
        </Link>
      </footer>
    </article>
  );
};

export default BlogPost;
