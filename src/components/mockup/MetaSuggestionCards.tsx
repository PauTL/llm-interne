import { Megaphone, Target, Users, Sparkles, HelpCircle, Lightbulb, ChevronRight } from "lucide-react";
import { useState } from "react";

interface MetaSuggestionCardsProps {
  onUsePrompt?: (prompt: string) => void;
  onOpenFullGuide?: () => void;
}

const META_COLOR = "#9900FF";

const tips = [
  {
    icon: Target,
    title: "Soyez précis sur l'objectif",
    desc: "Notoriété, trafic ou conversions ?",
  },
  {
    icon: Users,
    title: "Décrivez votre audience",
    desc: "Âge, localisation, centres d'intérêt",
  },
  {
    icon: Sparkles,
    title: "Indiquez budget & durée",
    desc: "Pour un plan média réaliste",
  },
];

const examplePrompts = [
  "Crée une campagne conversions, budget 5000€, audience F 25-40 FR, collection été.",
  "Génère 3 variations de créatives pour un retargeting des visiteurs des 30 derniers jours.",
  "Analyse ma dernière campagne et propose 3 optimisations concrètes.",
];

const MetaSuggestionCards = ({ onUsePrompt, onOpenFullGuide }: MetaSuggestionCardsProps) => {
  const [hoveredPrompt, setHoveredPrompt] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto w-full px-6 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ backgroundColor: META_COLOR, boxShadow: `0 8px 32px ${META_COLOR}40` }}
        >
          <Megaphone className="w-7 h-7 text-white" />
        </div>
        <h2 className="text-xl font-semibold mb-1.5" style={{ color: "hsl(220, 14%, 92%)" }}>
          Assistant META
        </h2>
        <p className="text-sm" style={{ color: "hsl(220, 10%, 60%)" }}>
          Créez et optimisez vos campagnes en langage naturel
        </p>
      </div>

      {/* Tips row */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" style={{ color: META_COLOR }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 14%, 75%)" }}>
              Bonnes pratiques
            </span>
          </div>
          <button
            onClick={onOpenFullGuide}
            className="text-xs font-medium flex items-center gap-1 transition-colors"
            style={{ color: META_COLOR }}
          >
            Voir le guide complet
            <ChevronRight className="w-3 h-3" />
          </button>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {tips.map((tip, i) => {
            const Icon = tip.icon;
            return (
              <div
                key={i}
                className="rounded-xl p-3 transition-all"
                style={{
                  background: "hsl(220, 16%, 15%)",
                  border: "1px solid hsl(220, 14%, 22%)",
                }}
              >
                <Icon className="w-4 h-4 mb-2" style={{ color: META_COLOR }} />
                <div className="text-xs font-semibold mb-0.5" style={{ color: "hsl(220, 14%, 88%)" }}>
                  {tip.title}
                </div>
                <div className="text-[11px] leading-snug" style={{ color: "hsl(220, 10%, 55%)" }}>
                  {tip.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Example prompts */}
      <div>
        <div className="flex items-center gap-1.5 mb-3 px-1">
          <Sparkles className="w-3.5 h-3.5" style={{ color: META_COLOR }} />
          <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 14%, 75%)" }}>
            Essayez avec un exemple
          </span>
        </div>
        <div className="space-y-2">
          {examplePrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => onUsePrompt?.(prompt)}
              onMouseEnter={() => setHoveredPrompt(i)}
              onMouseLeave={() => setHoveredPrompt(null)}
              className="w-full text-left rounded-xl px-4 py-3 transition-all flex items-center justify-between gap-3 group"
              style={{
                background: "hsl(220, 16%, 15%)",
                border: `1px solid ${hoveredPrompt === i ? META_COLOR : "hsl(220, 14%, 22%)"}`,
              }}
            >
              <span className="text-sm" style={{ color: "hsl(220, 14%, 85%)" }}>
                {prompt}
              </span>
              <ChevronRight
                className="w-4 h-4 shrink-0 transition-all"
                style={{
                  color: hoveredPrompt === i ? META_COLOR : "hsl(220, 10%, 40%)",
                  transform: hoveredPrompt === i ? "translateX(2px)" : "translateX(0)",
                }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const MetaHelpButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-7 h-7 rounded-full flex items-center justify-center transition-all"
    style={{
      background: `${META_COLOR}15`,
      color: META_COLOR,
      border: `1px solid ${META_COLOR}40`,
    }}
    title="Aide & bonnes pratiques"
  >
    <HelpCircle className="w-3.5 h-3.5" />
  </button>
);

export default MetaSuggestionCards;
