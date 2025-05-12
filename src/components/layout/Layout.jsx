import React from "react";
import { Outlet } from "react-router-dom"; // React Routerの機能で、子ルートのコンポーネントを表示するためのプレースホルダー
import Header from "./Header"; // ヘッダーコンポーネントをインポート
import Footer from "./Footer"; // フッターコンポーネントをインポート
import "../../styles/Layout.css"; // レイアウト専用のCSSをインポート

/**
 * レイアウトコンポーネント
 *
 * このコンポーネントは全てのページで共通のレイアウト構造を提供します。
 * - ヘッダー（上部のナビゲーションバー）
 * - メインコンテンツエリア（子ルートのコンポーネントが表示される場所）
 * - フッター（下部の情報バー）
 *
 * React Routerの「Outlet」を使用して、現在のルートに対応するコンポーネントを
 * メインコンテンツエリアに表示します。
 */
const Layout = () => {
  return (
    <div className="layout">
      <Header /> {/* 全ページ共通のヘッダーを表示 */}
      <main className="main-content">
        <Outlet /> {/* ここに各ページのコンテンツが表示される */}
      </main>
      <Footer /> {/* 全ページ共通のフッターを表示 */}
    </div>
  );
};

export default Layout;
