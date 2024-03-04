const testReq = async () => {
  try {
    const response = await fetch("https://tahfeeth-system.onrender.com/test");
    await response.json();
  } catch (err) {
    console.log("Error fetching data:", err);
  } finally {
    setTimeout(testReq, 600000);
  }
};

module.exports = { testReq };
