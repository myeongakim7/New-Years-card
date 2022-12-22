// index.js

const express = require("express");
const app = express();
const ejs = require("ejs");
const fs = require("fs");

// 서버 실행 포트
const port = 3000;
// 서버오픈
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// myo [ {posts}.push, textarea ]

// fake DB
let posts = { name: "myo", comment: "라랄" };
// console.log(posts.name);
// console.log(posts.comment);

// DB 파일 불러오기
const readfile = fs.readFileSync("postsDB.json", "utf-8");
const jsonData = JSON.parse(readfile);
console.log(jsonData);
posts = [...jsonData];

// ejs를 view 엔진으로 설정
app.set("view engine", "ejs");
// view engine의 기본 문서 경로는 views 임

// 정적파일 경로 지정
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// home
app.get("/", function (요청, 응답) {
  응답.render("pages/index.ejs");
});

// 글쓰기 요청
app.post("/create", function (req, res) {
  const post = req.body.post;
  console.log(req.body);
  res.send(post);
  posts.push(post);
  console.log("뭐야뭐야 =", posts);

  // DB에 글 저장
  // res.send(post);
  // post.push(post); // 배열에 post를 추가 .push()
  // console.log(post);

  // DB file에 글 저장
  fs.writeFileSync("postsDB.json", JSON.stringify(posts));
  // console.log(posts);

  // 홈(게시판)으로 이동
  res.redirect("/");
});
