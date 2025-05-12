import { Link, useNavigate } from "react-router-dom"; // Reactでページ間リンクを作成するために使用
import { useContext } from "react"; // Contextを使用するためのフック
import { AuthContext } from "../../context/AuthContext"; // 認証コンテキスト
import "../../styles/Header.css"; // ヘッダー専用のCSSをインポート

/**
 * ヘッダーコンポーネント
 *
 * サイトのヘッダー部分を表示するコンポーネントです。
 * - サイトのタイトル
 * - ナビゲーションメニュー（各ページへのリンク）
 * - 認証状態に応じたログイン/ログアウトボタン
 *
 * Link コンポーネントを使用することで、ページをリロードせずに
 * クライアントサイドでのナビゲーションを実現しています。
 */
const Header = () => {
  // 認証コンテキストから認証状態とログアウト関数を取得
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  // ログアウト処理
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="header">
      <div className="header-container">
        {" "}
        <h1 className="site-title">
          {/* リンククリックでホームページに遷移 */}
          <Link to="/">ShirafukaVlog</Link>
        </h1>{" "}
        <nav className="main-nav">
          <ul>
            {/* 各ページへのナビゲーションリンク */}
            <li>
              <Link to="/">ホーム</Link>
            </li>
            <li>
              <Link to="/blog">ブログ一覧</Link>
            </li>
            <li>
              <Link to="/about">このブログについて</Link>
            </li>
            {/* 認証済みの場合のみログアウトボタンを表示 */}
            {isAuthenticated && (
              <li>
                <button onClick={handleLogout} className="logout-button">
                  ログアウト
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
