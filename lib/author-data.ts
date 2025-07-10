export const authorData = [
  {
    slug: "rafly-kurnia",
    nameKey: "blogAuthors.raflyKurnia", // Matches key used in blog-data
    roleKey: "blogAuthorRoles.leadWebDesigner", // Matches key used in blog-data
    bio: "Rafly leads our web design strategy, focusing on innovative and user-centric solutions. With over 10 years in digital, his articles explore cutting-edge design trends and best practices.",
    image: "/team/person-1.png",
    email: "rafly@lexia.design",
    linkedin: "https://www.linkedin.com/in/lexia-saito/",
  },
  {
    slug: "maya-wijaya",
    nameKey: "blogAuthors.mayaWijaya", // Matches key used in blog-data
    roleKey: "blogAuthorRoles.uxUiSpecialist", // Role in blog-data is "UX/UI Specialist", this is "UX/UI Lead"
                                            // Let's use a new key for consistency or decide if "UX/UI Lead" is a distinct role.
                                            // For now, let's assume "blogAuthorRoles.uxUiLead" is more appropriate if the role is different.
                                            // The previous step created "blogAuthorRoles.uxUiSpecialist".
                                            // Let's use what's likely already in common.json from blog-data:
    // roleKey: "blogAuthorRoles.uxUiLead", // If we need a new one for "UX/UI Lead"
    roleKey: "blogAuthorRoles.uxUiSpecialist", // Reusing for now, assuming "UX/UI Lead" and "UX/UI Specialist" can share a translation or the one from blog-data is primary.
                                             // Task implies reusing if possible. The placeholder keys were based on blog-data.
    bio: "Maya excels in crafting intuitive user experiences. Her articles delve into UX psychology, usability principles, and creating engaging digital interfaces.",
    image: "/team/person-2.png",
    email: "maya@lexia.design",
    linkedin: "https://www.linkedin.com/in/lexia-saito/",
  },
  {
    slug: "aisha-putri",
    nameKey: "blogAuthors.aishaPutri", // Matches key used in blog-data
    roleKey: "blogAuthorRoles.frontendDeveloper", // Role in blog-data is "Frontend Developer", this is "Frontend Development Lead"
                                                // Let's use "blogAuthorRoles.frontendDevelopmentLead"
    // roleKey: "blogAuthorRoles.frontendDevelopmentLead", // If new key needed.
    roleKey: "blogAuthorRoles.frontendDeveloper", // Reusing for now.
    bio: "Aisha heads our frontend development. She writes about modern frontend technologies, responsive design, and web performance optimization.",
    image: "/team/person-4.png",
    email: "aisha@lexia.design",
    linkedin: "https://www.linkedin.com/in/lexia-saito/",
  },
  {
    slug: "daniel-hartono",
    nameKey: "blogAuthors.danielHartono", // New author, will need new key "blogAuthors.danielHartono"
    roleKey: "blogAuthorRoles.digitalProjectManager", // New role, will need new key "blogAuthorRoles.digitalProjectManager"
    bio: "Daniel orchestrates our web projects with precision. His articles cover agile methodologies, digital project management, and ensuring successful project delivery.",
    image: "/team/person-3.png",
    email: "daniel@lexia.design",
    linkedin: "https://www.linkedin.com/in/lexia-saito/",
  },
]
