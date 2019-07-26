const express = require("express");
const app = express();
const connectDB = require("./config/db");
const path = require("path");
const cors = require("cors");

connectDB();

app.use(express.json({ extended: false }));

// CORS access to the server
app.use(cors());
// app.use(function(req, res, next) {
//   res.setHeader("Access-Control-Allow-Origin", "https://cryptic-tundra-68800.herokuapp.com");
//   res.setHeader("Access-Control-Allow-Methods", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

// app.get("/", (req, res) => {
//   res.send("Welcome to express-mongoose-node application");
// });

app.use("/api/students", cors(), require("./routes/api/students"));

// Settings to be made before uploading to heroku
// Server static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
