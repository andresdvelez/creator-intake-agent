import { Header } from "@/components/layout/Header";
import { ReviewWorkspace } from "@/components/review/ReviewWorkspace";

export default function Page() {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header />
      <div className="flex-1 overflow-hidden">
        <ReviewWorkspace />
      </div>
    </div>
  );
}
