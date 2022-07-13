const express = require('express');
const cookieParser = require('cookie-parser');
const db = require('./models')
const app = express();
const controllers = require('./controllers')
const port = 8080;
const cors = require('cors')
const multer = require('multer');
const sharp = require('sharp');



app.use(cors({
  origin: ['http://communitrip.net.s3-website.ap-northeast-2.amazonaws.com', 'http://communitrip.net', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'OPTIONS']
}));
app.use(
  cors({
    origin: true,
    credentials: true
  })
);

db.sequelize.sync().then(() => { /** 동기화 및 연결 */
  console.log('db 연결 성공')
}).catch((err) => {
  console.log(err)
})

app.use(express.json({ limit: "10mb"}))
app.use(express.urlencoded({ limit:"10mb", extended: false })); /** 클라이언트 body 해석 위함 */
app.use(cookieParser()); /** 요청된 쿠키를 추출하기 위한 미들웨어 req의 cookies속성 부여 */

// app.use(express.static("public"))
// const storage = multer.diskStorage({ /** 로컬 서버 폴더에 이미지 파일 저장 */
//   destination: "./public/img/", /** 저장위치, 해당 폴더 없으면 자동 생성 */
//   filename: (req, file, cb) => {
//     cb(null, "imgfile" + Date.now() + path.extname(file.originalname)); /** 이미지의 이름 정하기 */
//   }
// }) /** 로컬 서버 폴더에 이미지를 저장하는 방법 */

// const upload = multer({ /** 어떤 storage 사용할 것인지(로컬 또는 클라우드), 파일의 사이즈 정함(단위 byte) */
//   storage: storage,
//   limits: { fileSize: 1000000 }
// })

// app.post('/upload', upload.single("img"), (req, res) => { /** 프론트에서 formData에서 정해주었던 이름으로 img 받는다 */
// console.log(req.file)
//   res.json({ /** Storage 옵션에서 정해준 fileName을 프론트에 보낸다 */
//     data: req.file
//   })
// })

app.get('/', (req, res) => {
  res.json("hello world")
})
app.post('/img', (req, res) => {

  console.log(req)
})

app.get("/users/auth", controllers.auth);
app.patch('/users/:userId', controllers.editprofile)
app.get('/users/:userId', controllers.getusers)
app.post('/users/login', controllers.login)
app.post('/users/logout', controllers.logout)
app.delete('/users/:userId', controllers.signout)
app.post('/users/signup', controllers.signup)

app.post('/posts/:userId', controllers.createpost) /** 게시물 생성 */
app.delete('/posts/:postId', controllers.deletepost) /** 게시물 삭제 */
app.get('/posts/:postId', controllers.getonepost) /** 하나의 게시물 얻기 */
app.get('/posts', controllers.getallposts) /** 모든 게시물 얻기 */
app.get('/posts/users/:userId', controllers.mypost) /** 유저가 좋아요 누른 게시물 전체 */
app.patch('/posts/:postId', controllers.patchpost) /** 게시물 수정 */

app.get('/tags', controllers.gettags) /** 게시물 태그 얻기 */
app.get('/tags/:tagId', controllers.getpostsbytags) /** 태그에 해당하는 게시물 얻기 */

app.post('/kakao/login', controllers.kakaologin) /** 카카오 로그인 */

app.post('/posts/:postId/comments', controllers.createcomment) /** 댓글 생성 */
app.delete('/posts/:postId/comments/:commentsId', controllers.deletecomment) /** 댓글 삭제 */
app.get('/posts/:postId/comments', controllers.getcomments) /** 댓글 갱신 */
app.patch('/posts/:postId/comments/:commentsId', controllers.patchcomment) /** 댓글 수정 */

app.post('/posts/:postId/likes', controllers.changelikes) /** 좋아요 증가/감소 */
app.get('/posts/:postId/likes/:userId', controllers.getlikes) /** 좋아요 갱신 */

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})