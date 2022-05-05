import { CMS_MODELS, IMAGE_PRESETS } from "../data/data.js";
import { authenticated, directus, hasFile, hasFiles } from "./_cms-client.js";

/**
 * @param {string} model
 * @param {number | undefined} limit
 * @param {import("@directus/sdk").Sort<any> | undefined} sort
 * @returns
 */
async function getDatas(model, limit = undefined, sort = undefined) {
  await authenticated();
  // @ts-ignore
  return directus.items(model).readByQuery({ limit, sort: sort });
}

/**
 * @param {import("express").Response} res
 */
export default async function home_controller(_, res) {
  let { data: sliders } = await getDatas(CMS_MODELS.sliders);
  let { data: welcomeDetails } = await getDatas(CMS_MODELS.welcomeDetails, 4);
  let { data: services } = await getDatas(CMS_MODELS.services, 4, [
    "date_created",
  ]);
  let { data: guards } = await getDatas(CMS_MODELS.guards, 6);
  let { data: story } = await getDatas(CMS_MODELS.story);

  console.log();

  res.render("pages/index", {
    sliders: hasFiles(sliders),
    welcomeDetails: hasFiles(welcomeDetails),
    services: hasFiles(services),
    guards: hasFiles(guards),
    story: hasFile(story),
  });
}
