import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Project } from "./types";

interface ProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initial?: Project | null;
  onSubmit: (data: { title: string; instruction: string }) => void;
}

const ProjectDialog = ({ open, onOpenChange, initial, onSubmit }: ProjectDialogProps) => {
  const [title, setTitle] = useState("");
  const [instruction, setInstruction] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(initial?.title ?? "");
      setInstruction(initial?.instruction ?? "");
    }
  }, [open, initial]);

  const isEdit = !!initial;
  const canSubmit = title.trim().length > 0;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit({ title: title.trim(), instruction: instruction.trim() });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg"
        style={{ background: "hsl(0, 0%, 100%)", color: "hsl(220, 20%, 18%)", borderColor: "hsl(220, 14%, 88%)" }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "hsl(220, 20%, 12%)" }}>
            {isEdit ? "Modifier le projet" : "Nouveau projet"}
          </DialogTitle>
          <DialogDescription style={{ color: "hsl(220, 10%, 45%)" }}>
            Toutes les conversations du projet partageront la même instruction.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: "hsl(220, 14%, 35%)" }}>
              Titre du projet
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ex. Campagne été 2026"
              className="w-full rounded-lg px-3 py-2 text-sm outline-none"
              style={{
                background: "hsl(220, 16%, 97%)",
                color: "hsl(220, 20%, 18%)",
                border: "1px solid hsl(220, 14%, 88%)",
              }}
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium" style={{ color: "hsl(220, 14%, 35%)" }}>
              Instruction (préprompt)
            </label>
            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              rows={5}
              placeholder="Donnez le contexte, le ton et les objectifs partagés par toutes les conversations…"
              className="w-full rounded-lg px-3 py-2 text-sm outline-none resize-none"
              style={{
                background: "hsl(220, 16%, 97%)",
                color: "hsl(220, 20%, 18%)",
                border: "1px solid hsl(220, 14%, 88%)",
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <button
            onClick={() => onOpenChange(false)}
            className="px-4 py-2 rounded-lg text-sm transition-colors"
            style={{ color: "hsl(220, 14%, 35%)", background: "transparent" }}
          >
            Annuler
          </button>
          <button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="px-4 py-2 rounded-lg text-sm font-medium transition-opacity disabled:opacity-40"
            style={{ background: "#3232FF", color: "white" }}
          >
            {isEdit ? "Enregistrer" : "Créer le projet"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectDialog;
