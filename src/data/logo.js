import { authenticated, directus } from "../controllers/_cms-client.js";

export default async function getLogoFile() {
  await authenticated();

  return directus.files
    .readByQuery({
      search: "logo.png",
      limit: 1,
    })
    .then(({ data }) => data[0]);
}
