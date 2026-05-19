import {
  Mail,
  Phone,
  Calendar,
  MapPin,
  User,
  Settings,
  Home,
  Info,
  Building2,
  Package,
  Wrench,
  AlertCircle,
  Award,
  MessageSquare,
  Newspaper,
  Users,
  Globe,
  FileText,
  Briefcase,
} from "lucide-react";
import { RiUserSettingsLine } from "react-icons/ri";
export const NavLinks = [
  { label: "Home", link: "/" },
  { label: "About Us", link: "/about-us" },
  { label: "Our Products", link: "/our-products" },
  {
    label: "Our Unit",
    link: "/our-unit",
    links: [
      { label: "Spinning Unit", link: "/our-units/spinning-unit" },
      {
        label: "Woven Dyeing & Finishing",
        link: "/our-units/woven-dyeing-finishing",
      },
      {
        label: "Fabric Manufacturing",
        link: "/our-units/fabric-manufacturing",
      },
    ],
  },

  { label: "Certifications", link: "/certifications" },
  { label: "Our Concerns", link: "/our-concerns" },
  {
    label: "Our Services",
    link: "/our-services",
    links: [
      { label: "General Services", link: "/our-services" },
      {
        label: "ETP Service",
        link: "/our-services/etp-service",
      },
      {
        label: "Our Laboratory",
        link: "/our-services/our-laboratory",
      },
    ],
  },
  {
    label: "Others",
    link: "/others",
    links: [
      { label: "Media Gallery", link: "/media-gallery" },
      { label: "News & Events", link: "/news-events" },
      { label: "Career Opportunities", link: "/career-opportunities" },
      { label: "Our Clients", link: "/our-clients" },
      { label: "Quotation Request", link: "/quotation-request" },
      { label: "Foreign Branches", link: "/foreign-branches" },
    ],
  },
  { label: "Contact Us", link: "/contact-us" },
];

export const FooterLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", link: "/" },
      { label: "About Us", link: "/about-us" },
      { label: "Our Products", link: "/our-products" },
      { label: "Our Unit", link: "/our-unit" },
      { label: "Certifications", link: "/certifications" },
      { label: "Our Concerns", link: "/our-concerns" },
      { label: "Our Services", link: "/our-services" },
      { label: "Contact Us", link: "/contact-us" },
    ],
  },
  {
    title: "Our Units",
    links: [
      { label: "Spinning Unit", link: "/our-units/spinning-unit" },
      {
        label: "Woven Dyeing & Finishing",
        link: "/our-units/woven-dyeing-finishing",
      },
      {
        label: "Fabric Manufacturing",
        link: "/our-units/fabric-manufacturing",
      },
    ],
  },
  {
    title: "Our Services",
    links: [
      { label: "General Services", link: "/our-services" },
      {
        label: "Effluent Treatment Plant (ETP)",
        link: "/our-services/etp-service",
      },
      { label: "Our Laboratory", link: "/our-services/our-laboratory" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Media Gallery", link: "/media-gallery" },
      { label: "News & Events", link: "/news-events" },
      { label: "Career Opportunities", link: "/career-opportunities" },
      { label: "Our Clients", link: "/our-clients" },
      { label: "Quotation Request", link: "/quotation-request" },
      { label: "Foreign Branches", link: "/foreign-branches" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", link: "/privacy-policy" },
      { label: "Terms & Conditions", link: "/terms-conditions" },
      { label: "Cookie Policy", link: "/cookie-policy" },
      { label: "Data Security Policy", link: "/data-security-policy" },
    ],
  },
];

export const CoreValuesData = [
  {
    img: "/quality.png",
    title: "Commitment to Quality",
    desc: "Every process, from yarn selection to final finishing, reflects our dedication to precision, durability, and consistency.",
  },
  {
    img: "/sustainability.png",
    title: "Sustainability in Every Thread",
    desc: "Our eco-conscious dyeing systems, efficient water management, and ethical practices make sustainability an integral part of our identity",
  },
  {
    img: "/trust.png",
    title: "Partnership Built on Trust",
    desc: "We see every client, vendor, and employee as a long-term partner, working together to create value, deliver excellence",
  },
];

export const QualityNSustainabilityData = [
  {
    img: "/quality2.png",
    title: "Quality Control",
    desc: "In Bangladesh power shortage is a big concern, We can use self-power by our OWN GAS  Generator. In Bangladesh power shortage is a big concern, We can use self-power by our OWN GAS  Generator. ",
  },
  {
    img: "/eco.png",
    title: "Eco-Friendly",
    desc: "In Bangladesh power shortage is a big concern, We can use self-power by our OWN GAS  Generator. In Bangladesh power shortage is a big concern, We can use self-power by our OWN GAS  Generator. In Bangladesh power shortage is a big concern, We can use self-power by our OWN GAS  Generator. ",
  },
  {
    img: "/certified.png",
    title: "Certified Standard",
    desc: "In Bangladesh power shortage is a big concern, We can use self-power by our OWN GAS  Generator.  In Bangladesh power shortage is a big concern, We can use self-power by our OWN GAS  Generator.",
  },
];

export const Certifications1 = [
  "/certificate1.png",
  "/certificate2.png",
  "/certificate3.png",
  "/certificate4.png",
  "/certificate5.png",
  "/certificate6.png",
];
export const Certifications2 = [
  "/certificate7.png",
  "/certificate8.png",
  "/certificate9.png",
];

export const OurUtilityServiceData = [
  {
    img: "/power.png",
    title: "Power",
    subTitle: "Reliable Energy for Seamless Production",
    desc: "At Momin Textile Mills Ltd, uninterrupted power supply is the backbone of our operations. Our facilities are equipped with dedicated generators and energy-efficient systems.",
  },
  {
    img: "/vehicle.png", // Assuming filename based on content
    title: "Vehicle",
    subTitle: "Efficient Transportation, On-Time Delivery",
    desc: "Our logistics division operates a well-maintained fleet of transport vehicles designed to ensure smooth movement of raw materials and finished fabrics. With an organized scheduling system and professional.",
  },
  {
    img: "/employee.png", // Assuming filename based on content
    title: "Employee",
    subTitle: "People Are the Fabric of Our Success",
    desc: "Behind every meter of fabric we produce stands a dedicated team of professionals skilled engineers, operators, designers, and supervisors all working toward a shared goal of excellence.",
  },
  {
    img: "/training.png", // Assuming filename based on content
    title: "Training",
    subTitle: "Empowering People Through Knowledge",
    desc: "At Momin Textile Mills Ltd, we believe that growth begins with learning. Our training programs are designed to upgrade skills, enhance technical expertise, and promote leadership at every level of the organization.",
  },
];

export const CompaniesData = [
  "/company1.png",
  "/company2.png",
  "/company3.png",
  "/company4.png",
  "/company5.png",
  "/company6.png",
];

export const COUNTRY_CODES = [
  { code: "BD", name: "Bangladesh", phone: "+880", phoneLength: 10 },
  { code: "SRI", name: "Sri Lanka", phone: "+94", phoneLength: 9 },
  { code: "US", name: "United States", phone: "+1", phoneLength: 10 },
  { code: "GB", name: "United Kingdom", phone: "+44", phoneLength: 10 },
  { code: "IN", name: "India", phone: "+91", phoneLength: 10 },
  { code: "PK", name: "Pakistan", phone: "+92", phoneLength: 10 },
  { code: "AU", name: "Australia", phone: "+61", phoneLength: 9 },
  { code: "CA", name: "Canada", phone: "+1", phoneLength: 10 },
  { code: "DE", name: "Germany", phone: "+49", phoneLength: 11 },
  { code: "FR", name: "France", phone: "+33", phoneLength: 9 },
  { code: "JP", name: "Japan", phone: "+81", phoneLength: 10 },
];
export const contentMenuItems = [
  {
    icon: Home, // No < > brackets, no className
    label: "Home",
    href: "/dashboard/home",
  },
  {
    icon: Info,
    label: "About Us",
    href: "/dashboard/about-us",
  },
  {
    icon: Building2,
    label: "Company Profile",
    href: "/dashboard/company-profile",
  },
  {
    icon: Package,
    label: "Our Units",
    href: "/dashboard/our-units",
  },
  {
    icon: RiUserSettingsLine,
    label: "Members",
    href: "/dashboard/members",
  },
  {
    icon: Package,
    label: "Our Products",
    href: "/dashboard/our-products",
  },
  {
    icon: Wrench,
    label: "Our Services",
    href: "/dashboard/our-services",
  },
  {
    icon: AlertCircle,
    label: "Our Concerns",
    href: "/dashboard/our-concerns",
  },
  {
    icon: Award,
    label: "Certifications",
    href: "/dashboard/certifications",
  },
  {
    icon: MessageSquare,
    label: "Contact Us",
    href: "/dashboard/contact-us",
  },
];

export const sidebarConfig = [
  {
    title: "Query Section",
    items: [
      { icon: Home, label: "Dashboard", href: "/dashboard" },
      {
        icon: FileText,
        label: "Quotation Request",
        href: "/dashboard/quotation-request",
      },
      {
        icon: Globe,
        label: "Foreign Branches",
        href: "/dashboard/foreign-branches",
      },
      {
        icon: MessageSquare,
        label: "Contact & Support",
        href: "/dashboard/support",
      },
    ],
  },
  {
    title: "Utility Section",
    items: [
      { icon: Settings, label: "Machines", href: "/dashboard/machines" },
      { icon: Briefcase, label: "Media", href: "/dashboard/media" },
      { icon: Newspaper, label: "News & Events", href: "/dashboard/news" },
      { icon: Briefcase, label: "Career", href: "/dashboard/career" },
      { icon: Users, label: "Our Clients", href: "/dashboard/clients" },
    ],
  },
];
