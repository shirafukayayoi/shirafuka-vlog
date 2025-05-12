import { createContext, useState, useEffect } from "react";

/**
 * 認証状態を管理するためのContext
 *
 * このContextを使用することで、アプリケーション全体で認証状態を
 * 共有し、更新することができます。
 */
export const AuthContext = createContext();

/**
 * AuthContextのプロバイダーコンポーネント
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント
 */
export const AuthProvider = ({ children }) => {
  // ローカルストレージのキー
  const STORAGE_KEY = "shirafuka-blog-auth";

  // 認証状態
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // ローカルストレージから認証状態を読み込む試行
    const savedAuth = localStorage.getItem(STORAGE_KEY);
    return savedAuth ? JSON.parse(savedAuth) : false;
  });

  // 認証状態が変更されたらローカルストレージに保存
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(isAuthenticated));
  }, [isAuthenticated]);

  /**
   * ログイン処理
   * @param {string} password - 入力されたパスワード
   * @returns {boolean} - 認証成功かどうか
   */
  const login = (password) => {
    // 正しいパスワードかチェック
    const isValid = password === "shirafukatoyayoi";

    if (isValid) {
      setIsAuthenticated(true);
    }

    return isValid;
  };

  /**
   * ログアウト処理
   */
  const logout = () => {
    setIsAuthenticated(false);
  };

  // Contextを通して提供する値
  const contextValue = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
