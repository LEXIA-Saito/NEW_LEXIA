import { calculateReadingTime } from "./blog-utils"

// Define series data
export const seriesData = [
  {
    id: "responsive-web-design",
    title: "Responsive Web Design Series",
    description: "A comprehensive exploration of responsive web design principles and best practices.",
    image: "/blog/series-sustainable.png", // Placeholder, recommend updating
  },
  {
    id: "ux-psychology",
    title: "UX Psychology Insights",
    description: "Understanding how web design affects user psychology and behavior online.",
    image: "/blog/series-psychology.png", // Placeholder, recommend updating
  },
  {
    id: "web-design-trends-japan",
    title: "Web Design Trends in Japan",
    description: "Exploring traditional and contemporary web design practices in Japan.",
    image: "/blog/series-indonesian.png", // Placeholder, recommend updating
  },
]

export const blogPosts = [
  {
    id: 1,
    title: "Accessible Web Design: Building for Everyone",
    excerpt:
      "Exploring how accessible web design practices can create inclusive and user-friendly websites for all.",
    image: "/blog/blog-1.png", // Placeholder, recommend updating
    date: "May 15, 2023",
    authorInfo: {
      slug: "rafly-kurnia",
      nameKey: "blogAuthors.raflyKurnia",
      image: "/team/person-1.png",
      roleKey: "blogAuthorRoles.leadWebDesigner",
    },
    slug: "accessible-web-design",
    category: { slug: "accessibility", nameKey: "blogCategories.accessibility" },
    tags: [
      { slug: "web-accessibility", nameKey: "blogTags.webAccessibility" },
      { slug: "wcag", nameKey: "blogTags.wcag" },
      { slug: "inclusive-design", nameKey: "blogTags.inclusiveDesign" },
      { slug: "ux", nameKey: "blogTags.ux" },
    ],
    series: {
      id: "responsive-web-design",
      title: "Responsive Web Design Series",
      order: 1,
      description: "Part 1 of our series on responsive web design and accessibility.",
    },
    shareCount: 42,
    content: [
      "Accessible web design represents a commitment to creating websites that minimize barriers for people with disabilities while maximizing usability for everyone. As our reliance on the internet grows, it's crucial to ensure that digital experiences are inclusive and welcoming to all users.",
      "At its core, accessible web design is about making thoughtful choices at every stage of the design and development process. From information architecture and navigation to content structure and interactive elements, each decision contributes to the overall accessibility and usability of a website.",
    ],
    sections: [
      {
        title: "Key Principles of Accessible Design",
        content: [
          "Perceivability is perhaps the most fundamental principle. Information and user interface components must be presentable to users in ways they can perceive. This means providing text alternatives for non-text content, captions for multimedia, and ensuring content can be presented in different ways (e.g., simpler layout) without losing information or structure.",
          "Operability is another crucial aspect. Users must be able to operate the interface. This includes making all functionality available from a keyboard, giving users enough time to read and use content, and not designing content in a way that is known to cause seizures.",
          "Understandability ensures that information and the operation of the user interface are understandable. This involves making text content readable and predictable, and helping users avoid and correct mistakes through clear instructions and feedback.",
        ],
        image: "/blog/sustainable-principles.png", // Placeholder, recommend updating
      },
      {
        title: "Benefits Beyond Compliance",
        content: [
          "While meeting accessibility standards like WCAG is central, the advantages extend far beyond legal compliance. Accessible websites typically offer better user experiences for everyone, leading to higher engagement, lower bounce rates, and improved SEO.",
          "From an economic perspective, accessible design can expand your audience reach and improve brand reputation. Demonstrating a commitment to inclusivity can be a significant differentiator in a crowded digital marketplace.",
          "As technology evolves and digital inclusion becomes increasingly important, accessible web design is rapidly moving from a specialized niche to an industry standard. Web designers and developers who embrace these principles aren't just creating better websites—they're helping shape a more equitable and user-friendly digital presence for future generations.",
        ],
      },
      {
        title: "Our Approach to Accessibility",
        content: [
          "At LEXIA, accessibility isn't an add-on or afterthought—it's integrated into our design and development process from the earliest conceptual stages. We believe that beautiful, functional websites and user inclusivity can and should go hand in hand.",
          "Each project begins with a thorough analysis of user needs and accessibility requirements. This information forms the foundation for design strategies that prioritize clarity, ease of use, and compatibility with assistive technologies.",
          "We're committed to continuous learning and innovation in accessible web practices. As technologies evolve and new guidelines emerge, we stay at the forefront of accessible design to offer our clients the most effective and appropriate solutions for their specific digital products and services.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "The Psychology of UX: How Design Influences User Behavior",
    excerpt: "Understanding the profound impact that user experience design has on online behavior and decision-making.",
    image: "/blog/blog-2.png", // Placeholder, recommend updating
    date: "April 3, 2023",
    authorInfo: {
      slug: "maya-wijaya",
      nameKey: "blogAuthors.mayaWijaya",
      image: "/team/person-2.png",
      roleKey: "blogAuthorRoles.uxUiSpecialist",
    },
    slug: "psychology-of-ux",
    category: { slug: "ux-design", nameKey: "blogCategories.uxDesign" },
    tags: [
      { slug: "ux-psychology", nameKey: "blogTags.uxPsychology" },
      { slug: "user-behavior", nameKey: "blogTags.userBehavior" },
      { slug: "cognitive-bias", nameKey: "blogTags.cognitiveBias" },
      { slug: "ui-design", nameKey: "blogTags.uiDesign" },
    ],
    series: {
      id: "ux-psychology",
      title: "UX Psychology Insights",
      order: 1,
      description: "Part 1 of our series on how web design affects user psychology.",
    },
    shareCount: 38,
    content: [
      "The digital interfaces we interact with profoundly influence our thoughts, feelings, and behaviors in ways we often don't consciously recognize. As web designers and UX specialists, understanding this psychological impact gives us powerful tools to create experiences that support user goals, enhance engagement, and drive desired actions.",
      "Research in human-computer interaction and cognitive psychology has demonstrated clear connections between interface characteristics and psychological responses. Everything from layout and typography to color schemes and interaction patterns can trigger specific cognitive and emotional reactions.",
    ],
    sections: [
      {
        title: "Color and Emotion in UI",
        content: [
          "Perhaps no element of visual design has a more direct impact on emotion than color. Colors can evoke a wide range of feelings and associations, influencing how users perceive a brand and interact with a website. For example, blue often conveys trust and dependability, while green can signify growth or nature.",
          "The strategic use of color in user interfaces goes beyond aesthetics; it's about guiding attention, providing feedback, and reinforcing brand identity. Call-to-action buttons, for instance, often use contrasting colors to stand out and encourage clicks. Thoughtful color palettes enhance usability and create a more engaging user experience.",
        ],
        image: "/blog/light-and-mood.png", // Placeholder, recommend updating
      },
      {
        title: "Cognitive Load and Simplicity",
        content: [
          "Cognitive load refers to the amount of mental effort required to use a website or app. High cognitive load can lead to frustration, errors, and abandonment. Effective UX design aims to minimize cognitive load by presenting information clearly and simplifying complex tasks.",
          "Hick's Law, for example, states that the time it takes to make a decision increases with the number and complexity of choices. Reducing the number of options in navigation menus or forms can make interfaces feel easier to use. Fitt's Law relates to the time it takes to acquire a target, emphasizing the importance of target size and proximity for interactive elements like buttons.",
          "Simplicity and clarity are key. Well-organized content, intuitive navigation, and minimalist design principles help reduce cognitive load, allowing users to focus on their goals rather than struggling to understand the interface.",
        ],
      },
      {
        title: "Biases in User Decision Making",
        content: [
          "Humans are prone to various cognitive biases that can influence their decisions online. Understanding these biases allows designers to create more persuasive and ethical user experiences. For instance, social proof (e.g., testimonials, reviews) can make users more likely to trust a product or service.",
          "Anchoring bias can occur when users rely too heavily on the first piece of information offered. Framing effect shows how the way information is presented can influence choice. Loss aversion describes how people tend to feel the pain of a loss more strongly than the pleasure of an equivalent gain.",
          "At LEXIA, we consider these psychological principles to design user journeys that are intuitive, engaging, and effective. By understanding how users think and behave, we can create digital experiences that not only look good but also achieve business objectives by aligning with user motivations.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Modernizing Legacy Systems: A Web Development Case Study",
    excerpt:
      "How we migrated a client's outdated website to a modern tech stack, improving performance and user experience.",
    image: "/blog/blog-3.png", // Placeholder, recommend updating
    date: "March 12, 2023",
    authorInfo: {
      slug: "rafly-kurnia",
      nameKey: "blogAuthors.raflyKurnia",
      image: "/team/person-1.png",
      roleKey: "blogAuthorRoles.leadWebDesigner",
    },
    slug: "modernizing-legacy-systems",
    category: { slug: "case-study", nameKey: "blogCategories.caseStudy" },
    tags: [
      { slug: "web-development", nameKey: "blogTags.webDevelopment" },
      { slug: "legacy-systems", nameKey: "blogTags.legacySystems" },
      { slug: "react", nameKey: "blogTags.react" },
      { slug: "next-js", nameKey: "blogTags.nextJs" },
      { slug: "case-study", nameKey: "blogTags.caseStudy" },
    ],
    series: {
      id: "web-design-trends-japan",
      title: "Web Design Trends in Japan",
      order: 1,
      description: "Part 1 of our series on web design trends and development case studies.",
    },
    shareCount: 27,
    content: [
      "In an era of rapid technological advancement, maintaining a modern digital presence while dealing with legacy systems presents both a challenge and an opportunity. Our recent project for a client in the retail sector exemplifies how an outdated e-commerce platform can be transformed using a modern tech stack like React and Next.js, resulting in a significantly improved user experience and better performance.",
      "The client, a well-established business with a loyal customer base, struggled with an old website that was slow, difficult to update, and not mobile-friendly. This case study explores our approach to this modernization project and the outcomes achieved.",
    ],
    sections: [
      {
        title: "Project Context and Challenges",
        content: [
          "The existing website was built on a monolithic proprietary platform, making updates cumbersome and expensive. It suffered from slow page load times, a clunky user interface, and poor mobile responsiveness, leading to declining conversion rates.",
          "Additionally, the client's internal team lacked the expertise to manage and scale the old system. Our challenge was to design and develop a new, future-proof e-commerce solution that would be fast, easy to manage, and provide a seamless experience across all devices.",
          "The project also needed to integrate with existing backend systems for inventory and order management, requiring careful API design and data migration strategies.",
        ],
        image: "/blog/traditional-modern-site.png", // Placeholder, recommend updating
      },
      {
        title: "Design and Development Solutions",
        content: [
          "Our approach began with a thorough UX audit and user research to identify pain points and opportunities for improvement. We then designed a new user interface focused on simplicity, intuitive navigation, and a streamlined checkout process.",
          "For the frontend, we chose Next.js, a React framework, for its server-side rendering capabilities (improving SEO and initial page load speed) and its excellent developer experience. We built a library of reusable UI components to ensure consistency and accelerate development.",
          "The backend was developed as a set of microservices using Node.js, providing flexibility and scalability. We designed RESTful APIs to connect the frontend with the existing inventory and order management systems, as well as new services for user accounts and payments.",
        ],
      },
      {
        title: "Technology Stack and Implementation",
        content: [
          "The core technology stack included Next.js (React) for the frontend, Node.js with Express.js for the backend microservices, and PostgreSQL for the new database requirements. We utilized Stripe for payment processing and Vercel for hosting and CI/CD.",
          "We adopted an agile development methodology, working in two-week sprints with regular client feedback sessions. This allowed us to adapt to changing requirements and ensure the final product met client expectations.",
          "Data migration from the old system was a critical phase. We developed custom scripts to extract, transform, and load customer data, order history, and product information into the new platform, ensuring data integrity and minimal downtime during the switchover.",
        ],
      },
      {
        title: "Outcomes and Lessons",
        content: [
          "The new e-commerce platform launched successfully, delivering significant improvements in performance, user engagement, and conversion rates. Page load times were reduced by over 60%, and the mobile user experience was vastly improved.",
          "The client's team found the new content management system intuitive and easy to use, enabling them to update products and promotional content much more efficiently. The modular architecture also makes it easier to add new features and scale the platform in the future.",
          "This project reinforced our belief that modernizing legacy systems, while complex, can unlock substantial business value. A thoughtful approach to UX, technology selection, and project management is key to a successful transformation.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Sustainable Web Development: Building Eco-Friendly Websites",
    excerpt:
      "Exploring how to design and develop websites with minimal environmental impact, focusing on performance and resource efficiency.",
    image: "/blog/blog-4.png", // Placeholder, recommend updating
    date: "February 28, 2023",
    authorInfo: {
      slug: "aisha-putri",
      nameKey: "blogAuthors.aishaPutri",
      image: "/team/person-4.png",
      roleKey: "blogAuthorRoles.frontendDeveloper",
    },
    slug: "sustainable-web-development",
    category: { slug: "web-development", nameKey: "blogCategories.webDevelopment" },
    tags: [
      { slug: "sustainable-web", nameKey: "blogTags.sustainableWeb" },
      { slug: "green-coding", nameKey: "blogTags.greenCoding" },
      { slug: "performance", nameKey: "blogTags.performance" },
      { slug: "eco-friendly", nameKey: "blogTags.ecoFriendly" },
    ],
    series: {
      id: "responsive-web-design",
      title: "Responsive Web Design Series",
      order: 2,
      description: "Part 2 of our series on responsive web design, focusing on sustainability.",
    },
    shareCount: 35,
    content: [
      "Sustainable web development represents a crucial shift in how we think about the environmental impact of our digital products. Rather than seeing websites as purely virtual, this approach recognizes their real-world energy consumption and aims to minimize it through efficient design and development practices.",
      "The internet consumes a vast amount of electricity, contributing to carbon emissions. Sustainable web development seeks to reduce this footprint by creating websites that are lightweight, fast-loading, and hosted on renewable energy sources where possible.",
    ],
    sections: [
      {
        title: "Core Principles of Green Web Development",
        content: [
          "Performance optimization is key. Faster websites use less energy on both the server and client-side. This involves optimizing images, minifying code (CSS, JavaScript, HTML), leveraging browser caching, and reducing HTTP requests.",
          "Efficient coding practices, such as writing clean, maintainable code and choosing energy-efficient programming languages or frameworks where appropriate, can make a difference. Avoiding unnecessary computations and data transfers reduces processing power and thus energy use.",
          "Choosing green hosting providers that power their data centers with renewable energy is another important factor. The Green Web Foundation provides resources to check if a hosting provider uses green energy.",
          "User experience (UX) design also plays a role. A well-designed website that helps users find information quickly reduces the time spent browsing and, consequently, the energy consumed.",
        ],
        image: "/blog/biophilic-science.png", // Placeholder, recommend updating
      },
      {
        title: "Key Elements of Sustainable Web Design",
        content: [
          "Image and video optimization: Compressing images without significant quality loss, using modern formats like WebP, and lazy loading offscreen images are crucial. For videos, consider shorter clips, lower resolutions where appropriate, and avoiding autoplay.",
          "Font optimization: Using web-safe fonts or limiting the number of custom font families and weights can reduce file sizes. WOFF2 format offers better compression.",
          "Dark mode considerations: While the energy savings of dark mode on OLED screens are debated for typical web usage, offering users a choice can cater to preferences and potentially save energy on some devices.",
          "Content strategy: Being concise and to the point. Unnecessary content means more data to load and process. A clear content hierarchy and efficient navigation also contribute by helping users find what they need faster.",
        ],
      },
      {
        title: "Sustainable Web Development in Practice",
        content: [
          "At LEXIA, we integrate sustainable principles into our web development workflow. We prioritize performance optimization from the outset, using tools like Lighthouse and WebPageTest to measure and improve loading times and resource usage.",
          "We educate our clients about the benefits of green hosting and help them make informed choices. We also focus on building websites that are not only fast and efficient but also durable and easy to maintain, reducing the need for frequent redesigns which themselves consume resources.",
          "The beauty of sustainable web development is that it often aligns with other best practices like SEO (search engines prefer fast sites) and good UX (users prefer fast sites). Even small optimizations, when applied consistently, can contribute to a lighter, more eco-friendly web.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "UI Design for Small Screens: Maximizing Impact",
    excerpt: "Design strategies for creating effective and engaging user interfaces for mobile devices and small screens.",
    image: "/blog/blog-5.png", // Placeholder, recommend updating
    date: "January 17, 2023",
    authorInfo: {
      slug: "maya-wijaya",
      nameKey: "blogAuthors.mayaWijaya",
      image: "/team/person-2.png",
      roleKey: "blogAuthorRoles.uxUiSpecialist",
    },
    slug: "ui-design-small-screens",
    category: { slug: "ui-design", nameKey: "blogCategories.uiDesign" },
    tags: [
      { slug: "mobile-ui", nameKey: "blogTags.mobileUi" },
      { slug: "small-screens", nameKey: "blogTags.smallScreens" },
      { slug: "user-interface", nameKey: "blogTags.userInterface" },
      { slug: "responsive-design", nameKey: "blogTags.responsiveDesign" },
    ],
    shareCount: 31,
    content: [
      "As users increasingly access the web via mobile devices, designing for small screens is no longer an afterthought but a primary consideration. While limited screen real estate presents challenges, thoughtful UI design can transform compact interfaces into powerful and engaging user experiences.",
      "At LEXIA, we approach small screen design not as a limitation but as an opportunity for focused creativity and efficiency. With the right strategies, mobile UIs can be clear, intuitive, and highly effective—offering users exactly what they need, when they need it.",
    ],
    sections: [
      {
        title: "Prioritization: The Key to Mobile UI Design",
        content: [
          "Perhaps the most fundamental principle for small screen design is content and feature prioritization. With limited space, it's crucial to identify the most important tasks and information users need and make them easily accessible.",
          "Progressive disclosure is a useful technique: show only essential information initially and allow users to access more details if they choose. This keeps the interface clean and focused.",
          "Navigation must be clear and concise. Common patterns include bottom navigation bars, hamburger menus, or tab-based navigation. The choice depends on the complexity of the app or website and user expectations.",
        ],
        image: "/blog/small-spaces-multifunctional.png", // Placeholder, recommend updating
      },
      {
        title: "Visual Strategies for Clarity and Usability",
        content: [
          "Beyond physical constraints, the perception of clarity plays a crucial role in how usable small screen UIs feel. Several visual strategies can make compact interfaces feel more organized and intuitive.",
          "Maintain clear visual hierarchy. Use typography, color, and spacing to guide the user's eye to the most important elements. Ensure interactive elements are clearly distinguishable from static content.",
          "Touch target size is critical. Buttons and other interactive elements must be large enough to be tapped accurately with a finger, typically at least 44x44 pixels. Adequate spacing between targets prevents accidental taps.",
          "Font choices and readability are paramount. Select legible fonts and ensure sufficient contrast between text and background. Test on actual devices to confirm readability in various lighting conditions.",
        ],
      },
      {
        title: "Interaction Design: Optimizing for Touch",
        content: [
          "Designing for touch interaction requires different considerations than designing for mouse input. Gestures like swipe, pinch, and tap are common, but should be used intuitively and consistently.",
          "Provide clear feedback for interactions. Visual cues, like button states (pressed, disabled) or loading indicators, inform users that the system has received their input and is processing it.",
          "Forms on mobile need special attention. Keep them short, use appropriate input types (e.g., `tel` for phone numbers), and consider breaking longer forms into multiple steps. Ensure easy error correction.",
        ],
      },
      {
        title: "Performance and Context",
        content: [
          "Mobile users often have lower bandwidth or less stable connections. Optimizing assets (images, scripts) for fast loading is crucial. A slow or unresponsive interface will quickly lead to frustration.",
          "Consider the context in which mobile devices are used. Users might be on the go, multitasking, or using one hand. Design for interruptibility and quick task completion.",
          "At LEXIA, we emphasize a mobile-first approach in many of our projects, designing the mobile experience initially and then adapting it for larger screens. This ensures the core functionality and user experience are optimized for the most constrained environment.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "The Future of E-commerce Web Design in Southeast Asia",
    excerpt: "Examining trends and innovations that will shape e-commerce websites in the dynamic Southeast Asian market.",
    image: "/blog/blog-6.png", // Placeholder, recommend updating
    date: "December 5, 2022",
    authorInfo: {
      slug: "rafly-kurnia",
      nameKey: "blogAuthors.raflyKurnia",
      image: "/team/person-1.png",
      roleKey: "blogAuthorRoles.leadWebDesigner",
    },
    slug: "future-ecommerce-web-design-sea",
    category: { slug: "e-commerce", nameKey: "blogCategories.eCommerce" },
    tags: [
      { slug: "e-commerce", nameKey: "blogTags.eCommerce" },
      { slug: "web-design", nameKey: "blogTags.webDesign" },
      { slug: "future-trends", nameKey: "blogTags.futureTrends" },
      { slug: "southeast-asia", nameKey: "blogTags.southeastAsia" },
      { slug: "ux", nameKey: "blogTags.ux" },
    ],
    series: {
      id: "web-design-trends-japan", // Changed from Indonesian Architecture to a more relevant one
      title: "Web Design Trends in Japan", // Aligned with new series
      order: 2,
      description: "Part 2 of our series exploring web design trends, focusing on e-commerce in SEA.",
    },
    shareCount: 24,
    content: [
      "Southeast Asia's e-commerce market is experiencing explosive growth, with internet adoption and digital payments becoming widespread. This rapid expansion creates both challenges and opportunities for e-commerce web design and user experience.",
      "As web designers working in this dynamic context, we're constantly considering how e-commerce platforms can evolve to meet changing consumer needs while addressing pressing issues like mobile-first experiences, localization, trust, and logistics. This article explores emerging trends and innovations that we believe will shape the future of e-commerce web design in Southeast Asia.",
    ],
    sections: [
      {
        title: "Mobile-First and Super Apps",
        content: [
          "With a predominantly mobile-first population, e-commerce success in Southeast Asia hinges on exceptional mobile web and app experiences. Designs must be optimized for smaller screens, varying network conditions, and intuitive touch interactions.",
          "The rise of 'super apps' – integrated platforms offering multiple services like messaging, payments, shopping, and food delivery – is a significant trend. E-commerce sites may need to integrate with these ecosystems or adopt similar strategies of offering comprehensive, convenient user experiences.",
          "Future e-commerce designs will likely feature more personalized content, AI-powered recommendations, and seamless integration of social commerce features, as users often discover products through social media.",
        ],
        image: "/blog/urban-housing-vertical.png", // Placeholder, recommend updating
      },
      {
        title: "Localization and Trust",
        content: [
          "Southeast Asia is a diverse region with multiple languages, cultures, and payment preferences. Effective e-commerce design requires deep localization, including local languages, culturally relevant imagery, and support for popular local payment methods.",
          "Building trust is crucial. Clear product information, transparent pricing, customer reviews, secure payment gateways, and reliable customer support are essential. Design elements that convey security and credibility will be increasingly important.",
          "Cash-on-delivery (COD) remains a popular payment method in many parts of SEA, and e-commerce platforms must accommodate this while also encouraging a shift towards digital payments through incentives and user education.",
        ],
      },
      {
        title: "Logistics and Omnichannel Experiences",
        content: [
          "Logistics can be a major challenge in Southeast Asia, with varying infrastructure quality across countries and regions. E-commerce design needs to provide clear information about shipping times, costs, and tracking.",
          "Omnichannel strategies that blend online and offline experiences are gaining traction. This might include click-and-collect options, in-store returns for online purchases, or using physical stores as fulfillment centers. Web design must support these integrated customer journeys.",
          "We anticipate greater use of AR/VR technologies for virtual try-ons or product visualizations, helping to bridge the gap between online shopping and the tangible experience of physical retail.",
        ],
      },
      {
        title: "AI, Personalization, and Conversational Commerce",
        content: [
          "Artificial Intelligence (AI) will play an increasingly significant role in personalizing the shopping experience, from product recommendations to customized promotions and dynamic pricing.",
          "Chatbots and conversational AI will become more sophisticated, providing instant customer support, guiding users through their purchase journey, and even processing orders through messaging apps.",
          "Voice commerce, while still nascent, is an emerging area to watch, particularly as smart speaker adoption grows. Designing for voice interactions will present new challenges and opportunities for e-commerce web designers.",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Optimizing Website Performance for Core Web Vitals",
    excerpt: "Exploring effective techniques for improving website speed and user experience to meet Google's Core Web Vitals.",
    image: "/blog/blog-7.png", // Placeholder, recommend updating
    date: "November 10, 2022",
    authorInfo: {
      slug: "rafly-kurnia",
      nameKey: "blogAuthors.raflyKurnia",
      image: "/team/person-1.png",
      roleKey: "blogAuthorRoles.leadWebDesigner",
    },
    slug: "optimizing-core-web-vitals",
    category: { slug: "web-performance", nameKey: "blogCategories.webPerformance" },
    tags: [
      { slug: "core-web-vitals", nameKey: "blogTags.coreWebVitals" },
      { slug: "website-speed", nameKey: "blogTags.websiteSpeed" },
      { slug: "ux", nameKey: "blogTags.ux" },
      { slug: "seo", nameKey: "blogTags.seo" },
      { slug: "web-development", nameKey: "blogTags.webDevelopment" },
    ],
    series: {
      id: "responsive-web-design",
      title: "Responsive Web Design Series",
      order: 3, // Updated order
      description: "Part 3 of our series on responsive web design, focusing on performance optimization.",
    },
    shareCount: 29,
    content: [
      "In today's fast-paced digital world, website performance is paramount. Users expect fast-loading, responsive websites, and search engines like Google prioritize sites that offer a good user experience. Core Web Vitals are a set of specific factors that Google considers important in a webpage’s overall user experience.",
      "At LEXIA, our work in web design and development emphasizes that performance must be a foundational aspect of any successful website. Optimizing for Core Web Vitals not only improves SEO but also leads to higher user satisfaction and conversion rates.",
    ],
    sections: [
      {
        title: "Understanding Core Web Vitals",
        content: [
          "Largest Contentful Paint (LCP): Measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.",
          "First Input Delay (FID): Measures interactivity. For a good user experience, pages should have an FID of 100 milliseconds or less. (Note: FID is being replaced by Interaction to Next Paint - INP, which is a more comprehensive measure of responsiveness).",
          "Cumulative Layout Shift (CLS): Measures visual stability. To provide a good user experience, pages should maintain a CLS of 0.1. or less.",
          "Optimizing these metrics requires a holistic approach, addressing everything from server response times and resource loading to client-side rendering and third-party scripts.",
        ],
        image: "/blog/tropical-orientation.png", // Placeholder, recommend updating
      },
      {
        title: "Techniques for Improving LCP",
        content: [
          "Optimize server response times: Use a good hosting provider, implement server-side caching, and consider using a Content Delivery Network (CDN).",
          "Optimize images: Compress images, use appropriate formats (e.g., WebP), serve responsive images using `<picture>` or `srcset`, and preload critical images.",
          "Reduce render-blocking resources: Minify CSS and JavaScript, defer non-critical JavaScript, and inline critical CSS for above-the-fold content.",
          "Prioritize loading of the LCP element: Ensure the main content element is discovered and loaded as early as possible.",
        ],
      },
      {
        title: "Improving FID (and preparing for INP)",
        content: [
          "Reduce JavaScript execution time: Break up long tasks, optimize your JavaScript code, and defer or asynchronously load non-essential scripts. Heavy JavaScript execution can block the main thread, delaying interactivity.",
          "Minimize main thread work: Offload work to web workers where possible. Reduce the complexity of your CSS selectors and layout calculations.",
          "Optimize third-party scripts: Audit third-party scripts for their performance impact. Load them asynchronously or defer them if they are not critical for initial rendering or interactivity.",
          "Interaction to Next Paint (INP) will measure all interactions on a page, so ensuring quick responses to clicks, taps, and keyboard inputs is crucial. This involves efficient event handling and minimizing post-interaction processing.",
        ],
      },
      {
        title: "Minimizing CLS",
        content: [
          "Include size attributes on images and videos: Always specify `width` and `height` attributes for your media elements, or use CSS aspect ratio boxes, so the browser can reserve space before they load.",
          "Avoid inserting content above existing content, unless in response to a user interaction. Dynamically injected ads, embeds, and iframes without dimensions are common culprits.",
          "Preload fonts and ensure font display strategies (like `font-display: swap;`) don't cause significant layout shifts when custom fonts load.",
          "Animations: Use CSS `transform` animations instead of properties that trigger layout changes (e.g., `top`, `left`).",
        ],
      },
    ],
  },
]

// Calculate and add reading time to each post
blogPosts.forEach((post) => {
  // Combine all text content for calculation
  let allContent = post.content.join(" ")

  // Add section content if available
  if (post.sections) {
    post.sections.forEach((section) => {
      allContent += " " + section.content.join(" ")
    })
  }

  // Calculate reading time
  const readingTimeMinutes = calculateReadingTime(allContent)

  // Add to post object
  post.readingTime = readingTimeMinutes
})
