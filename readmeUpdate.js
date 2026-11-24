import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

// ----- [1] 고정 영역: 자기소개, 기술 스택 등으로 커스텀 -----
const staticContent = `
<div align="center">
  <!-- Welcome -->
  <img src="https://capsule-render.vercel.app/api?type=rounded&color=gradient&height=180&text=Hello%20I'm%20Emma&animation=fadeIn&fontColor=ffffff&fontSize=70" />
</div>
<br>
<br>

<div align="center">
  <h2>
    Tech Stacks
  </h2>
  <div style="margin: 0 auto; text-align: center;" align="center">
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=for-the-badge&logo=Javascript&logoColor=white">
    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=white">
    <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white">
    <img src="https://img.shields.io/badge/typescript-%233178C6.svg?&style=for-the-badge&logo=typescript&logoColor=white" />
    <br>
    <br>
    <img src="https://img.shields.io/badge/tailwind%20css-%2338B2AC.svg?&style=for-the-badge&logo=tailwind%20css&logoColor=white" />
    <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white">
    <img src="https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=Eslint&logoColor=white">
    <br>
    <br>
    <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/C-A8B9CC?style=for-the-badge&logo=C&logoColor=white">
    <img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=white">
    <br>
    <br>
    <img src="https://img.shields.io/badge/fastapi-009688?style=for-the-badge&logo=fastapi&logoColor=white">
    <img src="https://img.shields.io/badge/postgresql-4169E1?style=for-the-badge&logo=postgresql&logoColor=white">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white">
    <img src="https://img.shields.io/badge/SQLAlchemy-D71F00?style=for-the-badge&logo=sqlalchemy&logoColor=white">
    <br>
    <br>
    <img src="https://img.shields.io/badge/PyTorch-EE4C2C?style=for-the-badge&logo=pytorch&logoColor=white">
    <img src="https://img.shields.io/badge/Transformers-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black">
  </div>
</div>
<br>

<div align="center">
  <h2>Stats</h2>
  <a href="https://github.com/ojm51">
    <img src="https://github-stats-extended.vercel.app/api?username=ojm51&amp;show_icons=true&amp;include_all_commits=true&amp;theme=github_dark_dimmed" alt="GitHub Stats" />
  </a>
</div>
<br>
<br>

<h2 align="center">Contact me</h2>
<p align="center">
  <a href="mailto:ojm5155@gmail.com">
    <img src="https://img.shields.io/badge/Gmail-EA4335?style=for-the-badge&logo=gmail&logoColor=white" alt="Gmail">
  </a>
</p>

<!-- Visitors -->
<div align="center">
  <a href="https://myhits.vercel.app">
    <img src="https://myhits.vercel.app/api/hit/https%3A%2F%2Fgithub.com%2Fojm51?color=gray&label=👀&size=small" alt="👀" />
  </a>
</div>
<br>

<div align="center">
  <h2>
    Blog Posts
  </h2>
  <div align="center">
    <a href="https://dev-district.tistory.com">
      <img src="https://img.shields.io/badge/Tistory-000000?style=for-the-badge&logo=Tistory&logoColor=white&link=https://dev-district.tistory.com">
    </a>
  </div>
</div>
`;

// ----- [2] 자동 갱신 영역: 블로그 RSS 읽어서 최신 글 목록 추가 -----
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  let blogSection = `<div align="center">\n`;

  try {
    // ✅ 아래 parseURL("") 안에 본인의 블로그 rss 페이지 주소를 입력
    const feed = await parser.parseURL("https://dev-district.tistory.com/rss");
    const latestPostsCount = 5; // 최신 글을 몇 개 가져올지

    // 링크 HTML 생성
    let linksHtml = "";
    for (let i = 0; i < latestPostsCount && i < feed.items.length; i++) {
      const { title, link } = feed.items[i];
      linksHtml += `<a href="${link}">${title}</a><br>\n`;
    }

    blogSection += linksHtml;

  } catch (error) {
    console.error("RSS 파싱 중 오류 발생:", error);
    blogSection += `블로그 글을 불러오지 못했습니다.\n`;
  }

  blogSection += `</div>\n`;

  // ----- [3] 파일 작성 -----
  const finalContent = staticContent + blogSection;
  writeFileSync("README.md", finalContent, "utf8");

  console.log("README 업데이트 완료");
})();
