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

// fake DB
let nameArr = [];
let CoArr = [];

// DB 파일 불러오기
const readfile = fs.readFileSync("postDB.json", "utf-8");
const readfile2 = fs.readFileSync("nameDB.json", "utf-8");
const jsonData = JSON.parse(readfile);
const jsonData2 = JSON.parse(readfile2);
CoArr = [...jsonData];
nameArr = [...jsonData2];
// console.log(posts);

// ejs를 view 엔진으로 설정
app.set("view engine", "ejs");
// view engine의 기본 문서 경로는 views 임

// 정적파일 경로 지정
app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 글쓰기 요청 /create
app.post("/create", function (req, res) {
  const 글 = req.body.post;
  CoArr.push(글); // posts 배열에 글 추가
  const 이름 = req.body.name;
  nameArr.push(이름); // posts 배열에 글 추가

  // DB file에 글 저장
  fs.writeFileSync("postDB.json", JSON.stringify(CoArr));
  fs.writeFileSync("nameDB.json", JSON.stringify(nameArr));
  res.redirect("/"); // 홈으로 이동
});

// 글삭제 요청 /delete
app.post("/delete/:id", function (req, res) {
  // id 글번호
  const id = req.params.id;
  console.log(id);
  // id값에 해당하는 posts 삭제
  CoArr.splice(id, 1);
  nameArr.splice(id, 1);
  fs.writeFileSync("postDB.json", JSON.stringify(CoArr));
  fs.writeFileSync("nameDB.json", JSON.stringify(nameArr));
  res.redirect("/");
});

// home
app.get("/", function (요청, 응답) {
  응답.render("pages/index.ejs", {
    nameArr,
    CoArr,
  });
}); // 안에 변수넣기
