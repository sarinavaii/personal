export type ProjectId = "empire-club" | "deadinv" | "platin" | "bonyad-maskan" | "rasad" | "meymed";

export type Project = {
    id: ProjectId;
    title: string;
    category: string;
    description: string;
    website: string;
    gallery: string[];
};

export const PROJECTS: Project[] = [
    {
        id: "empire-club",
        title: "Empire Club of Canada",
        category: "Membership platform",
        description:
            "Built a member platform for one of Canada's oldest and most distinguished speakers' forums, enabling members to renew memberships, access exclusive information, and purchase or reserve event tickets.",
        website: "https://empireclubofcanada.com/",
        gallery: [
            "/images/projects/empireclub/empire (2).webp",
            "/images/projects/empireclub/empire (3).webp",
            "/images/projects/empireclub/empire (4).webp",
            "/images/projects/empireclub/empire (1).webp",
        ],
    },
    {
        id: "deadinv",
        title: "DeadInv",
        category: "E-commerce",
        description:
            "Built an e-commerce marketplace for roofing and flooring materials, connecting buyers and sellers with listing, checkout, and promotional pricing — structured to grow into broader building-products categories.",
        website: "https://www.deadinv.com/",
        gallery: ["/images/projects/dis/dis (1).webp", "/images/projects/dis/dis (2).webp"],
    },
    {
        id: "platin",
        title: "Platin Agency",
        category: "Agency website",
        description:
            "Frontend work on Platin's marketing website and related digital deliverables — responsive pages, campaign and service sections, and iterative releases while working with design and communications on an agency that handles branding, campaigns, and client projects at scale.",
        website: "https://platin.agency/",
        gallery: [],
    },
    {
        id: "bonyad-maskan",
        title: "Bonyad Maskan e-Services",
        category: "Public services",
        description:
            "Frontend work on the housing foundation's public e-services portal — large-audience, citizen-facing flows, service discovery, and resilient UI for housing-related programs and online requests at national scale.",
        website: "http://eservices.bonyadmaskan.ir/",
        gallery: [],
    },
    {
        id: "rasad",
        title: "Rasad (Bonyad Maskan)",
        category: "BI dashboard",
        description:
            "Built and maintained a BI dashboard for Bonyad Maskan's upper management — dense analytics views, KPIs, and many chart-heavy screens fed by live and aggregated data, with emphasis on clarity at a glance and stable performance under heavy datasets.",
        website: "https://rasad.bonyadmaskan.ir/",
        gallery: [],
    },
    {
        id: "meymed",
        title: "Meymed",
        category: "Healthcare e-commerce",
        description:
            "An online shop specializing in medical supplies and equipment for healthcare professionals and individuals.",
        website: "https://www.meymed.com/",
        gallery: [
            "/images/projects/meymed/meymed (1).webp",
            "/images/projects/meymed/meymed (2).webp",
            "/images/projects/meymed/meymed (3).webp",
        ],
    },
];
