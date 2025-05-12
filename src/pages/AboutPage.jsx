import React from "react";
import "../styles/AboutPage.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <header className="page-header">
        <h1>このブログについて</h1>
      </header>

      <section className="about-content">
        <h2>白深ブログとは</h2>
        <p>
          白深ブログは、日常の出来事や趣味、考えたことなどを気ままに綴るブログです。
          2025年5月に開設し、読者の皆様と様々な経験や知識を共有していきたいと思っています。
        </p>

        <h2>筆者について</h2>
        <p>
          都内在住の30代。普段はIT関連の仕事をしています。
          趣味は読書、映画鑑賞、散歩です。特に自然の中を歩くことが好きで、
          季節の移り変わりを感じられる瞬間を大切にしています。
        </p>

        <h2>ブログのテーマ</h2>
        <p>このブログでは主に以下のようなテーマで記事を書いていく予定です：</p>
        <ul>
          <li>日常の何気ない発見や気づき</li>
          <li>読んだ本や観た映画の感想</li>
          <li>散歩で見つけた風景や季節の移り変わり</li>
          <li>時々、技術的な話題やプログラミングについて</li>
        </ul>

        <h2>お問い合わせ</h2>
        <p>
          ご感想やご質問などがありましたら、コメント欄やSNSでお気軽にお声がけください。
        </p>
      </section>
    </div>
  );
};

export default AboutPage;
