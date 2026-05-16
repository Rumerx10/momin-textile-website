// app/dashboard/page.jsx
import QuotationRequest from "../QuotationRequest";
import DashboardQuickAnalysis from "./DashboardQuickAnalysis";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
      <DashboardQuickAnalysis />
      <QuotationRequest />
    </div>
  );
};

export default Dashboard;