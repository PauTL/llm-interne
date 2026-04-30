import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Megaphone, Target, Sparkles, AlertTriangle, CheckCircle2, Lightbulb, Copy } from "lucide-react";
import { useState } from "react";

interface MetaTutorialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUsePrompt?: (prompt: string) => void;
}

const META_COLOR = "#9900FF";

const examplePrompts = [
  "Crée une campagne META pour promouvoir notre nouvelle collection été, budget 5000€, audience femmes 25-40 ans en France, objectif conversions.",
  "Génère 3 variations de créatives pour une campagne de retargeting sur les visiteurs du site des 30 derniers jours.",
  "Analyse les performances de ma dernière campagne et propose 3 optimisations concrètes.",
];

const MetaTutorial = ({ open, onOpenChange, onUsePrompt }: MetaTutorialProps) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
    onUsePrompt?.(prompt);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto border-l p-0"
        style={{ background: "hsl(0, 0%, 100%)", borderColor: "hsl(220, 14%, 88%)" }}
      >
        <div className="p-6 border-b" style={{ borderColor: "hsl(220, 14%, 88%)" }}>
          <SheetHeader className="text-left space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: META_COLOR }}
              >
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <SheetTitle style={{ color: "hsl(220, 20%, 15%)" }}>
                  Bonnes pratiques · Assistant META
                </SheetTitle>
                <SheetDescription style={{ color: "hsl(220, 10%, 45%)" }}>
                  Tirez le meilleur de l'assistant de création de campagnes
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Section 1 */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-4 h-4" style={{ color: META_COLOR }} />
              <h3 className="text-sm font-semibold" style={{ color: "hsl(220, 20%, 18%)" }}>
                1. Soyez précis sur l'objectif
              </h3>
            </div>
            <p className="text-xs leading-relaxed mb-2" style={{ color: "hsl(220, 14%, 35%)" }}>
              Indiquez toujours <strong style={{ color: "hsl(220, 20%, 18%)" }}>l'objectif</strong> (notoriété, trafic, conversions), le <strong style={{ color: "hsl(220, 20%, 18%)" }}>budget</strong> et la <strong style={{ color: "hsl(220, 20%, 18%)" }}>durée</strong> de la campagne.
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4" style={{ color: META_COLOR }} />
              <h3 className="text-sm font-semibold" style={{ color: "hsl(220, 20%, 18%)" }}>
                2. Décrivez votre audience
              </h3>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "hsl(220, 14%, 35%)" }}>
              Âge, genre, localisation, centres d'intérêt, comportements. Plus le ciblage est clair, meilleures sont les recommandations.
            </p>
          </section>

          {/* Section 3 — Do / Don't */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Lightbulb className="w-4 h-4" style={{ color: META_COLOR }} />
              <h3 className="text-sm font-semibold" style={{ color: "hsl(220, 20%, 18%)" }}>
                3. À faire / à éviter
              </h3>
            </div>
            <div className="space-y-2">
              <div
                className="rounded-lg p-3 flex gap-2"
                style={{ background: "hsl(142, 60%, 96%)", border: "1px solid hsl(142, 50%, 80%)" }}
              >
                <CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(142, 71%, 35%)" }} />
                <p className="text-xs" style={{ color: "hsl(142, 40%, 22%)" }}>
                  "Campagne conversions, 3000€/mois, audience 30-45 ans urbains, intéressés par la déco design."
                </p>
              </div>
              <div
                className="rounded-lg p-3 flex gap-2"
                style={{ background: "hsl(0, 70%, 97%)", border: "1px solid hsl(0, 60%, 85%)" }}
              >
                <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(0, 75%, 45%)" }} />
                <p className="text-xs" style={{ color: "hsl(0, 50%, 30%)" }}>
                  "Fais-moi une pub pour mon site." → trop vague, l'assistant manque de contexte.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4 — Example prompts */}
          <section>
            <div className="flex items-center gap-2 mb-3">
              <Megaphone className="w-4 h-4" style={{ color: META_COLOR }} />
              <h3 className="text-sm font-semibold" style={{ color: "hsl(220, 20%, 18%)" }}>
                4. Exemples de prompts
              </h3>
            </div>
            <div className="space-y-2">
              {examplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(p, i)}
                  className="w-full text-left rounded-lg p-3 transition-colors group"
                  style={{ background: "hsl(220, 16%, 97%)", border: "1px solid hsl(220, 14%, 88%)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = META_COLOR)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "hsl(220, 14%, 88%)")}
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-xs leading-relaxed" style={{ color: "hsl(220, 14%, 30%)" }}>
                      {p}
                    </p>
                    <span
                      className="text-[10px] font-medium shrink-0 flex items-center gap-1 transition-opacity opacity-0 group-hover:opacity-100"
                      style={{ color: META_COLOR }}
                    >
                      <Copy className="w-3 h-3" />
                      {copiedIdx === i ? "Copié !" : "Copier"}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <div
            className="rounded-lg p-3 text-xs"
            style={{ background: `${META_COLOR}10`, border: `1px solid ${META_COLOR}40`, color: "hsl(220, 20%, 25%)" }}
          >
            💡 Astuce : vous pouvez rouvrir ce guide à tout moment via le bouton{" "}
            <strong>Bonnes pratiques</strong> en haut de la conversation.
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MetaTutorial;
