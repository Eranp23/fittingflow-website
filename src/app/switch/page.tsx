import View from "@/views/FreeSwitch";
import { metadataFor } from "@/lib/metadata";

export const metadata = metadataFor("/switch");

export default function Page() {
  return <View />;
}
