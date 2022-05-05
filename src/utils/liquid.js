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
    return hasFile({ image: object.id }).image;
  });

  engine.registerFilter("modulo2", (number) => {
    return +number % 2 === 0;
  });
}
