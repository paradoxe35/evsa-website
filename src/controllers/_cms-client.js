import { Directus } from "@directus/sdk";
import { CMS_API_URL, IMAGE_PRESETS } from "../data/data.js";
import { EventEmitter } from "events";
import { wait } from "../utils/utils.js";

const IS_AUTHENTICATED = {
  value: false,
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
    if (IS_AUTHENTICATED.value) {
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
          IS_AUTHENTICATED.value = true;
          authenticated_event.emit("authenticated", true);
        }
        console.log("Authenticated");
      })
      .catch(() => {
        console.log("Authentication failed");
      });

    await wait(2000);
  }
}
start();

/**
 * @param {import("@directus/sdk").PartialItem<any>} data
 * @param {string?} preset
 * @returns {import("@directus/sdk").PartialItem<any>}
 */
export function hasFile(data, preset = undefined) {
  const url = `/assets/${data.image}?access_token=${directus.auth.token}${
    preset ? `&key=${preset}` : ""
  }`;

  data.image = url;

  return data;
}

/**
 * @param {import("@directus/sdk").PartialItem<any>[]} datas
 * @param {string} preset
 * @returns {import("@directus/sdk").PartialItem<any>[]}
 */
export function hasFiles(datas, preset = IMAGE_PRESETS.sliders) {
  return datas.map((data) => hasFile(data, preset));
}

/**
 * @param {string} model
 * @param {number | undefined} limit
 * @param {import("@directus/sdk").Sort<any> | undefined} sort
 * @returns
 */
export async function getDatas(model, limit = undefined, sort = undefined) {
  await authenticated();
  // @ts-ignore
  return directus.items(model).readByQuery({ limit, sort: sort });
}
