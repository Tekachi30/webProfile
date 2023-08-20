const bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
const app = express();
require("./Config/connect");

const { routerUser } = require('./routers/userRouter');

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

app.use(routerUser);

const port = 5000;
app.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
