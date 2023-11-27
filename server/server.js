require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

// блок настройки cors ------>
const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};
app.use(cors(corsOptions));
// блок настройки cors <-------

// блок для работы с сессиями ------>
const expressSession = require("express-session");
const FileStore = require("session-file-store")(expressSession);

const sessionConfig = {
  name: "ownfinal",
  store: new FileStore(),
  secret: process.env.SECRET_KEY_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 60 * 1000,
    httpOnly: true,
  },
};
app.use(expressSession(sessionConfig));
// блок для работы с сессиями <-------

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const { PORT } = process.env;

app.listen(PORT, () => {
  console.log("Сервер запущен, порт: ", PORT);
});

app.get("/", (req, res) => {
  res.send("Привет!");
});

app.use("/users", require("./routes/users"));
