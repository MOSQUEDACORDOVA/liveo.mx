import { Provider } from "react-redux";
import store from "../features/store.ts";
import { ReactNode } from "react";
import { QueryClientProvider } from "react-query";
import queryClient from "@/config/query-client.ts";

const MainProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>{children}</Provider>
    </QueryClientProvider>
  );
};

export default MainProviders;
