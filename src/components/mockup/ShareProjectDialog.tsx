import { useMemo, useState } from "react";
import { Search, X, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Project } from "./types";
import { directory, getUser } from "./users";
import Avatar from "./Avatar";

interface ShareProjectDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  currentUserId: string;
  onUpdateMembers: (memberIds: string[]) => void;
}

const ShareProjectDialog = ({
  open,
  onOpenChange,
  project,
  currentUserId,
  onUpdateMembers,
}: ShareProjectDialogProps) => {
  const [query, setQuery] = useState("");

  const candidates = useMemo(() => {
    if (!project) return [];
    const q = query.trim().toLowerCase();
    return directory.filter((u) => {
      if (u.id === project.ownerId) return false;
      if (project.memberIds.includes(u.id)) return false;
      if (!q) return true;
      return (
        u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
      );
    });
  }, [query, project]);

  if (!project) return null;

  const owner = getUser(project.ownerId);
  const members = project.memberIds.map(getUser).filter(Boolean);

  const addMember = (id: string) => {
    onUpdateMembers([...project.memberIds, id]);
    setQuery("");
  };

  const removeMember = (id: string) => {
    onUpdateMembers(project.memberIds.filter((m) => m !== id));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-lg"
        style={{ background: "hsl(0, 0%, 100%)", color: "hsl(220, 20%, 18%)", borderColor: "hsl(220, 14%, 88%)" }}
      >
        <DialogHeader>
          <DialogTitle style={{ color: "hsl(220, 20%, 12%)" }}>
            Partager « {project.title} »
          </DialogTitle>
          <DialogDescription style={{ color: "hsl(220, 10%, 45%)" }}>
            Les membres ajoutés pourront accéder au projet et créer des conversations dedans.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Search */}
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "hsl(220, 16%, 97%)", border: "1px solid hsl(220, 14%, 88%)" }}
          >
            <Search className="w-4 h-4" style={{ color: "hsl(220, 10%, 50%)" }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un utilisateur par nom ou email…"
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ color: "hsl(220, 20%, 18%)" }}
            />
          </div>

          {/* Candidates */}
          {query && (
            <div
              className="rounded-lg max-h-48 overflow-y-auto"
              style={{ background: "hsl(220, 16%, 98%)", border: "1px solid hsl(220, 14%, 88%)" }}
            >
              {candidates.length === 0 ? (
                <div className="px-3 py-3 text-xs italic" style={{ color: "hsl(220, 10%, 50%)" }}>
                  Aucun utilisateur trouvé
                </div>
              ) : (
                candidates.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => addMember(u.id)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-left transition-colors hover:bg-black/5"
                  >
                    <Avatar user={u} size={28} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm truncate" style={{ color: "hsl(220, 20%, 18%)" }}>
                        {u.name}
                      </div>
                      <div className="text-xs truncate" style={{ color: "hsl(220, 10%, 50%)" }}>
                        {u.email}
                      </div>
                    </div>
                    <Check className="w-4 h-4" style={{ color: "hsl(220, 10%, 50%)" }} />
                  </button>
                ))
              )}
            </div>
          )}

          {/* Member list */}
          <div className="space-y-2">
            <div className="text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(220, 10%, 45%)" }}>
              Personnes ayant accès
            </div>

            {owner && (
              <div className="flex items-center gap-3 px-2 py-2">
                <Avatar user={owner} size={32} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate" style={{ color: "hsl(220, 20%, 18%)" }}>
                    {owner.name} {owner.id === currentUserId && "(vous)"}
                  </div>
                  <div className="text-xs truncate" style={{ color: "hsl(220, 10%, 50%)" }}>
                    {owner.email}
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: "hsl(220, 16%, 93%)", color: "hsl(220, 14%, 35%)" }}>
                  Propriétaire
                </span>
              </div>
            )}

            {members.map((u) => u && (
              <div key={u.id} className="flex items-center gap-3 px-2 py-2">
                <Avatar user={u} size={32} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm truncate" style={{ color: "hsl(220, 20%, 18%)" }}>
                    {u.name}
                  </div>
                  <div className="text-xs truncate" style={{ color: "hsl(220, 10%, 50%)" }}>
                    {u.email}
                  </div>
                </div>
                <span className="text-xs px-2 py-0.5 rounded" style={{ background: "hsl(220, 16%, 93%)", color: "hsl(220, 14%, 35%)" }}>
                  Membre
                </span>
                <button
                  onClick={() => removeMember(u.id)}
                  className="p-1 rounded hover:bg-black/5 transition-colors"
                  style={{ color: "hsl(220, 10%, 45%)" }}
                  title="Retirer l'accès"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}

            {members.length === 0 && (
              <div className="px-2 py-2 text-xs italic" style={{ color: "hsl(220, 10%, 50%)" }}>
                Aucun membre invité pour l'instant
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareProjectDialog;
