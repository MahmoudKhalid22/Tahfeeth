const testReq = async () => {
  try {
    const response = await fetch("https://tahfeeth-system.onrender.com/test");
    const result = await response.json();
    // console.log(result);
  } catch (err) {
    console.log("Error fetching data:", err);
  } finally {
    setTimeout(testReq, 600000);
  }
};

testReq();

module.exports = { testReq };
