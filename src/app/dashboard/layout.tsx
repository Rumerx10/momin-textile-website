import QueryClientWrapper from "@/api/QueryClientWrapper";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <QueryClientWrapper>{children}</QueryClientWrapper>
    </div>
  );
};

export default layout;
