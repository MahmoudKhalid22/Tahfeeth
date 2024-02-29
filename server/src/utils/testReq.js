const testReq = async () => {
  try {
    await fetch("http://tahfeeth-system.onrender.com/test");
  } catch (err) {
    console.log("Error fetching data:", err);
  } finally {
    setTimeout(testReq, 600000);
  }
};
