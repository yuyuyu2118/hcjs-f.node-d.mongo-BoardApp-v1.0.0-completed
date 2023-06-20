const formDOM = document.querySelector(".thread-section");
const inputTextDOM = document.getElementById("inputTitle");
const inputContentDOM = document.getElementById("inputContent");

let inputText = "";
let inputContentText = "";

const getAllThread = async () => {
  try {
    let allThreads = await axios.get("http://localhost:60190/api/v1/threads");
    console.log(allThreads);
    let { data } = allThreads;
    console.log(data);
    allThreads = data.map((thread) => {
      const { title, content } = thread;
      console.log(title, content);
      return `
      <div class="single-thread">
        <h3>${title}</h3>
        <p>${content}</p>
      </div>
      `;
    });
    formDOM.innerHTML = allThreads;
  } catch (error) {
    console.log(error);
  }
};

getAllThread();

//postメソッド
inputTextDOM.addEventListener("change",(e) =>{
  inputText = e.target.value;
});
inputContentDOM.addEventListener("change",(e) =>{
  inputContentText = e.target.value;
});

formDOM.addEventListener("submit",async(e) =>{
  e.preventDefault();

  if(inputText && inputContentText){
    console.log("add data");
    try {
      await axios.post("http://localhost:60190/api/v1/thread",{
        title: inputText,
        content: inputContentText,
      });

    } catch (error) {
      console.log(error);
    }
  }
})