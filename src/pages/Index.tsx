import { useState } from "react";
import Proposition1 from "@/components/mockup/Proposition1";
import Proposition2 from "@/components/mockup/Proposition2";

const Index = () => {
  const [activeTab, setActiveTab] = useState<1 | 2>(1);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(220, 20%, 8%)" }}>
      {/* Tab switcher */}
      <div className="flex items-center justify-center gap-2 py-4 px-4">
        <div className="flex rounded-lg overflow-hidden" style={{ background: "hsl(220, 16%, 14%)", border: "1px solid hsl(220, 14%, 20%)" }}>
          <button
            onClick={() => setActiveTab(1)}
            className="px-5 py-2.5 text-sm font-medium transition-colors"
            style={{
              background: activeTab === 1 ? "hsl(217, 91%, 55%)" : "transparent",
              color: activeTab === 1 ? "white" : "hsl(220, 10%, 55%)",
            }}
          >
            Proposition 1 — Sidebar
          </button>
          <button
            onClick={() => setActiveTab(2)}
            className="px-5 py-2.5 text-sm font-medium transition-colors"
            style={{
              background: activeTab === 2 ? "hsl(217, 91%, 55%)" : "transparent",
              color: activeTab === 2 ? "white" : "hsl(220, 10%, 55%)",
            }}
          >
            Proposition 2 — Chip dans l'input
          </button>
        </div>
      </div>

      {/* Mockup */}
      <div className="flex-1 px-4 pb-4">
        <div className="h-[calc(100vh-80px)]">
          {activeTab === 1 ? <Proposition1 /> : <Proposition2 />}
        </div>
      </div>
    </div>
  );
};

export default Index;
