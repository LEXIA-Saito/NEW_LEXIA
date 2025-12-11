import { redirect } from "next/navigation"

export default function PcServiceRedirect() {
  redirect("/services?tab=pc")
}
