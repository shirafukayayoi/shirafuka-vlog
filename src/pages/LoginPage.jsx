import React, { useContext } from "react";
import { Link } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { AuthContext } from "../context/AuthContext";
import "../styles/LoginPage.css";

/**
 * ログインページコンポーネント
 *
 * 投稿機能などの保護されたページにアクセスするための
 * 認証を行うページです。
 */
const LoginPage = () => {
  // 認証コンテキストから認証状態を取得
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <div className="login-page">
      {isAuthenticated ? (
        <div className="already-logged-in">
          <h2>認証済み</h2>
          <p>すでに管理者として認証されています。</p>
          <div className="action-links">
            <Link to="/new-post" className="admin-button">
              新規投稿を作成
            </Link>
            <Link to="/" className="back-button">
              ホームに戻る
            </Link>
          </div>
        </div>
      ) : (
        <LoginForm />
      )}
    </div>
  );
};

export default LoginPage;
