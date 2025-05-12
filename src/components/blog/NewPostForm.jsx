import { useState, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { useNavigate } from "react-router-dom";
import "../../styles/NewPostForm.css";

/**
 * 新しいブログ記事を作成するためのフォームコンポーネント
 *
 * マークダウン形式でコンテンツを入力でき、画像アップロード機能も備えています
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {Function} props.onSubmit - フォーム送信時に呼び出される関数
 * @param {Array} props.posts - 既存の投稿一覧
 */
const NewPostForm = ({ onSubmit, posts }) => {
  // ナビゲーション用のフック
  const navigate = useNavigate();

  // フォームの状態を管理
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(
    "# 新しい記事\n\nここに内容を入力してください..."
  );
  const [excerpt, setExcerpt] = useState("");
  const [isPreview, setIsPreview] = useState(false);

  // ファイル選択用の参照
  const fileInputRef = useRef(null);

  /**
   * スラグを生成する関数
   * タイトルを小文字に変換し、特殊文字やスペースをハイフンに置き換える
   */
  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, "") // 特殊文字を削除
      .replace(/\s+/g, "-") // スペースをハイフンに置換
      .replace(/--+/g, "-"); // 複数のハイフンを単一のハイフンに置換
  };

  /**
   * 画像アップロード処理
   * 実際のアプリケーションではサーバーにアップロードし、URLを取得する処理が必要ですが、
   * このデモではFileReaderを使ってBase64エンコードし、インラインでマークダウンに挿入します
   */
  const handleImageUpload = (e) => {
    const files = e.target.files;
    if (files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      // ファイルをBase64エンコードして、マークダウン記法で画像を挿入
      const imageMarkdown = `\n![${file.name}](${reader.result})\n`;
      setContent((prevContent) => prevContent + imageMarkdown);
    };

    reader.readAsDataURL(file);
  };

  /**
   * 画像アップロードボタンクリック時のハンドラ
   */
  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };

  /**
   * フォーム送信時の処理
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert("タイトルを入力してください");
      return;
    }

    // 現在の日付を YYYY-MM-DD 形式で取得
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];

    // 新しい記事オブジェクトを作成
    const newPost = {
      id: posts.length > 0 ? Math.max(...posts.map((post) => post.id)) + 1 : 1,
      title: title.trim(),
      slug: generateSlug(title),
      date: formattedDate,
      excerpt: excerpt.trim() || title.trim(), // 抜粋がない場合はタイトルを使用
      content: content,
    };

    // onSubmit関数を呼び出して新しい記事を追加
    onSubmit(newPost);

    // 投稿一覧ページに移動
    navigate("/blog");
  };

  return (
    <div className="new-post-form">
      <h2>新しい記事を作成</h2>

      {/* プレビューモード切り替えボタン */}
      <div className="form-actions">
        <button
          type="button"
          className={!isPreview ? "active" : ""}
          onClick={() => setIsPreview(false)}
        >
          編集
        </button>
        <button
          type="button"
          className={isPreview ? "active" : ""}
          onClick={() => setIsPreview(true)}
        >
          プレビュー
        </button>
      </div>

      {!isPreview ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">タイトル</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="記事のタイトルを入力してください"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="excerpt">抜粋（任意）</label>
            <textarea
              id="excerpt"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="記事の簡単な説明を入力してください（ブログ一覧に表示されます）"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>本文（マークダウン形式）</label> {/* マークダウンエディタ */}
            <div className="markdown-editor-wrapper">
              <MDEditor
                value={content}
                onChange={setContent}
                height={400}
                preview="edit"
                previewOptions={{
                  remarkPlugins: [remarkGfm],
                  rehypePlugins: [rehypeRaw],
                }}
              />
            </div>
            {/* 画像アップロード用の隠しファイル入力 */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
            {/* 画像アップロードボタン */}
            <button
              type="button"
              className="image-upload-button"
              onClick={handleImageButtonClick}
            >
              画像をアップロード
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              投稿する
            </button>
            <button type="button" onClick={() => navigate("/blog")}>
              キャンセル
            </button>
          </div>
        </form>
      ) : (
        <div className="preview-container">
          <h2>{title || "タイトルなし"}</h2>
          <div className="preview-excerpt">
            {excerpt && (
              <p>
                <strong>抜粋:</strong> {excerpt}
              </p>
            )}{" "}
          </div>{" "}
          <div className="preview-content">
            {" "}
            <div className="markdown-preview">
              {" "}
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
                  table: (props) => (
                    <table className="blog-post-table" {...props} />
                  ),
                  thead: (props) => (
                    <thead className="blog-post-thead" {...props} />
                  ),
                  tbody: (props) => (
                    <tbody className="blog-post-tbody" {...props} />
                  ),
                  tr: (props) => <tr className="blog-post-tr" {...props} />,
                  th: (props) => <th className="blog-post-th" {...props} />,
                  td: (props) => <td className="blog-post-td" {...props} />,
                  img: (props) => (
                    <img
                      className="blog-post-img"
                      {...props}
                      alt={props.alt || ""}
                    />
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPostForm;
