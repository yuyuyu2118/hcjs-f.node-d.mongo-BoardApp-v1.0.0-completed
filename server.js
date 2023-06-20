//requireはNode.js環境で利用されるCommonJS形式モジュールシステム
const express  = require("express");
const mongoose = require("mongoose"); 
const Thread   = require("./models/Thread")

const PORT     = 60190;
const app      = express();

app.use(express.static("public"));  //静的ファイルはpublicフォルダを見に行く

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

mongoose.connect(
  "mongodb+srv://yuyuyu:0k6ZhBI69JFMmDgP@cluster0.uhntkqj.mongodb.net/?retryWrites=true&w=majority"
)
.then(() => console.log("db connectes"))  //mongoDBとの接続確認
.catch((err) => console.log(err))

//getメソッド
app.get("/api/v1/threads",async(req,res) => {
  try{
    const allThreads = await Thread.find({});
    res.status(200).json(allThreads)
  }catch (err){
console.log(err)
  }
});

//postメソッド
app.post("/api/v1/thread",async(req,res) => {
  try{
    const createThread = await Thread.create(req.body);
    res.status(200).json(createThread)
  }catch (err){
console.log(err)
  }
});

app.listen(PORT,console.log("server running")); //サーバー起動
