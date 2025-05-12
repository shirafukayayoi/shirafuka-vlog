import { createContext, useState, useEffect } from "react";
import { blogData as initialBlogData } from "../data/blogData";

/**
 * ブログデータを管理するためのContext
 *
 * このContextを使用することで、アプリケーション全体でブログ記事データを
 * 共有し、更新することができます。
 */
export const BlogContext = createContext();

/**
 * BlogContextのプロバイダーコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 */
export const BlogProvider = ({ children }) => {
  // ローカルストレージのキー
  const STORAGE_KEY = "shirafuka-blog-posts"; // 投稿データの状態

  // 初期化関数を修正：ローカルストレージが空または不正な場合は初期データを使用
  const [posts, setPosts] = useState(() => {
    try {
      const savedPosts = localStorage.getItem(STORAGE_KEY);
      // 保存されたデータがあり、かつ有効なJSONの場合のみパース
      if (savedPosts && savedPosts !== "undefined" && savedPosts !== "null") {
        const parsedData = JSON.parse(savedPosts);
        // 配列であることを確認
        if (Array.isArray(parsedData) && parsedData.length > 0) {
          console.log("Loaded posts from localStorage:", parsedData);
          return parsedData;
        }
      }
      // それ以外の場合は初期データを使用
      console.log("Using initial blog data:", initialBlogData);
      return initialBlogData;
    } catch (error) {
      console.error("Error loading posts from localStorage:", error);
      return initialBlogData;
    }
  });

  // 投稿データが変更されたらローカルストレージに保存
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
    } catch (error) {
      console.error("Error saving posts to localStorage:", error);
    }
  }, [posts]);

  /**
   * 新しい投稿を追加する関数
   * @param {Object} newPost - 新しい投稿データ
   */
  const addPost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  /**
   * 投稿を更新する関数
   * @param {number} id - 更新する投稿のID
   * @param {Object} updatedPost - 更新内容
   */
  const updatePost = (id, updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    );
  };

  /**
   * 投稿を削除する関数
   * @param {number} id - 削除する投稿のID
   */
  const deletePost = (id) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
  };

  // Contextを通して提供する値
  const contextValue = {
    posts,
    addPost,
    updatePost,
    deletePost,
  };

  return (
    <BlogContext.Provider value={contextValue}>{children}</BlogContext.Provider>
  );
};
