import { Directus } from "@directus/sdk";
import { CMS_API_URL } from "../data/data.js";
import { EventEmitter } from "events";
import { wait } from "../utils.js";

const ACCESS_TOKEN = {
  value: "",
};

export const directus = new Directus(CMS_API_URL, {
  auth: {
    autoRefresh: true,
    msRefreshBeforeExpires: 30000,
  },
});

export const authenticated_event = new EventEmitter();

/**
 * Verify if cms server has been successfully started and authenticated
 * @returns {Promise<boolean>}
 */
export function authenticated() {
  return new Promise((resolve) => {
    if (ACCESS_TOKEN.value) {
      resolve(true);
      return;
    }
    authenticated_event.once("authenticated", resolve);
  });
}

/**
 * To be run on application startup and once
 */
async function start() {
  let authenticated = false;

  // Let's login in case we don't have token or it is invalid / expired
  while (!authenticated) {
    const email = process.env.ADMIN_EMAIL;
    const password = process.env.ADMIN_PASSWORD;

    await directus.auth
      .login({ email, password })
      .then((data) => {
        authenticated = true;
        if (data) {
          ACCESS_TOKEN.value = data.access_token;
          authenticated_event.emit("authenticated", true);
        }
        console.log("Authenticated");
      })
      .catch(() => {
        console.log("Authentication failed");
      });

    await wait(2000);
  }

  /**
   * Run this every 1minute to refresh access token if expired
   */
  if (!authenticated) {
    setTimeout(() => {
      directus.auth.refreshIfExpired();
    }, 5 * 1000 * 60);
  }
}
start();

/**
 * @param {import("@directus/sdk").PartialItem<any>} data
 * @param {import("express").Request} req
 * @param {string?} preset
 * @returns {import("@directus/sdk").PartialItem<any>}
 */
export function hasFile(data, req, preset = undefined) {
  const url = `//${req.get("host")}/assets/${data.image}?access_token=${
    directus.auth.token
  }${preset ? `&key=${preset}` : ""}`;

  data.image = url;

  return data;
}

/**
 * @param {import("@directus/sdk").PartialItem<any>[]} datas
 * @param {import("express").Request} req
 * @param {string} preset
 * @returns {import("@directus/sdk").PartialItem<any>[]}
 */
export function hasFiles(datas, req, preset = undefined) {
  return datas.map((data) => hasFile(data, req, preset));
}
