const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const homeRoutes = require("./routes/homeRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const cookieParser = require("cookie-parser");
const { checkUser } = require("./middleware/authMiddleware");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 3000;

// connect to mongodb:
const dbURI = `mongodb+srv://javigdeveloper:${process.env.MONGO_PASSWORD}@cluster0.pezey.mongodb.net/project-test?retryWrites=true&w=majority`;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .then((result) =>
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    })
  )
  .catch((err) => console.log(err));

// register view engine:
app.set("view engine", "ejs");
app.set("views", "frontend/views");

// middleware:
app.use(express.static("frontend/public"));
// for saving from a form:
app.use(express.urlencoded({ extended: true }));
// for saving from javascript on the front-end:
app.use(express.json());

app.use(cookieParser());

// use on all routes the check user function I created on middleware folder:
app.get("*", checkUser);

app.use(authRoutes);
app.use("/admin", exerciseRoutes);
app.use(homeRoutes);
// app.use("/exercises", exerciseRoutes);

// 404 route should go at the end:
app.use((req, res) => {
  res.status(404).render("404");
});
