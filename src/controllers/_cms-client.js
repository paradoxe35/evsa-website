import { Directus } from "@directus/sdk";
import { CMS_API_URL } from "../data/data.js";
import { EventEmitter } from "events";
import { wait } from "../utils.js";

export const directus = new Directus(CMS_API_URL);

export const reAuthentication = new EventEmitter();

async function start() {
  let authenticated = false;

  // Try to authenticate with token if exists
  await directus.auth
    .refresh()
    .then(() => {
      authenticated = true;
      console.log("Authentication refreshed");
    })
    .catch(() => {});

  // Let's login in case we don't have token or it is invalid / expired
  while (!authenticated) {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    await wait(2000);

    await directus.auth
      .login({ email, password })
      .then(() => {
        authenticated = true;
        console.log("Authenticated");
      })
      .catch(() => {
        console.log("Authentication failed");
      });
  }
}
start();

reAuthentication.on("reauthenticate", start);
