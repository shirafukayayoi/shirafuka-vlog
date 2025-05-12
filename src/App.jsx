import { BrowserRouter, Routes, Route } from "react-router-dom"; // React Routerを使用してルーティングを実装
import Layout from "./components/layout/Layout"; // 共通レイアウトコンポーネント
import HomePage from "./pages/HomePage"; // ホームページコンポーネント
import BlogPage from "./pages/BlogPage"; // ブログ一覧ページコンポーネント
import BlogPostPage from "./pages/BlogPostPage"; // ブログ記事詳細ページコンポーネント
import AboutPage from "./pages/AboutPage"; // アバウトページコンポーネント
import NewPostPage from "./pages/NewPostPage"; // 新規投稿ページコンポーネント
import LoginPage from "./pages/LoginPage"; // ログインページコンポーネント
import ProtectedRoute from "./components/auth/ProtectedRoute"; // 保護されたルートコンポーネント
import { BlogProvider } from "./context/BlogContext"; // ブログコンテキストプロバイダー
import { AuthProvider } from "./context/AuthContext"; // 認証コンテキストプロバイダー
import "./App.css";

function App() {
  // ここでurlを作る。
  return (
    // AuthProviderとBlogProviderでアプリ全体をラップして、コンテキストを使用可能に
    <AuthProvider>
      <BlogProvider>
        {/* BrowserRouterでアプリ全体をラップして、ルーティング機能を有効化 */}
        <BrowserRouter>
          {/* Routesコンポーネントは、複数のRouteを含むコンテナ */}
          <Routes>
            {/* Layoutコンポーネントをベースレイアウトとして設定 */}
            <Route path="/" element={<Layout />}>
              {/* index属性はルートパス（"/"）にマッチする時に表示されるコンポーネントを指定 */}
              <Route index element={<HomePage />} />
              {/* 各パスに対応するコンポーネントを設定 */}
              <Route path="/blog" element={<BlogPage />} />
              {/* :slug はURLパラメータで、動的な値を受け取るために使用 */}
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/about" element={<AboutPage />} />
              {/* ログインページへのルートを追加 */}
              <Route path="/login" element={<LoginPage />} />
              {/* 新規投稿ページへのルートを追加（保護されたルート） */}
              <Route
                path="/new-post"
                element={
                  <ProtectedRoute>
                    <NewPostPage />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </BlogProvider>
    </AuthProvider>
  );
}

export default App;
