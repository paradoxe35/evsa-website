import "dotenv/config";
import express from "express";
import { Liquid } from "liquidjs";
import morgan from "morgan";
import proxy from "express-http-proxy";
import { ADDRESS, APP_NAME, CMS_API_URL, INFO, menus } from "./data/data.js";
import "./controllers/_cms-client.js";
import home_controller from "./controllers/home.js";
import about_controller from "./controllers/about.js";
import contact_controller from "./controllers/contact.js";
import service_controller from "./controllers/service.js";
import blog_controller from "./controllers/blog.js";
import getLogoFile from "./data/logo.js";
import register from "./utils/liquid.js";

// App constants
const PORT = +process.env.PORT || 3000;

// Create a new express application instance
const app = express();
const engine = new Liquid({
  cache: process.env.NODE_ENV === "production",
  globals: {
    menus,
    appName: APP_NAME,
    address: ADDRESS,
    info: INFO,
    logo: getLogoFile,
  },
});

/**
 * Register Filters/Tags
 */
register(engine);

// Define template engine
app.engine("liquid", engine.express());
app.set("views", "views");
app.set("view engine", "liquid");

// Server static files
app.use(express.static("public"));

// Logger middleware
app.use(morgan("dev"));

// Define routes
app.get("/", home_controller);
app.get("/about", about_controller);
app.get("/contact", contact_controller);
app.get("/service", service_controller);
app.get("/blog", blog_controller);

// Proxy requests to the CMS API
app.use(
  proxy(CMS_API_URL, {
    limit: "50mb",
  })
);

// Start the server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Listening on port ${PORT}`);
});
