import { CMS_MODELS, IMAGE_PRESETS } from "../data/data.js";
import { directus, hasFiles } from "./_cms-client.js";

function slidersData() {
  return directus.items(CMS_MODELS.sliders).readByQuery();
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export default async function home_controller(req, res) {
  let { data: sliders } = await slidersData();

  sliders = hasFiles(sliders, req, IMAGE_PRESETS.sliders);

  res.render("pages/index", {
    sliders,
  });
}
