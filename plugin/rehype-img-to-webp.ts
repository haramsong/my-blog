import { visit } from "unist-util-visit";
import type { Element, Root } from "hast";

export default function rehypeWebp() {
  return (tree: Root) => {
    visit(tree, "element", (node: Element, index, parent) => {
      if (node.tagName === "img" && parent && index !== null) {
        const src = node.properties?.src as string | undefined;
        if (src && /\.(png|jpe?g)$/i.test(src)) {
          const picture: Element = {
            type: "element",
            tagName: "picture",
            properties: {},
            children: [
              {
                type: "element",
                tagName: "source",
                properties: {
                  srcSet: src.replace(/\.(png|jpe?g)$/i, ".webp"),
                  type: "image/webp",
                },
                children: [],
              },
              node,
            ],
          };
          if (parent && typeof index === "number") {
            parent.children[index] = picture;
          }
        }
      }
    });
  };
}
