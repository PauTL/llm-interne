import { Megaphone, FileSearch, ListChecks, ClipboardList, HelpCircle, Lightbulb, ChevronRight } from "lucide-react";
import { useState } from "react";

interface MetaSuggestionCardsProps {
  onUsePrompt?: (prompt: string) => void;
  onOpenFullGuide?: () => void;
}

const META_COLOR = "#9900FF";

const tips = [
  {
    icon: FileSearch,
    title: "Analyser le plan média d'abord",
    desc: "Demandez-lui de lire et comprendre avant toute création",
  },
  {
    icon: ListChecks,
    title: "Demander un récap avant création",
    desc: "Pour ajuster si besoin avant de lancer",
  },
  {
    icon: ClipboardList,
    title: "Vérifier les infos détaillées",
    desc: "Objectif, ciblage géo, intérêts, budget…",
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
        <h2 className="text-xl font-semibold mb-1.5" style={{ color: "hsl(220, 20%, 18%)" }}>
          Assistant META
        </h2>
        <p className="text-sm" style={{ color: "hsl(220, 10%, 45%)" }}>
          Créez et optimisez vos campagnes en langage naturel
        </p>
      </div>

      {/* Tips row */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-1.5">
            <Lightbulb className="w-3.5 h-3.5" style={{ color: META_COLOR }} />
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(220, 14%, 35%)" }}>
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
                  background: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 14%, 88%)",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.03)",
                }}
              >
                <Icon className="w-4 h-4 mb-2" style={{ color: META_COLOR }} />
                <div className="text-xs font-semibold mb-0.5" style={{ color: "hsl(220, 20%, 20%)" }}>
                  {tip.title}
                </div>
                <div className="text-[11px] leading-snug" style={{ color: "hsl(220, 10%, 50%)" }}>
                  {tip.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export const MetaHelpButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="h-7 pl-2.5 pr-1.5 rounded-full inline-flex items-center gap-1.5 text-xs font-medium transition-all hover:opacity-80"
    style={{
      background: `${META_COLOR}15`,
      color: META_COLOR,
      border: `1px solid ${META_COLOR}40`,
    }}
    title="Aide & bonnes pratiques"
  >
    Bonnes pratiques
    <span
      className="w-5 h-5 rounded-full flex items-center justify-center"
      style={{ background: `${META_COLOR}25` }}
    >
      <HelpCircle className="w-3 h-3" />
    </span>
  </button>
);

export default MetaSuggestionCards;
