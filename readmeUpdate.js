import { writeFileSync } from "node:fs";
import Parser from "rss-parser";

/**
 * README.MD에 작성될 페이지 텍스트
 * @type {string}
 */
let text = `
<div align= "center">
  <img src="https://capsule-render.vercel.app/api?type=cylinder&color=gradient&height=180&text=Hello,%20I'm%20Emma&animation=&fontColor=ffffff&fontSize=60" />
</div>
<br>  

<div align= "left">
  <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> Tech Stacks </h2>
  <div style="margin: 0 auto; text-align: center;" align= "left"> 
    <img src="https://img.shields.io/badge/Javascript-F7DF1E?style=flat-square&logo=Javascript&logoColor=white">
    <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white">
    <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white">
    <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white">
    <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white">
<!--     <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat-square&logo=Tailwind CSS&logoColor=white"> -->
    <br/>
    <br/>
    <img src="https://img.shields.io/badge/C-A8B9CC?style=flat-square&logo=C&logoColor=white">
    <img src="https://img.shields.io/badge/C++-00599C?style=flat-square&logo=C%2B%2B&logoColor=white">
    <img src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=Java&logoColor=white">
    <img src="https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=Python&logoColor=white">
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=Firebase&logoColor=white">
    <br/>
    <br/>
    <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=Git&logoColor=white">
    <img src="https://img.shields.io/badge/Github-181717?style=flat-square&logo=Github&logoColor=white">
    <img src="https://img.shields.io/badge/Slack-4A154B?style=flat-square&logo=Slack&logoColor=white">
    <img src="https://img.shields.io/badge/Discord-5865F2?style=flat-square&logo=Discord&logoColor=white">
    <br/>
  </div>
</div>
<br>

<div align= "left">
  <h2 style="border-bottom: 1px solid #d8dee4; color: #282d33;"> Contact me </h2>
  <div align= "left"> 
    <a href=mailto:ojm5155@gmail.com> <img src="https://img.shields.io/badge/Gmail-EA4335?style=flat-square&logo=Gmail&logoColor=white&link=mailto:ojm5155@gmail.com"> </a>
    <a href=https://dev-district.tistory.com> <img src="https://img.shields.io/badge/Tistory-000000?style=flat-square&logo=Tistory&logoColor=white&link=https://dev-district.tistory.com/"> </a>
  </div> 
</div>
<br/>

<div style="text-align: left;"> 
    <h2 style="border-bottom: 1px solid #21262d; color: #c9d1d9;"> Stats </h2> 
    <div style="text-align: left;"> 
      <img src="https://github-readme-stats.vercel.app/api?username=ojm51&bg_color=180,000000,&title_color=000000&text_color=000000"/>
      <img src="https://github-readme-stats.vercel.app/api/top-langs/?username=ojm51&layout=compact&bg_color=180,000000,&title_color=000000&text_color=000000"/> 
    </div> 
</div>
<br/>

<div align= "left">
  <a href="https://myhits.vercel.app"><img src="https://myhits.vercel.app/api/hit/https%3A%2F%2Fgithub.com%2Fojm51?color=gray&label=👀&size=small" alt="👀" /></a>
</div>
<br/>
    

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
  headers: {
    Accept: "application/rss+xml, application/xml, text/xml; q=0.1",
  },
});

(async () => {
  // 피드 목록
  const feed = await parser.parseURL("https://dev-district.tistory.com/rss");

  // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
  for (let i = 0; i < 5; i++) {
    const { title, link } = feed.items[i];
    console.log(`${i + 1}번째 게시물`);
    console.log(`추가될 제목: ${title}`);
    console.log(`추가될 링크: ${link}`);
    text += `<a href=${link}>${title}</a></br>`;
  }

  // README.md 파일 작성
  writeFileSync("README.md", text, "utf8", (e) => {
    console.log(e);
  });

  console.log("업데이트 완료");
})();
