import { CMS_MODELS, IMAGE_PRESETS } from "../data/data.js";
import { authenticated, directus, hasFiles } from "./_cms-client.js";

/**
 * @param {string} model
 * @param {number | undefined} limit
 * @returns
 */
async function getDatas(model, limit = undefined) {
  await authenticated();
  return directus.items(model).readByQuery({ limit });
}

/**
 * @param {import("express").Response} res
 */
export default async function home_controller(_, res) {
  let { data: sliders } = await getDatas(CMS_MODELS.sliders);
  let { data: welcomeDetails } = await getDatas(CMS_MODELS.welcomeDetails, 4);
  let { data: services } = await getDatas(CMS_MODELS.services, 4);

  res.render("pages/index", {
    sliders: hasFiles(sliders),
    welcomeDetails: hasFiles(welcomeDetails),
    services: hasFiles(services),
  });
}
