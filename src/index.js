import express from "express";
import { Liquid } from "liquidjs";

// Create a new express application instance
const app = express();
const port = 3000;
const engine = new Liquid({
  cache: process.env.NODE_ENV === "production",
});

// Define template engine
app.engine("liquid", engine.express());
app.set("views", "../views");
app.set("view engine", "liquid");
app.use(express.static("public"));

// Define routes
app.get("/", (_, res) => {
  res.render("pages/index");
});
app.get("/about", (req, res) => {});
app.get("/contact", (req, res) => {});
app.get("/service", (req, res) => {});
app.get("/blog", (req, res) => {});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
