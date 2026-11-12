import { redirect } from "next/navigation";

/** The preview address now points to the real home page (links already shared keep working). */
export default function HomePreview() {
  redirect("/");
}
