import express from "express";
import { Liquid } from "liquidjs";
import morgan from "morgan";
import proxy from "express-http-proxy";

// App constants
const PORT = 3000;
const CMS_API_URL = "http://localhost:8055/";

// Create a new express application instance
const app = express();
const engine = new Liquid({
  cache: process.env.NODE_ENV === "production",
});

// Define template engine
app.engine("liquid", engine.express());
app.set("views", "views");
app.set("view engine", "liquid");

// Server static files
app.use(express.static("public"));

// Logger middleware
app.use(morgan("dev"));

// Define routes
app.get("/", (_, res) => res.render("pages/index"));
app.get("/about", (_, res) => res.render("pages/about"));
app.get("/contact", (_, res) => res.render("pages/contact"));
app.get("/service", (_, res) => res.render("pages/service"));
app.get("/blog", (_, res) => res.render("pages/blog"));

// Proxy requests to the CMS API
app.use(proxy(CMS_API_URL));

// Start the server
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
