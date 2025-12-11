import { redirect } from "next/navigation"

export default function MovieServiceRedirect() {
  redirect("/services?tab=movie")
}
