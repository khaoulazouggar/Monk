const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const createImage = require("./user/createImage");
const GetImages = require("./user/Getimages");
const ChangeStatus = require("./user/ChangeStatus");
const PreviousStatus = require("./user/PreviousStatus");

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use("/images", express.static("./images"));
app.use("/createImage", createImage);
app.use("/GetImages", GetImages);
app.use("/ChangeStatus", ChangeStatus);
app.use("/PreviousStatus", PreviousStatus);

app.listen(3001, () => {});