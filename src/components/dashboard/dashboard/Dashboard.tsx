
import QuotationRequest from "../QuotationRequest";
import DashboardQuickAnalysis from "./DashboardQuickAnalysis";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-6">
      <DashboardQuickAnalysis />
      <QuotationRequest />
    </div>
  );
};

export default Dashboard;
