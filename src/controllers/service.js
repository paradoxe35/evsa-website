import { CMS_MODELS } from "../data/data.js";
import { directus, getDatas, hasFiles } from "./_cms-client.js";

export default async function service_controller(_, res) {
  let { data: services } = await getDatas(CMS_MODELS.services, undefined, [
    "date_created",
  ]);
  let { data: guards } = await getDatas(CMS_MODELS.guards);

  res.render("pages/service", {
    services: hasFiles(services),
    guards: hasFiles(guards),
  });
}
