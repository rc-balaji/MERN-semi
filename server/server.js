const express = require("express");
const db = require("mongoose");
const cors = require("cors");
const api = require("./routes/routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", api);

db.connect("mongodb://127.0.0.1:27017/todoapp")
  .then(() => {
    console.log("Mongo Connected");
  })
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
