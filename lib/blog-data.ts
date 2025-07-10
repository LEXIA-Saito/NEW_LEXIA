import { calculateReadingTime } from "./blog-utils"

// Define series data
export const seriesData = [
  {
    id: "sustainable-design",
    title: "Sustainable Design Series",
    description: "A comprehensive exploration of sustainable architecture principles and practices.",
    image: "/blog/series-sustainable.png",
  },
  {
    id: "spatial-psychology",
    title: "The Psychology of Space",
    description: "Understanding how architectural spaces affect human psychology and behavior.",
    image: "/blog/series-psychology.png",
  },
  {
    id: "indonesian-architecture",
    title: "Indonesian Architecture",
    description: "Exploring traditional and contemporary architectural practices in Indonesia.",
    image: "/blog/series-indonesian.png",
  },
]

export const blogPosts = [
  {
    id: 1,
    title: "Sustainable Architecture: Building for the Future",
    excerpt:
      "Exploring how sustainable design practices can create environmentally responsible and resource-efficient buildings.",
    image: "/blog/blog-1.png",
    date: "May 15, 2023",
    author: "Rafly Kurnia",
    authorImage: "/team/person-1.png",
    authorRole: "Principal Architect",
    slug: "sustainable-architecture",
    category: "Sustainability",
    tags: ["Sustainable Design", "Green Building", "Eco-friendly", "Architecture"],
    series: {
      id: "sustainable-design",
      title: "Sustainable Design Series",
      order: 1,
      description: "Part 1 of our series on sustainable architecture and design practices.",
    },
    shareCount: 42,
    content: [
      "Sustainable architecture represents a commitment to designing buildings that minimize environmental impact while maximizing comfort and efficiency. As climate change concerns grow, architects are increasingly focused on creating structures that work with nature rather than against it.",
      "At its core, sustainable architecture is about making thoughtful choices at every stage of the design and construction process. From site selection and orientation to material choices and energy systems, each decision contributes to the overall environmental footprint of a building.",
    ],
    sections: [
      {
        title: "Key Principles of Sustainable Architecture",
        content: [
          "Energy efficiency is perhaps the most fundamental principle of sustainable design. Buildings account for approximately 40% of global energy consumption, making efficiency improvements a critical focus. Passive design strategies like proper orientation, natural ventilation, and daylighting can dramatically reduce energy needs before mechanical systems are even considered.",
          "Material selection is another crucial aspect. Sustainable architects prioritize renewable, recycled, and locally sourced materials with low embodied energy. This might include reclaimed wood, recycled metal, or innovative new materials made from agricultural waste products.",
          "Water conservation strategies, from rainwater harvesting to greywater recycling systems, help reduce demand on municipal water supplies and minimize wastewater. In many regions facing water scarcity, these approaches are becoming essential rather than optional.",
        ],
        image: "/blog/sustainable-principles.png",
      },
      {
        title: "Benefits Beyond Environmental Impact",
        content: [
          "While environmental benefits are central to sustainable architecture, the advantages extend far beyond reducing carbon footprints. Sustainable buildings typically offer healthier indoor environments with better air quality, natural lighting, and connections to nature—all factors that contribute to occupant wellbeing and productivity.",
          "From an economic perspective, sustainable buildings often deliver significant operational savings through reduced energy and water consumption. Though initial construction costs may sometimes be higher, the life-cycle cost analysis typically reveals substantial long-term savings.",
          "As regulations tighten and climate concerns grow, sustainable design is rapidly moving from a specialized niche to the industry standard. Architects who embrace these principles aren't just designing better buildings—they're helping shape a more resilient and responsible built environment for future generations.",
        ],
      },
      {
        title: "Our Approach to Sustainability",
        content: [
          "At LEXIA, sustainability isn't an add-on or afterthought—it's integrated into our design process from the earliest conceptual stages. We believe that beautiful, functional architecture and environmental responsibility can and should go hand in hand.",
          "Each project begins with a thorough site analysis to understand local climate conditions, solar patterns, prevailing winds, and natural features. This information forms the foundation for passive design strategies that work with nature rather than against it.",
          "We're committed to continuous learning and innovation in sustainable practices. As technologies evolve and new materials emerge, we stay at the forefront of sustainable design to offer our clients the most effective and appropriate solutions for their specific needs and contexts.",
        ],
      },
    ],
  },
  {
    id: 2,
    title: "The Psychology of Space: How Architecture Affects Mood",
    excerpt: "Understanding the profound impact that spatial design has on human psychology and emotional wellbeing.",
    image: "/blog/blog-2.png",
    date: "April 3, 2023",
    author: "Maya Wijaya",
    authorImage: "/team/person-2.png",
    authorRole: "Interior Designer",
    slug: "psychology-of-space",
    category: "Design Theory",
    tags: ["Psychology", "Interior Design", "Wellbeing", "Spatial Design"],
    series: {
      id: "spatial-psychology",
      title: "The Psychology of Space",
      order: 1,
      description: "Part 1 of our series on how architectural spaces affect human psychology.",
    },
    shareCount: 38,
    content: [
      "The spaces we inhabit profoundly influence our thoughts, feelings, and behaviors in ways we often don't consciously recognize. As architects and designers, understanding this psychological impact gives us powerful tools to create environments that support wellbeing, productivity, and positive emotional states.",
      "Research in environmental psychology has demonstrated clear connections between spatial characteristics and psychological responses. Everything from ceiling height and lighting to color schemes and material textures can trigger specific cognitive and emotional reactions.",
    ],
    sections: [
      {
        title: "Light and Mood",
        content: [
          "Perhaps no element of architectural design has a more direct impact on psychology than lighting. Natural light doesn't just reduce energy consumption—it regulates our circadian rhythms, improves mood, and enhances cognitive function. Studies in healthcare settings have even shown that patients in rooms with more natural light typically experience less stress, require less pain medication, and recover faster.",
          "The quality of light matters as much as the quantity. Harsh, direct lighting can create uncomfortable glare and contribute to eye strain and headaches. In contrast, diffused natural light creates a sense of warmth and comfort. In spaces where natural light is limited, thoughtfully designed artificial lighting can mimic some of these beneficial effects.",
        ],
        image: "/blog/light-and-mood.png",
      },
      {
        title: "Spatial Dimensions and Psychological Comfort",
        content: [
          "The proportions and scale of a space significantly impact how we feel within it. High ceilings tend to promote abstract, creative thinking and feelings of freedom, while lower ceilings can create a sense of coziness and security that's beneficial in certain contexts.",
          "Similarly, open floor plans can foster connection and collaboration but may increase stress for those who value privacy. The ideal balance often depends on the intended function of the space and the psychological needs of its users.",
          "Crowding and density perceptions are not simply about square footage—they're influenced by layout, visual access, and the ability to control social interactions. Well-designed smaller spaces can feel comfortable and spacious when they incorporate these psychological principles.",
        ],
      },
      {
        title: "Biophilic Design: Our Connection to Nature",
        content: [
          "Humans have an innate affinity for natural elements—a concept known as biophilia. Incorporating nature into built environments through views, natural materials, plants, and even patterns that mimic natural forms can reduce stress, improve cognitive function, and enhance creativity.",
          "At LEXIA, we integrate biophilic principles into our projects whenever possible. This might include maximizing views to natural landscapes, incorporating interior plantings, using natural materials like wood and stone, or designing with organic forms and patterns.",
          "The psychological benefits of these connections to nature are particularly valuable in urban environments where access to natural settings may be limited. Even small interventions—a living wall, a carefully framed view of the sky, or the strategic use of natural materials—can have significant positive impacts on occupant wellbeing.",
        ],
      },
    ],
  },
  {
    id: 3,
    title: "Blending Traditional and Modern: A Case Study",
    excerpt:
      "How we integrated traditional Indonesian architectural elements with contemporary design in a recent project.",
    image: "/blog/blog-3.png",
    date: "March 12, 2023",
    author: "Rafly Kurnia",
    authorImage: "/team/person-1.png",
    authorRole: "Principal Architect",
    slug: "blending-traditional-modern",
    category: "Case Study",
    tags: ["Indonesian Architecture", "Contemporary Design", "Cultural Heritage", "Residential"],
    series: {
      id: "indonesian-architecture",
      title: "Indonesian Architecture",
      order: 1,
      description: "Part 1 of our series on Indonesian architectural traditions and contemporary applications.",
    },
    shareCount: 27,
    content: [
      "In an era of global design influences, maintaining cultural identity while embracing contemporary functionality presents both a challenge and an opportunity. Our recent residential project in Bali exemplifies how traditional architectural elements can harmonize with modern design to create spaces that are both culturally rooted and suited to contemporary living.",
      "The clients, a couple with international backgrounds but deep connections to Indonesian heritage, wanted a home that would reflect their cultural values while providing the comfort and efficiency of modern design. This case study explores our approach to this balance and the outcomes achieved.",
    ],
    sections: [
      {
        title: "Project Context and Challenges",
        content: [
          "The site, located on a gently sloping plot with views of rice terraces, presented natural opportunities to incorporate traditional Balinese concepts of spatial organization. However, the clients' lifestyle required open, flexible spaces rather than the more compartmentalized layouts typical of traditional homes.",
          "Additionally, the tropical climate demanded effective passive cooling strategies, while the clients' environmental values called for sustainable systems and materials. Our challenge was to honor traditional forms and principles while adapting them to these contemporary requirements.",
          "The project also needed to balance privacy with openness to the landscape. Traditional Balinese architecture often uses walls and courtyards to create private spaces, but the clients wanted to maximize views and connections to the surrounding natural environment.",
        ],
        image: "/blog/traditional-modern-site.png",
      },
      {
        title: "Design Solutions",
        content: [
          "Our approach began with the fundamental concept of the traditional Balinese compound, where separate pavilions serve different functions within a unified landscape. Rather than replicating this literally, we reinterpreted it as a series of connected volumes with distinct characters, organized around a central courtyard.",
          "The roof forms draw directly from traditional Balinese architecture, with steeply pitched sections and extended eaves that provide shade and protection from tropical rains. However, we simplified the forms and used contemporary materials—primarily sustainable bamboo and recycled metal—to create a lighter, more modern aesthetic.",
          "For the interior spaces, we maintained the traditional emphasis on indoor-outdoor connections but expanded it with large sliding glass doors that can completely open living areas to adjacent terraces. This creates the flexibility to adjust the level of exposure to the elements based on weather conditions and privacy needs.",
        ],
      },
      {
        title: "Material Palette and Craftsmanship",
        content: [
          "Traditional Indonesian architecture is characterized by skilled craftsmanship and natural materials. We honored this tradition by incorporating locally sourced materials and working with local artisans wherever possible.",
          "The stone base of the building uses local volcanic rock, hand-cut and assembled using traditional techniques. Interior wood elements feature intricate carving patterns inspired by traditional motifs but simplified for a more contemporary feel. These handcrafted elements are complemented by modern materials like polished concrete floors and minimalist glass railings.",
          "The result is a material palette that feels simultaneously rooted in place and contemporary—neither a museum-like recreation of traditional architecture nor a generic international style that could exist anywhere.",
        ],
      },
      {
        title: "Outcomes and Lessons",
        content: [
          "The completed home successfully balances cultural references with contemporary living. The clients report that the spaces feel both familiar and fresh, honoring their heritage while supporting their modern lifestyle.",
          "From a sustainability perspective, the traditional elements have proven their enduring wisdom. The deep eaves and strategic orientation provide effective passive cooling, reducing reliance on air conditioning despite the tropical climate. The courtyard creates natural ventilation patterns that keep interior spaces comfortable.",
          "This project reinforced our belief that the dichotomy between traditional and modern is often false. The most successful architecture doesn't choose between honoring cultural heritage and embracing contemporary needs—it finds thoughtful ways to achieve both simultaneously.",
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Biophilic Design: Connecting Architecture with Nature",
    excerpt:
      "Exploring how incorporating natural elements into architectural design can improve wellbeing and productivity.",
    image: "/blog/blog-4.png",
    date: "February 28, 2023",
    author: "Aisha Putri",
    authorImage: "/team/person-4.png",
    authorRole: "Landscape Architect",
    slug: "biophilic-design",
    category: "Design Theory",
    tags: ["Biophilic Design", "Nature", "Wellbeing", "Sustainability"],
    series: {
      id: "spatial-psychology",
      title: "The Psychology of Space",
      order: 2,
      description: "Part 2 of our series on how architectural spaces affect human psychology.",
    },
    shareCount: 35,
    content: [
      "Biophilic design represents a fundamental shift in how we think about the relationship between built environments and the natural world. Rather than seeing buildings as separate from nature, this approach recognizes our innate connection to natural systems and deliberately incorporates natural elements and patterns into architectural design.",
      "The concept is rooted in the biophilia hypothesis, proposed by biologist E.O. Wilson, which suggests that humans possess an inherent tendency to seek connections with nature and other forms of life. Biophilic design translates this biological insight into architectural practice.",
    ],
    sections: [
      {
        title: "The Science Behind Biophilic Design",
        content: [
          "Research across multiple disciplines has demonstrated the profound physiological and psychological benefits of connecting with nature. Studies show that exposure to natural elements can lower blood pressure, reduce stress hormone levels, improve cognitive function, and enhance mood.",
          "In healthcare settings, patients with views of nature typically recover faster and require less pain medication than those facing brick walls. In workplaces, employees with access to natural light and views report higher job satisfaction and demonstrate greater productivity. In educational environments, students in classrooms with natural elements show improved learning outcomes and reduced absenteeism.",
          "These findings aren't surprising when we consider human evolutionary history. For most of our existence as a species, we lived in direct connection with the natural world. Our sensory systems, cognitive functions, and emotional responses evolved in natural environments—not in the artificial settings that characterize much of modern life.",
        ],
        image: "/blog/biophilic-science.png",
      },
      {
        title: "Key Elements of Biophilic Design",
        content: [
          "Biophilic design encompasses a range of strategies that can be broadly categorized into direct experiences of nature, indirect experiences, and spatial experiences that mimic natural conditions.",
          "Direct experiences include incorporating living elements like plants, water features, and natural light into buildings. Green walls, interior courtyards, and strategically placed windows that frame natural views all provide immediate connections to nature.",
          "Indirect experiences involve representations of nature, natural materials, and patterns that evoke natural forms. This might include wood and stone finishes, botanical motifs in decorative elements, or color palettes derived from natural landscapes.",
          "Spatial experiences focus on creating environments that reflect the qualities of natural settings. This could involve designing spaces with varying ceiling heights to create a sense of prospect and refuge (similar to the experience of being under a tree canopy with views to the horizon), incorporating transitional spaces like porches that mediate between indoors and outdoors, or ensuring that buildings provide a balance of stimulation and calm.",
        ],
      },
      {
        title: "Biophilic Design in Practice",
        content: [
          "At LEXIA, we integrate biophilic principles across our projects, from residential homes to commercial spaces. In a recent office project, we incorporated a central atrium with a living wall and skylight, bringing natural light and vegetation into the heart of the building. Conference rooms feature views to exterior landscaping, and break areas include water features that provide both visual interest and ambient sound.",
          "In residential projects, we prioritize indoor-outdoor connections, often designing rooms with multiple aspects to maximize natural light throughout the day. Material selections emphasize natural textures and patterns, creating sensory richness that synthetic materials rarely provide.",
          "The beauty of biophilic design is its scalability. While ambitious features like green roofs and extensive interior plantings make a dramatic impact, even small interventions can be meaningful. Something as simple as ensuring that workstations have views to the outdoors or incorporating natural materials in key touch points can significantly enhance the human experience of a space.",
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Small Spaces, Big Impact: Maximizing Limited Square Footage",
    excerpt: "Design strategies for making the most of small spaces without sacrificing functionality or aesthetics.",
    image: "/blog/blog-5.png",
    date: "January 17, 2023",
    author: "Maya Wijaya",
    authorImage: "/team/person-2.png",
    authorRole: "Interior Designer",
    slug: "small-spaces-big-impact",
    category: "Interior Design",
    tags: ["Small Spaces", "Interior Design", "Functionality", "Urban Living"],
    shareCount: 31,
    content: [
      "As urban populations grow and housing costs rise, many people find themselves living and working in increasingly compact spaces. While small-footprint living presents challenges, thoughtful design can transform even the most limited square footage into comfortable, functional, and beautiful environments.",
      "At LEXIA, we approach small spaces not as limitations but as opportunities for creative problem-solving. With the right strategies, compact spaces can be not just adequate but exceptional—offering efficiency, character, and quality of life that sometimes exceeds that of larger environments.",
    ],
    sections: [
      {
        title: "Multifunctionality: The Key to Small Space Design",
        content: [
          "Perhaps the most fundamental principle for small space design is multifunctionality—creating elements that serve multiple purposes. This might include a dining table that doubles as a work surface, a sofa that converts to a guest bed, or stairs with integrated storage drawers.",
          "In a recent apartment renovation project, we designed a custom wall unit that incorporates a fold-down desk, media storage, display shelving, and a concealed murphy bed. During the day, the space functions as a comfortable living room and home office; at night, it transforms into a bedroom without requiring any furniture to be moved.",
          "The key to successful multifunctional design is ensuring that transitions between functions are seamless and intuitive. Elements should be easy to reconfigure without feeling like compromised versions of single-purpose items.",
        ],
        image: "/blog/small-spaces-multifunctional.png",
      },
      {
        title: "Visual Strategies for Spaciousness",
        content: [
          "Beyond physical functionality, the perception of space plays a crucial role in how comfortable small environments feel. Several visual strategies can make compact areas feel more expansive and open.",
          "Maintaining clear sightlines across the space helps prevent feelings of confinement. Where possible, we recommend open-plan arrangements with thoughtful delineation of zones through changes in flooring, lighting, or ceiling treatment rather than full-height walls.",
          "Reflective surfaces strategically placed to bounce light and create visual expansion can dramatically impact spatial perception. Mirrors positioned opposite windows not only amplify natural light but also create the illusion of additional space and views.",
          "Color and material selection significantly influences spatial perception. While the conventional wisdom that light colors make spaces feel larger holds some truth, we find that a more nuanced approach often works better. Strategic use of deeper colors on certain walls can actually create depth, while maintaining lighter tones on other surfaces to reflect light.",
        ],
      },
      {
        title: "Storage Solutions: The Hidden Challenge",
        content: [
          "Inadequate storage is often the greatest challenge in small spaces, leading to clutter that makes even reasonably sized rooms feel cramped and chaotic. Effective small space design requires a comprehensive storage strategy that maximizes every available cubic inch.",
          "Vertical space is frequently underutilized. We often design storage that extends to the ceiling, using the highest areas for less frequently accessed items. In a recent project with 2.7-meter ceilings, we created a continuous band of cabinetry around the upper perimeter of the main living space, providing substantial storage without encroaching on the functional floor area.",
          "Furniture with integrated storage—beds with drawers underneath, ottomans with interior compartments, sofas with storage in the arm rests—multiplies functionality without requiring additional floor space. Custom solutions that utilize typically wasted spaces, like the void under stairs or the full height of a wall, can yield surprising amounts of storage capacity.",
        ],
      },
      {
        title: "Quality Over Quantity",
        content: [
          "Perhaps counterintuitively, small spaces often benefit from fewer, higher-quality elements rather than numerous smaller pieces. A single exceptional design feature—be it a striking light fixture, a custom built-in element, or a carefully selected piece of furniture—can become a focal point that defines the character of the space.",
          "Material quality takes on heightened importance in compact environments, where every surface is constantly visible and within reach. Investing in authentic, tactile materials that age beautifully—natural wood, real stone, quality textiles—creates a sensory richness that can make even the smallest spaces feel luxurious and substantial.",
          "This principle extends to furniture as well. In small spaces, each piece needs to earn its place through both functionality and aesthetic contribution. We often advise clients to invest in fewer, better pieces rather than filling the space with mediocre items that create visual clutter.",
        ],
      },
    ],
  },
  {
    id: 6,
    title: "The Future of Urban Housing in Indonesia",
    excerpt: "Examining trends and innovations that will shape residential architecture in Indonesian cities.",
    image: "/blog/blog-6.png",
    date: "December 5, 2022",
    author: "Rafly Kurnia",
    authorImage: "/team/person-1.png",
    authorRole: "Principal Architect",
    slug: "future-urban-housing-indonesia",
    category: "Urban Planning",
    tags: ["Urban Housing", "Indonesia", "Future Trends", "Sustainability"],
    series: {
      id: "indonesian-architecture",
      title: "Indonesian Architecture",
      order: 2,
      description: "Part 2 of our series on Indonesian architectural traditions and contemporary applications.",
    },
    shareCount: 24,
    content: [
      "Indonesia's cities are experiencing unprecedented growth, with urbanization rates among the highest in Southeast Asia. Jakarta alone is projected to become a megacity of over 35 million residents by 2030. This rapid urban expansion creates both challenges and opportunities for residential architecture and urban planning.",
      "As architects working in this dynamic context, we're constantly considering how housing can evolve to meet changing needs while addressing pressing issues like density, affordability, climate resilience, and cultural continuity. This article explores emerging trends and innovations that we believe will shape the future of urban housing in Indonesia.",
    ],
    sections: [
      {
        title: "Vertical Communities, Not Just Vertical Housing",
        content: [
          "As land prices in Indonesian cities continue to rise, vertical development is inevitable. However, the future of urban housing lies not just in building upward but in creating vertical communities that maintain the social connections and shared spaces that characterize traditional Indonesian neighborhoods.",
          "We're seeing promising examples of high-rise developments that incorporate communal gardens, shared kitchens, and flexible gathering spaces distributed throughout the building rather than limited to the ground floor. These designs recognize that the kampung spirit—the strong sense of community found in traditional Indonesian neighborhoods—can be translated to vertical formats with thoughtful planning.",
          "Future developments will likely feature more mixed-use programming, with residential units integrated with workspaces, educational facilities, and commercial areas. This approach reduces commuting needs while creating more vibrant, 24-hour environments that better reflect the complexity of urban life.",
        ],
        image: "/blog/urban-housing-vertical.png",
      },
      {
        title: "Climate Adaptation and Resilience",
        content: [
          "Indonesia's vulnerability to climate change impacts—from rising sea levels to increased flooding and extreme heat events—necessitates a fundamental shift in how we design residential architecture. Future housing will need to be not just sustainable but actively resilient to changing conditions.",
          "We anticipate greater emphasis on passive cooling strategies that reduce reliance on air conditioning, which is both energy-intensive and vulnerable to power outages during extreme weather events. Contemporary reinterpretations of traditional ventilation techniques, like the cross-ventilated layouts of Javanese houses, will become increasingly valuable.",
          "Water management will be critical, with buildings designed to harvest, store, and reuse rainwater while also accommodating periodic flooding through elevated ground floors, waterproof materials, and electrical systems located above potential flood levels. In coastal areas, we may see more floating or amphibious housing that can rise with water levels during flood events.",
        ],
      },
      {
        title: "Flexibility and Adaptability",
        content: [
          "The COVID-19 pandemic accelerated awareness of how housing needs can change rapidly, with homes suddenly required to function as workplaces, schools, exercise spaces, and more. This experience has highlighted the value of flexible, adaptable housing that can evolve with changing circumstances.",
          "Future housing designs will likely feature more modular approaches, with movable partitions and multifunctional spaces that can be reconfigured throughout the day or as family needs change over time. We may also see more core-and-shell approaches, where developers provide the basic structure and systems while residents have greater freedom to customize internal layouts.",
          "Intergenerational living arrangements remain important in Indonesian culture, but their form is evolving. Rather than the traditional extended family home, we anticipate more developments with a mix of unit types within the same building, allowing family members to live independently while maintaining proximity and the ability to provide mutual support.",
        ],
      },
      {
        title: "Technology Integration and Smart Housing",
        content: [
          "Indonesia has one of the highest rates of technology adoption in Southeast Asia, with mobile internet penetration exceeding 70% of the population. This digital fluency creates opportunities for smart housing solutions that enhance convenience, efficiency, and sustainability.",
          "Beyond basic home automation, we expect to see more sophisticated systems that optimize energy and water usage based on occupancy patterns and environmental conditions. Community-scale solutions, like microgrids with shared renewable energy generation and storage, may become more common as technology costs decrease.",
          "Digital platforms that facilitate community interaction and resource sharing—from tool libraries to childcare arrangements—can help strengthen social connections within housing developments. These technological solutions work best when they support rather than replace face-to-face interaction, complementing thoughtfully designed physical spaces for community gathering.",
        ],
      },
    ],
  },
  {
    id: 7,
    title: "Passive Design Strategies for Tropical Climates",
    excerpt: "Exploring effective passive cooling and ventilation techniques for hot and humid environments.",
    image: "/blog/blog-7.png",
    date: "November 10, 2022",
    author: "Rafly Kurnia",
    authorImage: "/team/person-1.png",
    authorRole: "Principal Architect",
    slug: "passive-design-tropical-climates",
    category: "Sustainability",
    tags: ["Passive Design", "Tropical Architecture", "Sustainability", "Climate Response"],
    series: {
      id: "sustainable-design",
      title: "Sustainable Design Series",
      order: 2,
      description: "Part 2 of our series on sustainable architecture and design practices.",
    },
    shareCount: 29,
    content: [
      "In tropical climates, where high temperatures and humidity persist year-round, thoughtful passive design strategies can dramatically reduce energy consumption while creating comfortable living environments. These approaches draw on both traditional wisdom and contemporary understanding of building physics.",
      "At LEXIA, our work in Indonesia and other tropical regions has reinforced our belief that climate-responsive design must be the foundation of sustainable architecture. Mechanical cooling should supplement, not replace, passive strategies that work with the local climate.",
    ],
    sections: [
      {
        title: "Orientation and Solar Control",
        content: [
          "Building orientation is perhaps the most fundamental passive design decision in tropical climates. Ideally, the building's long axis should run east-west to minimize exposure to the harsh morning and afternoon sun. When site constraints don't allow for optimal orientation, other solar control strategies become even more critical.",
          "Deep roof overhangs, verandas, and covered walkways provide essential shade while allowing for outdoor living spaces that capture breezes. These transitional spaces between indoors and outdoors are characteristic of traditional tropical architecture across cultures for good reason—they create comfortable microclimate zones that expand usable living area without increasing energy consumption.",
          "Vertical shading elements like fins, screens, and vegetation can be particularly effective for east and west facades, where low-angle sun is difficult to block with horizontal overhangs alone. These elements can be designed as architectural features that contribute to the building's aesthetic while performing crucial environmental functions.",
        ],
        image: "/blog/tropical-orientation.png",
      },
      {
        title: "Natural Ventilation Strategies",
        content: [
          "Effective cross-ventilation is essential in tropical climates to remove heat and humidity from interior spaces. This requires careful consideration of prevailing wind patterns and thoughtful placement of openings to create pressure differentials that drive airflow through the building.",
          "Traditional tropical homes often feature high ceilings that allow hot air to rise above the occupied zone. Combined with high-level openings, this creates a stack effect that draws cooler air in through lower openings while exhausting warm air at the top. Contemporary interpretations might include double-height spaces with clerestory windows or ventilated roof designs.",
          "Courtyards and atria can serve as thermal chimneys, drawing air through surrounding spaces as the sun heats the courtyard air. When combined with water features or vegetation, these spaces can also help cool incoming air through evaporation and transpiration.",
        ],
      },
      {
        title: "Material Selection for Thermal Performance",
        content: [
          "In tropical climates, materials should be selected not just for their insulative properties but for their thermal mass and time lag characteristics. The goal is often to moderate temperature swings rather than to completely block heat transfer, as would be the case in more extreme climates.",
          "Traditional materials like thick masonry walls work well in tropical climates because they absorb heat during the day and release it slowly, helping to maintain more stable interior temperatures. Contemporary materials and assemblies can achieve similar performance while addressing other considerations like construction efficiency and resource use.",
          "Roof design and materials deserve special attention in tropical climates, as the roof typically receives the most intense solar radiation. Reflective surfaces, ventilated roof cavities, and insulation layers can significantly reduce heat gain through the roof, which is often the primary source of overheating in tropical buildings.",
        ],
      },
      {
        title: "Landscape Integration",
        content: [
          "The landscape surrounding a building plays a crucial role in passive cooling strategies. Vegetation can provide shade, reduce ground temperature through evapotranspiration, and help channel breezes toward the building.",
          "Strategic placement of trees can shade vulnerable facades and outdoor spaces while allowing beneficial winter sun in regions with seasonal variations. Deciduous trees are particularly valuable in transitional climate zones, providing shade in summer and allowing solar gain in winter.",
          "Water features can contribute to cooling through evaporation, though in very humid climates their effectiveness is limited. In these contexts, moving water may be more valuable for its psychological cooling effect and acoustic properties, masking unwanted noise and creating a sense of tranquility.",
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
