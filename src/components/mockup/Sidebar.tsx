import { Plus, Search, ChevronRight, FolderKanban, Settings, MessageSquare, LucideIcon, Sparkles, Megaphone, Users } from "lucide-react";
import { Tool } from "@/data/tools";
import { Conversation, DisplayInfo, Project } from "./types";

const toolDisplayMap: Record<string, { color: string; icon: LucideIcon }> = {
  assistant: { color: "#FFBF0A", icon: Sparkles },
  campaign: { color: "#9900FF", icon: Megaphone },
  rh: { color: "hsl(142, 71%, 45%)", icon: Users },
};

const getDisplayInfo = (tool: Tool): DisplayInfo => {
  const custom = toolDisplayMap[tool.id];
  return {
    color: custom?.color || tool.color,
    icon: custom?.icon || tool.icon,
    name: tool.name,
    shortName: tool.shortName,
    description: tool.description,
  };
};

interface SidebarProps {
  projects: Project[];
  conversations: Conversation[];
  expandedProjectIds: Set<string>;
  activeConversationId: string | null;
  onToggleProject: (id: string) => void;
  onNewConversation: () => void;
  onNewProject: () => void;
  onEditProject: (project: Project) => void;
  onSelectConversation: (id: string) => void;
}

const Sidebar = ({
  projects,
  conversations,
  expandedProjectIds,
  activeConversationId,
  onToggleProject,
  onNewConversation,
  onNewProject,
  onEditProject,
  onSelectConversation,
}: SidebarProps) => {
  const orphanConversations = conversations.filter((c) => !c.projectId);

  return (
    <div className="w-64 flex flex-col shrink-0" style={{ background: "hsl(220, 18%, 9%)" }}>
      <div className="p-3 border-b space-y-2" style={{ borderColor: "hsl(220, 14%, 16%)" }}>
        <button
          onClick={onNewConversation}
          className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors"
          style={{ background: "hsl(220, 16%, 14%)", color: "hsl(220, 14%, 90%)" }}
        >
          <Plus className="w-4 h-4" />
          Nouvelle conversation
        </button>
      </div>

      <div className="px-3 py-2">
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm" style={{ background: "hsl(220, 16%, 14%)" }}>
          <Search className="w-3.5 h-3.5" style={{ color: "hsl(220, 10%, 45%)" }} />
          <span style={{ color: "hsl(220, 10%, 45%)" }}>Rechercher…</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-1">
        {/* Projects section */}
        <div className="px-2 py-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(220, 10%, 40%)" }}>
            Projets
          </span>
          <button
            onClick={onNewProject}
            className="p-1 rounded hover:bg-white/5 transition-colors"
            style={{ color: "hsl(220, 10%, 55%)" }}
            title="Nouveau projet"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        {projects.map((project) => {
          const expanded = expandedProjectIds.has(project.id);
          const projectConvs = conversations.filter((c) => c.projectId === project.id);
          return (
            <div key={project.id} className="mb-1">
              <div
                className="group flex items-center gap-1.5 px-2 py-2 rounded-lg cursor-pointer text-sm transition-colors"
                style={{ color: "hsl(220, 14%, 80%)" }}
                onClick={() => onToggleProject(project.id)}
              >
                <ChevronRight
                  className="w-3.5 h-3.5 transition-transform shrink-0"
                  style={{
                    transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                    color: "hsl(220, 10%, 50%)",
                  }}
                />
                <FolderKanban className="w-4 h-4 shrink-0" style={{ color: "hsl(220, 10%, 60%)" }} />
                <span className="truncate flex-1">{project.title}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEditProject(project);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:bg-white/10 transition-opacity"
                  style={{ color: "hsl(220, 10%, 60%)" }}
                  title="Paramètres du projet"
                >
                  <Settings className="w-3.5 h-3.5" />
                </button>
              </div>

              {expanded && (
                <div className="ml-5 pl-2 border-l mt-0.5 space-y-0.5" style={{ borderColor: "hsl(220, 14%, 18%)" }}>
                  {projectConvs.length === 0 && (
                    <div className="px-2 py-1.5 text-xs italic" style={{ color: "hsl(220, 10%, 40%)" }}>
                      Aucune conversation
                    </div>
                  )}
                  {projectConvs.map((conv) => {
                    const d = getDisplayInfo(conv.tool);
                    const Icon = d.icon;
                    const active = conv.id === activeConversationId;
                    return (
                      <div
                        key={conv.id}
                        onClick={() => onSelectConversation(conv.id)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors"
                        style={{
                          color: "hsl(220, 14%, 75%)",
                          background: active ? "hsl(220, 16%, 14%)" : "transparent",
                        }}
                      >
                        <div
                          className="w-3.5 h-3.5 rounded flex items-center justify-center shrink-0"
                          style={{ backgroundColor: d.color }}
                        >
                          <Icon className="w-2 h-2 text-white" />
                        </div>
                        <span className="truncate">{conv.label}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* Orphan conversations */}
        <div className="px-2 py-2 mt-2 text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(220, 10%, 40%)" }}>
          Aujourd'hui
        </div>
        {orphanConversations.map((conv) => {
          const d = getDisplayInfo(conv.tool);
          const Icon = d.icon;
          const active = conv.id === activeConversationId;
          return (
            <div
              key={conv.id}
              onClick={() => onSelectConversation(conv.id)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors mb-0.5"
              style={{
                color: "hsl(220, 14%, 75%)",
                background: active ? "hsl(220, 16%, 14%)" : "transparent",
              }}
            >
              <div
                className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                style={{ backgroundColor: d.color }}
              >
                <Icon className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="truncate">{conv.label}</span>
            </div>
          );
        })}
        {orphanConversations.length === 0 && (
          <div className="px-3 py-1.5 text-xs italic" style={{ color: "hsl(220, 10%, 40%)" }}>
            Aucune conversation libre
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
