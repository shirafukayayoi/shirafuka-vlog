import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/LoginForm.css";

/**
 * ログインフォームコンポーネント
 *
 * パスワードを入力して投稿ページにアクセスするための認証を行います。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {string} props.redirectPath - 認証成功後にリダイレクトするパス
 */
const LoginForm = ({ redirectPath = "/new-post" }) => {
  // 認証コンテキストを取得
  const { login } = useContext(AuthContext);
  // ナビゲーション用のフック
  const navigate = useNavigate();

  // パスワード入力状態の管理
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  /**
   * フォーム送信時の処理
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // パスワードが空の場合
    if (!password.trim()) {
      setError("パスワードを入力してください");
      setIsLoading(false);
      return;
    }

    // 認証処理
    const isValid = login(password);

    if (isValid) {
      // 認証成功時はリダイレクト
      navigate(redirectPath);
    } else {
      // 認証失敗時はエラーメッセージを表示
      setError("パスワードが正しくありません");
      setPassword("");
    }

    setIsLoading(false);
  };
  return (
    <div className="login-form-container">
      <div className="login-form">
        <h2>管理者専用ページ</h2>
        <p className="login-description">
          このページは管理者専用です。記事の投稿にはパスワードが必要です。
        </p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">管理者パスワード</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="パスワードを入力"
              disabled={isLoading}
              autoFocus
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "認証中..." : "管理者として続行"}
          </button>
        </form>

        <div className="back-link">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            ホームに戻る
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
