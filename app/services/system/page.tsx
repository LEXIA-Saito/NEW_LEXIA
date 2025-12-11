import { redirect } from "next/navigation"

export default function SystemServiceRedirect() {
  redirect("/services?tab=system")
}
