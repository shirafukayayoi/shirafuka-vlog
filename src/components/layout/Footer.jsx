import React from "react";
import { Link } from "react-router-dom";
import "../../styles/Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>
            &copy; {currentYear} 白深ブログ. All rights reserved.
            {/* 管理者ページへの隠しリンク - 文字色をフッター背景と同じにして非表示に */}
            <Link to="/login" className="admin-link" title="管理者ページ">
              {" "}
              ・{" "}
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
