import { visit } from "unist-util-visit";
import type { Plugin } from "unified";
import type { Element, Root } from "hast";

const rehypeImgToFigure: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, "element", (node, index, parent) => {
      if (node.tagName === "img" && parent) {
        const figure: Element = {
          type: "element",
          tagName: "figure",
          properties: {
            className: ["my-4", "text-center"],
          },
          children: [
            node,
            {
              type: "element",
              tagName: "figcaption",
              properties: {
                className: ["text-sm", "text-gray-500", "mt-2"],
              },
              children: [
                {
                  type: "text",
                  value: (node.properties?.alt as string) || "",
                },
              ],
            },
          ],
        };

        parent.children.splice(index!, 1, figure);
      }
    });
  };
};

export default rehypeImgToFigure;
