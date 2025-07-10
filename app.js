const express = require("express");
const urlRoutes = require("./routes/url");
const app = express();
require("dotenv").config();
const connectDB = require("./db");


app.use(express.json());
app.use('/', urlRoutes);

const port = process.env.PORT || 5000;
app.get("/helo", (req, res) => {
  res.send("test api is working fine");
});

const server = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Database connected successfully");

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

server();
