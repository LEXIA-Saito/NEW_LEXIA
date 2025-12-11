import { redirect } from "next/navigation"

export default function DesignServiceRedirect() {
  redirect("/services?tab=design")
}
