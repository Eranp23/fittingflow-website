import HomeV2 from "@/components/home2/HomeV2";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/");

export default function HomePage() {
  return <HomeV2 />;
}
