import {
  authenticated,
  directus,
  getDatas,
  hasFile,
} from "../controllers/_cms-client.js";
import { CMS_MODELS, default_info } from "./data.js";

export async function getLogoFile() {
  await authenticated();

  return directus.files
    .readByQuery({
      search: "logo.png",
      limit: 1,
    })
    .then(({ data }) => data[0]);
}

export async function getInfo() {
  let { data: info } = await getDatas(CMS_MODELS.information);
  return info ? hasFile(info, "background_image") : default_info;
}
