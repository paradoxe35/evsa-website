import { CMS_MODELS } from "../data/data.js";
import {
  authenticated,
  directus,
  getDatas,
  hasFile,
  hasFiles,
} from "./_cms-client.js";

export default async function blog_controller(_, res) {
  const { data: articles } = await getDatas(CMS_MODELS.blog);

  const normalizedArticles = hasFiles(articles).map((art) => {
    art.text = art.text.replace(/<[^>]*>?/gm, "");
    return art;
  });

  res.render("pages/blog", { articles: normalizedArticles });
}

/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export async function show_blog_controller(req, res) {
  await authenticated();

  const data = await directus
    .items(CMS_MODELS.blog)
    .readOne(req.params["blogId"]);

  if (!data) {
    res.redirect("/");
    return;
  }

  res.render("pages/blog/show", { article: hasFile(data) });
}
