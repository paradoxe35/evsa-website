import { CMS_MODELS, IMAGE_PRESETS } from "../data/data.js";
import { getDatas, hasFile, hasFiles } from "./_cms-client.js";

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

  res.render("pages/index", {
    sliders: hasFiles(sliders),
    welcomeDetails: hasFiles(welcomeDetails),
    services: hasFiles(services),
    guards: hasFiles(guards),
    story: hasFile(story),
  });
}
