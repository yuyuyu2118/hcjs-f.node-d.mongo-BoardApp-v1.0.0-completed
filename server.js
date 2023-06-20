//requireはNode.js環境で利用されるCommonJS形式モジュールシステム
const express = require("express");
const mongoose = require("mongoose");
const Thread = require("./models/Thread");
const PORT = 60190;
const app = express();

app.use(express.json());  //json形式でデータの受け渡しを行う
app.use(express.static("public")); //静的ファイルはpublicフォルダを見に行く

//CLUDによるブロックを回避
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

mongoose
  .connect(
    "mongodb+srv://yuyuyu:0k6ZhBI69JFMmDgP@cluster0.uhntkqj.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connectes")) //mongoDBとの接続確認
  .catch((err) => console.log(err));

//getメソッド(AllThreads)
app.get("/api/v1/threads", async (req, res) => {
  try {
    const allThreads = await Thread.find({});
    res.status(200).json(allThreads);
  } catch (err) {
    console.log(err);
  }
});

//getメソッド(Thread)
app.get("/api/v1/thread/:id", async (req, res) => {
  try {
    const thread = await Thread.findById(req.params.id);
    if (!thread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    res.status(200).json(thread);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

//postメソッド
app.post("/api/v1/thread", async (req, res) => {
  try {
    const createThread = await Thread.create(req.body);
    res.status(200).json(createThread);
  } catch (err) {
    console.log(err);
  }
});

//deleteメソッド
app.delete("/api/v1/threads/:id", async (req, res) => {
  try {
    const deleteThread = await Thread.findByIdAndDelete(req.params.id);
    if (!deleteThread) {
      return res.status(404).json({ message: "Thread no found" });
    }
    res.status(200).json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUTメソッド
app.put("/api/v1/threads/:id", async (req, res) => {
  try {
    const updateThread = await Thread.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updateThread) {
      return res.status(404).json({ message: "Thread not found" });
    }
    res.status(200).json(updateThread);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(PORT, console.log("server running")); //サーバー起動
