const getAllThread = async() => {
  try{
    let allThreads = await axios.get("http://localhost:60190/api/v1/threads");
    console.log(allThreads);
  }catch(error){
    console.log(error);
  }
};

getAllThread();