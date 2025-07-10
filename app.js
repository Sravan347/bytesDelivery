const express = require("express");
const app = express();

const port = 5000;
app.get("/helo", (req, res) => {
  res.send("test api is working fine");
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});