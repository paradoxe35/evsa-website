import { authenticated, directus } from "../controllers/_cms-client";

export default async function getLogoFile() {
  await authenticated();

  return directus.files.readByQuery({
    search: '"name" = "logo.png"',
    limit: 1,
  });
}
