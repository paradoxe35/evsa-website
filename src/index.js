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
app.set("views", "views");
app.set("view engine", "liquid");
app.use(express.static("public"));

// Define routes
app.get("/", (_, res) => {
  res.render("pages/index");
});
app.get("/about", (req, res) => {
  res.render("pages/about");
});
app.get("/contact", (req, res) => {
  res.render("pages/contact");
});
app.get("/service", (req, res) => {
  res.render("pages/service");
});
app.get("/blog", (req, res) => {
  res.render("pages/blog");
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
