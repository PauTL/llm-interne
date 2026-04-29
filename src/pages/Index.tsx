import { useState } from "react";
import Proposition1 from "@/components/mockup/Proposition1";
import PropositionStepper from "@/components/mockup/Proposition_Stepper";
import PropositionCards from "@/components/mockup/Proposition_Cards";

type Variant = "drawer" | "stepper" | "cards";

const variants: { id: Variant; label: string; description: string }[] = [
  { id: "drawer", label: "1 · Drawer latéral", description: "Bouton 'Bonnes pratiques' → panneau à droite" },
  { id: "stepper", label: "2 · Modale guidée", description: "Tutoriel étape par étape en 4 slides" },
  { id: "cards", label: "3 · Cartes in-chat", description: "Suggestions directement dans la zone de chat" },
];

const Index = () => {
  const [variant, setVariant] = useState<Variant>("drawer");

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "hsl(220, 20%, 8%)" }}>
      {/* Variant switcher */}
      <div className="px-4 pt-4">
        <div
          className="flex items-center gap-2 rounded-xl p-1.5"
          style={{ background: "hsl(220, 18%, 11%)", border: "1px solid hsl(220, 14%, 18%)" }}
        >
          {variants.map((v) => {
            const active = variant === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setVariant(v.id)}
                className="flex-1 text-left rounded-lg px-3 py-2 transition-all"
                style={{
                  background: active ? "hsl(220, 16%, 16%)" : "transparent",
                  border: active ? "1px solid hsl(220, 14%, 24%)" : "1px solid transparent",
                }}
              >
                <div
                  className="text-xs font-semibold"
                  style={{ color: active ? "hsl(220, 14%, 95%)" : "hsl(220, 10%, 65%)" }}
                >
                  {v.label}
                </div>
                <div className="text-[11px]" style={{ color: "hsl(220, 10%, 50%)" }}>
                  {v.description}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 px-4 pt-3 pb-4">
        <div className="h-[calc(100vh-110px)]">
          {variant === "drawer" && <Proposition1 />}
          {variant === "stepper" && <PropositionStepper />}
          {variant === "cards" && <PropositionCards />}
        </div>
      </div>
    </div>
  );
};

export default Index;
