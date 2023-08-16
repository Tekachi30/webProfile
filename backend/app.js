const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
require("./Config/connect");

// Thiết lập body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

// Các Serve tệp tĩnh
app.use(express.static("uploads"));

const port = 5000;
server.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
