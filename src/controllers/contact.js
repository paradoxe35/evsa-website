import { CMS_MODELS } from "../data/data.js";
import { authenticated, directus } from "./_cms-client.js";

export default function contact_controller(_, res) {
  res.render("pages/contact");
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function message_controller(req, res) {
  const data = req.body;

  for (const key in data) {
    if (!["name", "phone", "email", "message"].includes(key)) {
      res.redirect(data.location);
      return;
    }
  }

  await authenticated();

  await directus.items(CMS_MODELS.messages).createOne({
    ...data,
  });

  return res.redirect(data.location);
}
