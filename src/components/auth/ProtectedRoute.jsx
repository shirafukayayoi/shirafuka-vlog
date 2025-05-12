import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

/**
 * 保護されたルートコンポーネント
 *
 * 認証されていないユーザーがアクセスした場合、
 * ログインページにリダイレクトします。
 *
 * @param {Object} props - コンポーネントのプロパティ
 * @param {React.ReactNode} props.children - 子コンポーネント（保護対象のコンポーネント）
 */
const ProtectedRoute = ({ children }) => {
  // 認証コンテキストから認証状態を取得
  const { isAuthenticated } = useContext(AuthContext);

  // 認証されていない場合はログインページにリダイレクト
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // 認証されている場合は子コンポーネントを表示
  return children;
};

export default ProtectedRoute;
