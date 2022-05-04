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
  const { data: sliders } = await slidersData();

  res.render("pages/index", {
    slides: hasFiles(sliders, req, IMAGE_PRESETS.sliders),
  });
}
