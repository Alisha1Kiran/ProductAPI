const express = require("express");
const mongoose = require("mongoose");
const productRouter = require("./routers/productRouter");
const userRouter = require("./routers/userRouter");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const app = express();
const cors = require('cors')

app.get("/", (req, res) => {
  res.send("Hello1");
});

app.use(express.json());
app.use(cors())

app.post("/login", (req, res) => {
  // Authenticate

  // Token creation
  const username = req.body.username;
  const user = { name: username };
  const secretKey = process.env.JWT_SECRET_KEY;
  const token = jwt.sign(user, secretKey);
  res.json({ accesstoken: token });
});

app.use("/products", productRouter);
app.use("/users", userRouter);

async function main() {
  await mongoose.connect(
    "mongodb+srv://alishasatheesan1992:37Khr98lk0s3Zefp@cluster1.nuu5r.mongodb.net/ProductDB"
  );
}

main()
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

const ProductData = require("./models/product");

app.listen(3000, () => {
  console.log("New server started");
});
