const express = require("express");
const cors = require("cors");
const app = express();
const morgan = require("morgan");

//Settings
app.set("port", process.env.PORT || 3000);
app.set("json spaces", 2);
const corsOptions = {
  origin: "http://localhost:3001",
};

//Middleware
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(corsOptions));

//Routes
app.use(require("./routes/index"));
require("./routes/user")(app);
require("./routes/account")(app);
require("./routes/manager")(app);

// Starting the server
app.listen(app.get("port"), () => {
  console.log(`Server listening on port ${app.get("port")}`);
});
