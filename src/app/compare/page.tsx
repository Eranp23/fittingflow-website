import type { Metadata } from "next";
import CompareSoftware, { COMPARE_DESCRIPTION, COMPARE_TITLE } from "@/views/CompareSoftware";
import { competitorRows } from "@/data/competitors";
import { fittingFlowCompare } from "@/lib/compare";
import { getPlans } from "@/lib/plans";

/**
 * Hidden from Google (noindex, not in the sitemap or menus) until Natella approves
 * naming competitors. To publish: remove `robots` below, add "/compare" to
 * src/lib/seoPages.ts, and link it from the footer.
 */
export const metadata: Metadata = {
  title: { absolute: COMPARE_TITLE },
  description: COMPARE_DESCRIPTION,
  robots: { index: false, follow: true },
};

export const revalidate = 3600;

export default async function Page() {
  const { row, alterationsOn } = fittingFlowCompare(await getPlans());
  return <CompareSoftware compareRows={[row, ...competitorRows]} alterationsOn={alterationsOn} />;
}
