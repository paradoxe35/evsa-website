import { Liquid } from "liquidjs";
import { hasFile } from "../controllers/_cms-client.js";

/**
 *
 * @param {Liquid} engine
 */
export default function register(engine) {
  /**
   * Register logo filter
   */
  engine.registerFilter("logo", (object) => {
    return object ? hasFile({ image: object.id }).image : "images/logo.png";
  });

  engine.registerFilter("isModulo2", (number) => {
    return +number % 2 === 0;
  });

  engine.registerFilter("modulo4AddOne", (number) => {
    return (+number % 4) + 1;
  });

  engine.registerFilter("objectKey", (object, arg) => {
    return object[arg];
  });

  engine.registerFilter("background_image", (object) => {
    return object["background_image"];
  });
}
