import View from "@/views/Blog";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/blog");

export default function Page() {
  return <View />;
}
