//const API_BASE_URL = process.env.API_BASE_URL || 'http://localhost:60190';

const threadSectionDOM = document.querySelector(".thread-section");
const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");
const formDOM = document.querySelector(".form-section");

let inputText = "";
let inputContentText = "";
let editingThreadId = null;

//getメソッド
const getAllThread = async () => {
  try {
    let allThreads = await axios.get("http://localhost:60190/api/v1/threads");
    //console.log(allThreads);
    let { data } = allThreads;
    //console.log(data);
    allThreads = data
      .map((thread) => {
        const { _id, title, content } = thread;
        //console.log(_id, title, content);
        return `
      <div class="single-thread">
        <h3>${title}</h3>
        <p>${content}</p>
        <img src="./image/deleteIcon.png" alt="deleteIcon" width="30" height="30" class="deleteButton" data-id="${_id}">
        <img src="./image/editIcon.png" alt="editIcon" width="30" height="30" class="editButton" data-id="${_id}">
      </div>
      `;
      })
      .join("");
    threadSectionDOM.innerHTML = allThreads;
  } catch (error) {
    console.log(error);
  }
};

getAllThread();

//postメソッド
inputTextDOM.addEventListener("change", (e) => {
  inputText = e.target.value;
});
inputContentDOM.addEventListener("change", (e) => {
  inputContentText = e.target.value;
});
formDOM.addEventListener("submit", async (e) => {
  e.preventDefault();

  inputText = inputTextDOM.value;
  inputContentText = inputContentDOM.value;

  if (inputText && inputContentText) {
    try {
      if (editingThreadId) {
        await axios.put(`http://localhost:60190/api/v1/threads/${editingThreadId}`, {
          title: inputText,
          content: inputContentText,
        });
        editingThreadId = null; // 編集が完了したのでリセット
      } else {
        await axios.post("http://localhost:60190/api/v1/thread", {
          title: inputText,
          content: inputContentText,
        });
      }
      getAllThread();
      inputTextDOM.value = "";
      inputContentDOM.value = "";
    } catch (error) {
      console.log(error);
    }
  }
});

//deleteメソッド
threadSectionDOM.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deleteButton")) {
    //クリックしたものがdeleteButtonクラスを持っている
    const threadID = e.target.dataset.id;
    //console.log(threadID);
    try {
      await axios.delete(`http://localhost:60190/api/v1/threads/${threadID}`); //削除
      getAllThread(); //削除後に再度表示
    } catch (error) {
      console.log(error);
    }
  }
});

// 編集メソッド
threadSectionDOM.addEventListener("click", async (e) => {
  if (e.target.classList.contains("editButton")) {
    // クリックしたものがeditButtonクラスを持っている
    editingThreadId = e.target.dataset.id;
    try {
      const threadToEdit = await axios.get(`http://localhost:60190/api/v1/thread/${editingThreadId}`);
      inputTextDOM.value = threadToEdit.data.title;
      inputContentDOM.value = threadToEdit.data.content;
    } catch (error) {
      console.log(error);
    }
  }
});