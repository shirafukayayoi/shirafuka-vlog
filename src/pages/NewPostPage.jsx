import { useContext } from "react";
import NewPostForm from "../components/blog/NewPostForm";
import { BlogContext } from "../context/BlogContext";
import "../styles/NewPostPage.css";

/**
 * 新しいブログ記事を作成するページコンポーネント
 *
 * このページでは、NewPostFormコンポーネントを表示し、
 * 新しい記事の作成と保存を行います。
 */
const NewPostPage = () => {
  // BlogContextから投稿データとその更新関数を取得
  const { posts, addPost } = useContext(BlogContext);

  /**
   * 新しい投稿を追加する処理
   * @param {Object} newPost - 新しい投稿データ
   */
  const handleAddPost = (newPost) => {
    // BlogContextのaddPost関数を呼び出して投稿を追加
    addPost(newPost);
  };

  return (
    <div className="new-post-page">
      <h1>新しい記事を投稿</h1>
      <p className="page-description">
        マークダウン形式で記事を作成できます。画像のアップロードも可能です。
      </p>
      <NewPostForm onSubmit={handleAddPost} posts={posts} />
    </div>
  );
};

export default NewPostPage;
