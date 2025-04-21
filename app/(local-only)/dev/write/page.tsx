import WritePageClient from "./WritePageClient";
import { getSectionAndCategoryOptions } from "@/lib/getSectionAndCategoryOptions";

export default async function WritePage() {
  const sectionCategoryList = await getSectionAndCategoryOptions();
  const options = Object.fromEntries(
    sectionCategoryList.map(({ section, categories }) => [section, categories])
  );

  return <WritePageClient options={options} />;
}
