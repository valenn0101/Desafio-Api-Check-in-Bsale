import express from "express";
import apiRoutes from "./v1/routes/index-route.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
  console.log("Hello Worlda!");
});
app.use("/", apiRoutes);

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
