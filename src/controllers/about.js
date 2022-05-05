import { CMS_MODELS } from "../data/data.js";
import { getDatas, hasFiles } from "./_cms-client.js";

export default async function about_controller(_, res) {
  let { data: welcomeDetails } = await getDatas(CMS_MODELS.welcomeDetails);

  res.render("pages/about", {
    welcomeDetails: hasFiles(welcomeDetails),
  });
}
