const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const user = require("./routes/user");
const InitialteMongoServer = require("./config/db");

// conect to the mongodb database
InitialteMongoServer();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

// Add all the routes for auth
app.use("/user", user);

app.listen(PORT, () => {
  console.log(`Server Started at PORT ${PORT}`);
});
