import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import session from "express-session";
import fileUpload from "express-fileupload";
import path from "path";

import constant from "./config/constant";
import route from "./modules/index";
import models from "./modules/models";

const app: Application = express();

const port: string = constant.PORT || "3000";

app.use(cors());
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: constant.SECRETE,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use("/api/v1/", route);

models.sequelize.options.logging = false;

app.listen(port, () => {
  console.log(`Running on port ${port}`);
});
