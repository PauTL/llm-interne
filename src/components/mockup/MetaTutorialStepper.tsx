import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Megaphone, Target, Users, Sparkles, CheckCircle2, AlertTriangle, ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";

interface MetaTutorialStepperProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const META_COLOR = "#9900FF";

interface Step {
  icon: typeof Target;
  title: string;
  subtitle: string;
  body: React.ReactNode;
}

const examplePrompt =
  "Crée une campagne META pour la nouvelle collection été. Objectif : conversions. Budget : 5000€/mois. Audience : femmes 25-40 ans en France, intéressées par la mode éthique. Durée : 6 semaines.";

const StepBadCompare = () => (
  <div className="grid grid-cols-2 gap-3">
    <div className="rounded-xl p-4" style={{ background: "hsl(0, 30%, 12%)", border: "1px solid hsl(0, 40%, 22%)" }}>
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-4 h-4" style={{ color: "hsl(0, 75%, 60%)" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(0, 75%, 70%)" }}>
          À éviter
        </span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "hsl(0, 20%, 85%)" }}>
        "Fais-moi une pub pour mon site."
      </p>
    </div>
    <div className="rounded-xl p-4" style={{ background: "hsl(142, 30%, 12%)", border: "1px solid hsl(142, 40%, 22%)" }}>
      <div className="flex items-center gap-2 mb-2">
        <CheckCircle2 className="w-4 h-4" style={{ color: "hsl(142, 71%, 55%)" }} />
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: "hsl(142, 60%, 70%)" }}>
          Recommandé
        </span>
      </div>
      <p className="text-xs leading-relaxed" style={{ color: "hsl(142, 20%, 85%)" }}>
        "Campagne conversions, 3000€/mois, audience 30-45 ans urbains, intéressés par la déco design."
      </p>
    </div>
  </div>
);

const PromptCard = () => {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(examplePrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="w-full text-left rounded-xl p-4 transition-all group"
      style={{ background: "hsl(220, 16%, 15%)", border: `1px solid ${META_COLOR}40` }}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: META_COLOR }}>
          Prompt prêt à l'emploi
        </span>
        <span className="text-[10px] font-medium flex items-center gap-1" style={{ color: META_COLOR }}>
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copié !" : "Copier"}
        </span>
      </div>
      <p className="text-sm leading-relaxed" style={{ color: "hsl(220, 14%, 85%)" }}>
        {examplePrompt}
      </p>
    </button>
  );
};

const steps: Step[] = [
  {
    icon: Megaphone,
    title: "Bienvenue dans l'assistant META",
    subtitle: "3 étapes pour des campagnes performantes",
    body: (
      <p className="text-sm leading-relaxed text-center max-w-sm mx-auto" style={{ color: "hsl(220, 10%, 70%)" }}>
        Cet assistant crée et optimise vos campagnes META directement depuis le chat. Suivez ce mini-guide pour
        obtenir les meilleurs résultats dès votre premier prompt.
      </p>
    ),
  },
  {
    icon: Target,
    title: "Définissez l'objectif",
    subtitle: "Le ciblage commence par le 'pourquoi'",
    body: (
      <div className="space-y-3">
        <p className="text-sm" style={{ color: "hsl(220, 10%, 70%)" }}>
          Indiquez systématiquement <strong style={{ color: "hsl(220, 14%, 88%)" }}>l'objectif</strong> (notoriété,
          trafic, conversions), le <strong style={{ color: "hsl(220, 14%, 88%)" }}>budget</strong> et la{" "}
          <strong style={{ color: "hsl(220, 14%, 88%)" }}>durée</strong>.
        </p>
        <div className="grid grid-cols-3 gap-2 mt-4">
          {["Notoriété", "Trafic", "Conversions"].map((label) => (
            <div
              key={label}
              className="rounded-lg px-3 py-3 text-center text-xs font-medium"
              style={{ background: `${META_COLOR}12`, color: "hsl(220, 14%, 85%)", border: `1px solid ${META_COLOR}30` }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    icon: Users,
    title: "Décrivez votre audience",
    subtitle: "Plus c'est précis, mieux c'est",
    body: (
      <div className="space-y-3">
        <p className="text-sm" style={{ color: "hsl(220, 10%, 70%)" }}>
          Âge, genre, localisation, centres d'intérêt, comportements. L'assistant adapte ses recommandations à votre
          ciblage.
        </p>
        <StepBadCompare />
      </div>
    ),
  },
  {
    icon: Sparkles,
    title: "Lancez-vous",
    subtitle: "Copiez ce prompt pour démarrer",
    body: (
      <div className="space-y-3">
        <p className="text-sm" style={{ color: "hsl(220, 10%, 70%)" }}>
          Voici un exemple de prompt complet. Cliquez pour le copier dans votre presse-papier.
        </p>
        <PromptCard />
      </div>
    ),
  },
];

const MetaTutorialStepper = ({ open, onOpenChange }: MetaTutorialStepperProps) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (open) setCurrent(0);
  }, [open]);

  const step = steps[current];
  const isLast = current === steps.length - 1;
  const Icon = step.icon;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl p-0 overflow-hidden border"
        style={{ background: "hsl(220, 16%, 11%)", borderColor: "hsl(220, 14%, 20%)" }}
      >
        {/* Hero */}
        <div
          className="px-8 pt-8 pb-6"
          style={{
            background: `linear-gradient(135deg, ${META_COLOR}25 0%, transparent 70%)`,
            borderBottom: "1px solid hsl(220, 14%, 18%)",
          }}
        >
          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: META_COLOR }}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider" style={{ color: META_COLOR }}>
                Étape {current + 1} sur {steps.length}
              </div>
              <h2 className="text-xl font-semibold" style={{ color: "hsl(220, 14%, 92%)" }}>
                {step.title}
              </h2>
              <p className="text-xs" style={{ color: "hsl(220, 10%, 60%)" }}>
                {step.subtitle}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className="flex-1 h-1 rounded-full transition-all"
                style={{
                  background: i <= current ? META_COLOR : "hsl(220, 14%, 22%)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="px-8 py-7 min-h-[220px]">{step.body}</div>

        {/* Footer */}
        <div
          className="px-8 py-4 flex items-center justify-between"
          style={{ borderTop: "1px solid hsl(220, 14%, 18%)", background: "hsl(220, 16%, 10%)" }}
        >
          <button
            onClick={() => onOpenChange(false)}
            className="text-xs font-medium transition-colors"
            style={{ color: "hsl(220, 10%, 55%)" }}
          >
            Passer le tutoriel
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrent((c) => Math.max(0, c - 1))}
              disabled={current === 0}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-all disabled:opacity-30"
              style={{ color: "hsl(220, 14%, 80%)", background: "hsl(220, 16%, 16%)" }}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              Précédent
            </button>
            <button
              onClick={() => (isLast ? onOpenChange(false) : setCurrent((c) => c + 1))}
              className="flex items-center gap-1 px-4 py-2 rounded-lg text-xs font-semibold transition-all text-white"
              style={{ background: META_COLOR }}
            >
              {isLast ? "C'est parti !" : "Suivant"}
              {!isLast && <ChevronRight className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MetaTutorialStepper;
