import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";

export default function rehypeLazyLoad() {
  return (tree: Root) => {
    let firstImage = true;

    visit(tree, "element", (node: Element) => {
      if (node.tagName === "img") {
        node.properties = node.properties || {};
        if (firstImage) {
          node.properties.loading = "eager";
          node.properties.fetchpriority = "high";
          firstImage = false;
        } else {
          node.properties.loading = "lazy";
        }
      }
    });
  };
}
