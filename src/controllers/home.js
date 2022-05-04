import { CMS_MODELS, IMAGE_PRESETS } from "../data/data.js";
import { authenticated, directus, hasFiles } from "./_cms-client.js";

async function slidersData() {
  await authenticated();
  return directus.items(CMS_MODELS.sliders).readByQuery();
}

/**
 * @param {import("express").Response} res
 */
export default async function home_controller(_, res) {
  let { data: sliders } = await slidersData();

  sliders = hasFiles(sliders, IMAGE_PRESETS.sliders);

  res.render("pages/index", {
    sliders,
  });
}
