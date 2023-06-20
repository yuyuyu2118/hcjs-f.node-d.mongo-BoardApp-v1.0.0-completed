const formDOM = document.querySelector(".thread-section");

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