import View from "@/views/About";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/about");

export default function Page() {
  return <View />;
}
