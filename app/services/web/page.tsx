import { redirect } from "next/navigation"

export default function WebServiceRedirect() {
  redirect("/services?tab=web")
}
