import Policy from "@/src/components/main/policy/Policy";

const page = () => {
  const sections = [
    {
      title: "A Major Step Toward Innovation and Global Quality Standards",
      content:
        "Momin Textile Mills Ltd has taken another bold stride in its journey toward innovation and excellence by expanding its dyeing unit with advanced European machinery. This significant investment reflects the company's long-term commitment to meeting international quality benchmarks and enhancing production efficiency for global clients. The new installation includes state-of-the-art dyeing and color management systems that ensure precision, consistency, and sustainable operation across all manufacturing processes.",
    },
    {
      title: "Meeting Rising Global Demand for Quality and Capacity",
      content:
        "The global apparel market is rapidly evolving, with rising expectations for faster lead times, customized color solutions, and environmentally responsible production. To meet these growing demands, Momin Textile Mills Ltd recognized the importance of expanding its dyeing capacity while maintaining the highest level of color accuracy and product uniformity. The newly upgraded dyeing unit features automated dosing systems, advanced color calibration software, and real-time process monitoring — enabling the company to achieve exceptional precision in shade matching and color stability. This expansion allows Momin Textile to handle larger orders from its international clientele while ensuring consistent quality across every fabric roll. Moreover, the automation and efficiency gains help reduce energy usage and water consumption, contributing to the company's sustainability goals.",
    },
    {
      title: "Empowering Local Expertise with Global Technology",
      content:
        "The integration of European machinery has also opened new opportunities for skill development within the workforce. Engineers, technicians, and operators at Momin Textile Mills Ltd underwent specialized training programs conducted jointly by local and foreign experts to ensure optimal use of the new equipment. This initiative bridges the gap between local craftsmanship and global technological standards. The management team believes that empowering employees with modern tools and technical knowledge not only boosts productivity but also enhances job satisfaction and long-term retention. This people-centric approach remains a cornerstone of Momin Textile's growth philosophy, ensuring that every team member plays a vital role in the company's ongoing success story.",
    },
    {
      title: "Strengthening Sustainability and Environmental Responsibility",
      content:
        "Sustainability remains one of the core pillars of Momin Textile's long-term strategy. The new dyeing machines are designed to minimize chemical waste, optimize water usage, and lower carbon emissions. The company has also upgraded its Effluent Treatment Plant (ETP) to ensure that all wastewater meets international environmental compliance standards before discharge. By investing in cleaner and more efficient machinery, Momin Textile Mills Ltd demonstrates its proactive role in promoting eco-conscious manufacturing practices in Bangladesh's textile industry. The dyeing expansion aligns perfectly with the company's 'Green Fabric Initiative,' which focuses on producing environmentally friendly textiles for international markets. This step strengthens Momin Textile's position as a responsible manufacturer that values both product quality and planetary health.",
    },
  ];

  const corePoints = [
    "Momin Textile's newly installed European dyeing machines incorporate advanced automation systems that regulate temperature, chemical dosing, and time cycles with unmatched accuracy.",
    "The dyeing expansion project was made possible through collaboration with leading European machinery suppliers. Alongside technology transfer, the project included staff training sessions that equipped employees with specialized technical expertise. This synergy between global innovation and local skill enables Momin Textile to maintain a competitive edge and strengthen Bangladesh's reputation as a global textile hub.",
    "The upgraded dyeing unit integrates eco-efficient solutions that reduce energy and water consumption by up to 30%.",
    "This strategic expansion allows Momin Textile to take on larger export orders with improved turnaround times. Clients can expect higher consistency, faster color development, and superior quality control.",
  ];

  return (
    <Policy title="Data Security Policy" sections={sections} corePoints={corePoints} />
  );
};

export default page;
