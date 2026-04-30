import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Megaphone, FileSearch, ListChecks, Rocket, AlertTriangle, Copy } from "lucide-react";
import { useState } from "react";

interface MetaTutorialProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onUsePrompt?: (prompt: string) => void;
}

const META_COLOR = "#9900FF";

const C = {
  border: "hsl(220, 14%, 88%)",
  bg: "hsl(0, 0%, 100%)",
  surface: "hsl(220, 16%, 97%)",
  textStrong: "hsl(220, 20%, 15%)",
  text: "hsl(220, 14%, 30%)",
  textMuted: "hsl(220, 10%, 45%)",
};

const PromptBlock = ({ text, idx, copiedIdx, onCopy }: {
  text: string;
  idx: number;
  copiedIdx: number | null;
  onCopy: (t: string, i: number) => void;
}) => (
  <button
    onClick={() => onCopy(text, idx)}
    className="w-full text-left rounded-lg p-3 transition-colors group mt-2"
    style={{ background: C.surface, border: `1px solid ${C.border}` }}
    onMouseEnter={(e) => (e.currentTarget.style.borderColor = META_COLOR)}
    onMouseLeave={(e) => (e.currentTarget.style.borderColor = C.border)}
  >
    <div className="flex items-start justify-between gap-2">
      <p className="text-xs leading-relaxed italic" style={{ color: C.text }}>
        « {text} »
      </p>
      <span
        className="text-[10px] font-medium shrink-0 flex items-center gap-1 transition-opacity opacity-0 group-hover:opacity-100"
        style={{ color: META_COLOR }}
      >
        <Copy className="w-3 h-3" />
        {copiedIdx === idx ? "Copié !" : "Copier"}
      </span>
    </div>
  </button>
);

const MetaTutorial = ({ open, onOpenChange, onUsePrompt }: MetaTutorialProps) => {
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const handleCopy = (prompt: string, idx: number) => {
    navigator.clipboard.writeText(prompt);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
    onUsePrompt?.(prompt);
  };

  const StepHeader = ({ n, icon: Icon, title }: { n: number; icon: typeof FileSearch; title: string }) => (
    <div className="flex items-center gap-2.5 mb-2">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 text-xs font-semibold"
        style={{ background: `${META_COLOR}15`, color: META_COLOR, border: `1px solid ${META_COLOR}30` }}
      >
        {n}
      </div>
      <div className="flex items-center gap-1.5">
        <Icon className="w-4 h-4" style={{ color: META_COLOR }} />
        <h3 className="text-sm font-semibold" style={{ color: C.textStrong }}>
          {title}
        </h3>
      </div>
    </div>
  );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-md overflow-y-auto border-l p-0"
        style={{ background: C.bg, borderColor: C.border }}
      >
        <div className="p-6 border-b" style={{ borderColor: C.border }}>
          <SheetHeader className="text-left space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                style={{ backgroundColor: META_COLOR }}
              >
                <Megaphone className="w-5 h-5 text-white" />
              </div>
              <div>
                <SheetTitle style={{ color: C.textStrong }}>
                  Bonnes pratiques · Assistant META
                </SheetTitle>
                <SheetDescription style={{ color: C.textMuted }}>
                  Tirez le meilleur de l'assistant de création de campagnes
                </SheetDescription>
              </div>
            </div>
          </SheetHeader>
        </div>

        <div className="p-6 space-y-6">
          {/* Intro */}
          <div
            className="rounded-lg p-3 text-xs leading-relaxed"
            style={{ background: `${META_COLOR}10`, border: `1px solid ${META_COLOR}40`, color: C.text }}
          >
            Pour obtenir une campagne fiable, ne demandez pas de <strong>tout créer, tout de suite</strong>.
            Demandez d'abord à l'outil de <strong>comprendre votre plan média</strong>.
            Voici 3 étapes conseillées :
          </div>

          {/* Step 1 */}
          <section>
            <StepHeader n={1} icon={FileSearch} title="Commencer par l'analyse du plan média" />
            <PromptBlock
              text="Récupère toutes les informations utiles de mon plan média. Lis tous les onglets du fichier et identifie tout ce qui est nécessaire à la création de la campagne."
              idx={0}
              copiedIdx={copiedIdx}
              onCopy={handleCopy}
            />
            <p className="text-xs mt-3 mb-1.5" style={{ color: C.text }}>
              Puis ajoutez le contexte que vous connaissez déjà :
            </p>
            <ul className="text-xs space-y-1 pl-4 list-disc" style={{ color: C.text }}>
              <li>compte publicitaire</li>
              <li>page Facebook</li>
              <li>logique budgétaire (budget campagne ou budget adset)</li>
              <li>contraintes spécifiques éventuelles (ex : « Désactive systématiquement Advantage+ »)</li>
            </ul>
            <p className="text-xs mt-3" style={{ color: C.textMuted }}>
              <strong style={{ color: C.textStrong }}>Objectif :</strong> faire comprendre à l'outil quoi analyser et dans quel cadre travailler.
            </p>
            <div
              className="rounded-lg p-3 flex gap-2 mt-3"
              style={{ background: "hsl(0, 70%, 97%)", border: "1px solid hsl(0, 60%, 85%)" }}
            >
              <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" style={{ color: "hsl(0, 75%, 45%)" }} />
              <div className="text-xs" style={{ color: "hsl(0, 50%, 30%)" }}>
                <strong>À éviter :</strong> « Voici un Excel, crée la campagne »
              </div>
            </div>
          </section>

          {/* Step 2 */}
          <section>
            <StepHeader n={2} icon={ListChecks} title="Demander un récapitulatif avant toute création" />
            <PromptBlock
              text="Fais un récapitulatif complet de ce que tu as compris pour créer la campagne, liste les points ambigus et attends ma validation avant toute création."
              idx={1}
              copiedIdx={copiedIdx}
              onCopy={handleCopy}
            />
            <p className="text-xs mt-3 mb-1.5" style={{ color: C.text }}>
              Le récap doit faire apparaître :
            </p>
            <ul className="text-xs space-y-1 pl-4 list-disc" style={{ color: C.text }}>
              <li>objectif de campagne</li>
              <li>dates</li>
              <li>budget</li>
              <li>ciblage</li>
              <li>placements</li>
              <li>structure (nombre d'adsets / ads)</li>
              <li>informations manquantes ou ambiguës</li>
            </ul>
            <p className="text-xs mt-3" style={{ color: C.textMuted }}>
              C'est le moment d'ajuster si besoin.
            </p>
          </section>

          {/* Step 3 */}
          <section>
            <StepHeader n={3} icon={Rocket} title="Valider puis lancer la création" />
            <PromptBlock
              text="Validation OK, tu peux créer la campagne."
              idx={2}
              copiedIdx={copiedIdx}
              onCopy={handleCopy}
            />
            <p className="text-xs mt-3" style={{ color: C.textMuted }}>
              L'outil crée alors une campagne beaucoup plus fiable, avec moins de corrections derrière.
            </p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MetaTutorial;
