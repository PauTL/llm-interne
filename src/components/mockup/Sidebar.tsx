import { Plus, Search, ChevronRight, FolderKanban, Settings, Share2, Sparkles, Megaphone, Users, LucideIcon } from "lucide-react";
import { Tool } from "@/data/tools";
import { AppRole, Conversation, DisplayInfo, Project } from "./types";
import { getUser } from "./users";
import Avatar from "./Avatar";

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
  currentUserId: string;
  currentRole: AppRole;
  onToggleProject: (id: string) => void;
  onNewConversation: () => void;
  onNewProject: () => void;
  onEditProject: (project: Project) => void;
  onShareProject: (project: Project) => void;
  onSelectConversation: (id: string) => void;
}

// Light theme tokens
const SIDEBAR_BG = "hsl(220, 20%, 97%)";
const SURFACE = "hsl(220, 16%, 93%)";
const SURFACE_HOVER = "hsl(220, 16%, 90%)";
const BORDER = "hsl(220, 14%, 88%)";
const TEXT = "hsl(220, 20%, 18%)";
const TEXT_MUTED = "hsl(220, 10%, 45%)";
const TEXT_SUBTLE = "hsl(220, 10%, 55%)";
const TEXT_FAINT = "hsl(220, 10%, 60%)";

const Sidebar = ({
  projects,
  conversations,
  expandedProjectIds,
  activeConversationId,
  currentUserId,
  currentRole,
  onToggleProject,
  onNewConversation,
  onNewProject,
  onEditProject,
  onShareProject,
  onSelectConversation,
}: SidebarProps) => {
  const orphanConversations = conversations.filter((c) => !c.projectId);
  const canManageProjects = currentRole === "editor";

  return (
    <div className="w-64 flex flex-col shrink-0 border-r" style={{ background: SIDEBAR_BG, borderColor: BORDER }}>
      <div className="p-3 border-b space-y-2" style={{ borderColor: BORDER }}>
        <button
          onClick={onNewConversation}
          className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors hover:opacity-90"
          style={{ background: "hsl(0, 0%, 100%)", color: TEXT, border: `1px solid ${BORDER}` }}
        >
          <Plus className="w-4 h-4" />
          Nouvelle conversation
        </button>
      </div>

      <div className="px-3 py-2">
        <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm" style={{ background: SURFACE }}>
          <Search className="w-3.5 h-3.5" style={{ color: TEXT_SUBTLE }} />
          <span style={{ color: TEXT_SUBTLE }}>Rechercher…</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-2 py-1">
        <div className="px-2 py-2 flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider" style={{ color: TEXT_MUTED }}>
            Projets
          </span>
          {canManageProjects && (
            <button
              onClick={onNewProject}
              className="p-1 rounded hover:bg-black/5 transition-colors"
              style={{ color: TEXT_MUTED }}
              title="Nouveau projet"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {projects.map((project) => {
          const expanded = expandedProjectIds.has(project.id);
          const projectConvs = conversations.filter((c) => c.projectId === project.id);
          const isOwner = project.ownerId === currentUserId;
          const isShared = project.memberIds.length > 0;
          const visibleAvatars = [project.ownerId, ...project.memberIds]
            .map(getUser)
            .filter(Boolean)
            .slice(0, 3);

          return (
            <div key={project.id} className="mb-1">
              <div
                className="group flex items-center gap-1.5 px-2 py-2 rounded-lg cursor-pointer text-sm transition-colors hover:bg-black/5"
                style={{ color: TEXT }}
                onClick={() => onToggleProject(project.id)}
              >
                <ChevronRight
                  className="w-3.5 h-3.5 transition-transform shrink-0"
                  style={{
                    transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
                    color: TEXT_SUBTLE,
                  }}
                />
                <FolderKanban className="w-4 h-4 shrink-0" style={{ color: TEXT_FAINT }} />
                <span className="truncate flex-1">{project.title}</span>

                {isShared && (
                  <div className="flex -space-x-1.5 shrink-0 group-hover:hidden">
                    {visibleAvatars.map((u) => u && <Avatar key={u.id} user={u} size={16} ring />)}
                  </div>
                )}

                {canManageProjects && isOwner && (
                  <div className="hidden group-hover:flex items-center gap-0.5">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onShareProject(project);
                      }}
                      className="p-0.5 rounded hover:bg-black/10"
                      style={{ color: TEXT_FAINT }}
                      title="Partager"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditProject(project);
                      }}
                      className="p-0.5 rounded hover:bg-black/10"
                      style={{ color: TEXT_FAINT }}
                      title="Paramètres"
                    >
                      <Settings className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              {expanded && (
                <div className="ml-5 pl-2 border-l mt-0.5 space-y-0.5" style={{ borderColor: BORDER }}>
                  {projectConvs.length === 0 && (
                    <div className="px-2 py-1.5 text-xs italic" style={{ color: TEXT_SUBTLE }}>
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
                        className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer text-sm transition-colors hover:bg-black/5"
                        style={{
                          color: TEXT,
                          background: active ? SURFACE : "transparent",
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

        <div className="px-2 py-2 mt-2 text-xs font-medium uppercase tracking-wider" style={{ color: TEXT_MUTED }}>
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
              className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors mb-0.5 hover:bg-black/5"
              style={{
                color: TEXT,
                background: active ? SURFACE : "transparent",
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
          <div className="px-3 py-1.5 text-xs italic" style={{ color: TEXT_SUBTLE }}>
            Aucune conversation libre
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
