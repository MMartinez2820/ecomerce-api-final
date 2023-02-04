const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const db = require("./utils/database");
const initModels = require("./models/initModels");
const routerApi = require("./routes");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, 'public')));



initModels();

db.authenticate()
  .then(() => console.log("Base de datos autenticada"))
  .catch((error) => console.log(error));

db.sync({ force: false })
  .then(() => console.log("Base de datos sincronizada"))
  .catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to my server" });
});

routerApi(app);



module.exports = app;
