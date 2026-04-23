import { useState } from "react";
import { Menu, Bot, Megaphone, Sparkles, Users, FolderKanban, LucideIcon } from "lucide-react";
import { tools, Tool } from "@/data/tools";
import ChatMessages from "./ChatMessages";
import Sidebar from "./Sidebar";
import ProjectDialog from "./ProjectDialog";
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

const initialProjects: Project[] = [
  {
    id: "p1",
    title: "Campagne été 2026",
    instruction: "Tu es un expert marketing META. Toutes les réponses doivent cibler une audience 25-35 ans, ton décontracté, focus performance.",
  },
  {
    id: "p2",
    title: "Onboarding RH",
    instruction: "Tu réponds toujours en te basant sur le manuel RH interne. Cite les sections du manuel quand c'est pertinent.",
  },
];

const initialConversations: Conversation[] = [
  { id: "c1", label: "Comment poser des congés ?", tool: tools[0], projectId: "p2" },
  { id: "c2", label: "Résumé réunion Q1", tool: tools[0] },
  { id: "c3", label: "Créer campagne été 2026", tool: tools[2], projectId: "p1" },
  { id: "c4", label: "Question sur le télétravail", tool: tools[1] },
];

const Proposition1 = () => {
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [expandedProjectIds, setExpandedProjectIds] = useState<Set<string>>(new Set(["p1"]));
  const [activeConversationId, setActiveConversationId] = useState<string | null>("c1");
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [pendingProjectId, setPendingProjectId] = useState<string | null>(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [projectDialogOpen, setProjectDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) ?? null;
  const currentTool = activeTool || activeConversation?.tool || tools[0];
  const display = getDisplayInfo(currentTool);
  const activeProject =
    projects.find((p) => p.id === (pendingProjectId ?? activeConversation?.projectId)) ?? null;

  const conversationStarted = !showWelcome && !!activeConversation;

  const handleNewConversation = () => {
    setShowWelcome(true);
    setActiveTool(null);
    setActiveConversationId(null);
    setPendingProjectId(null);
  };

  const handleToggleProject = (id: string) => {
    setExpandedProjectIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleSelectConversation = (id: string) => {
    setActiveConversationId(id);
    setActiveTool(null);
    setShowWelcome(false);
    setPendingProjectId(null);
  };

  const handleSelectTool = (tool: Tool) => {
    const newConv: Conversation = {
      id: `c${Date.now()}`,
      label: "Nouvelle conversation",
      tool,
      projectId: pendingProjectId ?? undefined,
    };
    setConversations((prev) => [newConv, ...prev]);
    setActiveConversationId(newConv.id);
    setActiveTool(tool);
    setShowWelcome(false);
    if (pendingProjectId) {
      setExpandedProjectIds((prev) => new Set(prev).add(pendingProjectId));
    }
    setPendingProjectId(null);
  };

  const handleNewProject = () => {
    setEditingProject(null);
    setProjectDialogOpen(true);
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectDialogOpen(true);
  };

  const handleSubmitProject = (data: { title: string; instruction: string }) => {
    if (editingProject) {
      setProjects((prev) =>
        prev.map((p) => (p.id === editingProject.id ? { ...p, ...data } : p)),
      );
    } else {
      const newProject: Project = { id: `p${Date.now()}`, ...data };
      setProjects((prev) => [...prev, newProject]);
      setExpandedProjectIds((prev) => new Set(prev).add(newProject.id));
      // Immediately propose creating a conversation in this project
      setPendingProjectId(newProject.id);
      setActiveConversationId(null);
      setActiveTool(null);
      setShowWelcome(true);
    }
  };

  const actions = [
    {
      tool: tools[0],
      label: "Lancer une conversation classique",
      icon: Sparkles,
      color: "#FFBF0A",
    },
    {
      tool: tools[2],
      label: "Utiliser l'assistant META",
      icon: Megaphone,
      color: "#9900FF",
    },
  ];

  return (
    <div className="flex h-full rounded-xl overflow-hidden border" style={{ borderColor: "hsl(220, 14%, 20%)" }}>
      {sidebarOpen && (
        <Sidebar
          projects={projects}
          conversations={conversations}
          expandedProjectIds={expandedProjectIds}
          activeConversationId={activeConversationId}
          onToggleProject={handleToggleProject}
          onNewConversation={handleNewConversation}
          onNewProject={handleNewProject}
          onEditProject={handleEditProject}
          onSelectConversation={handleSelectConversation}
        />
      )}

      <div className="flex-1 flex flex-col" style={{ background: "hsl(220, 16%, 12%)" }}>
        <div className="h-12 flex items-center px-4 border-b shrink-0 gap-3" style={{ borderColor: "hsl(220, 14%, 18%)" }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-md transition-colors" style={{ color: "hsl(220, 10%, 55%)" }}>
            <Menu className="w-5 h-5" />
          </button>
          {activeProject && (
            <div
              className="flex items-center gap-1.5 text-xs px-2 py-1 rounded-md"
              style={{ background: "hsl(220, 16%, 16%)", color: "hsl(220, 14%, 80%)" }}
            >
              <FolderKanban className="w-3.5 h-3.5" style={{ color: "hsl(220, 10%, 60%)" }} />
              {activeProject.title}
            </div>
          )}
          {conversationStarted && (
            <span className="text-sm font-medium" style={{ color: "hsl(220, 14%, 90%)" }}>
              {display.name}
            </span>
          )}
        </div>

        {showWelcome ? (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-lg px-4">
              <div className="flex justify-center mb-5">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: "#3232FF" }}>
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-2" style={{ color: "hsl(220, 14%, 92%)" }}>
                Comment puis-je vous aider aujourd'hui ?
              </h2>
              <p className="text-sm mb-3" style={{ color: "hsl(220, 10%, 50%)" }}>
                Sélectionnez une action ci-dessous
              </p>
              {activeProject && (
                <p className="text-xs mb-6" style={{ color: "hsl(220, 10%, 60%)" }}>
                  Cette conversation héritera de l'instruction du projet{" "}
                  <strong style={{ color: "hsl(220, 14%, 80%)" }}>{activeProject.title}</strong>
                </p>
              )}
              <div className="flex gap-3 justify-center mt-6">
                {actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectTool(action.tool)}
                    className="flex items-center gap-3 rounded-xl px-5 py-4 text-left transition-all w-64"
                    style={{ background: "hsl(220, 16%, 15%)", border: "1px solid hsl(220, 14%, 22%)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "hsl(220, 16%, 18%)";
                      e.currentTarget.style.borderColor = action.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "hsl(220, 16%, 15%)";
                      e.currentTarget.style.borderColor = "hsl(220, 14%, 22%)";
                    }}
                  >
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: action.color }}>
                      <action.icon className="w-4.5 h-4.5 text-white" />
                    </div>
                    <div className="text-sm font-medium" style={{ color: "hsl(220, 14%, 92%)" }}>
                      {action.label}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <>
            {activeProject && (
              <div
                className="mx-4 mt-3 rounded-lg px-3 py-2 text-xs flex items-start gap-2"
                style={{ background: "hsl(220, 16%, 15%)", border: "1px solid hsl(220, 14%, 20%)" }}
              >
                <FolderKanban className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: "hsl(220, 10%, 55%)" }} />
                <div style={{ color: "hsl(220, 10%, 65%)" }}>
                  <span className="font-medium" style={{ color: "hsl(220, 14%, 80%)" }}>
                    Instruction du projet :
                  </span>{" "}
                  {activeProject.instruction || <em>Aucune instruction définie</em>}
                </div>
              </div>
            )}

            <ChatMessages
              toolName={display.name}
              toolDescription={display.description}
              displayColor={display.color}
              DisplayIcon={display.icon}
            />

            <div className="p-4 shrink-0">
              <div className="max-w-2xl mx-auto">
                <div className="flex items-center gap-2 rounded-xl px-3 py-2.5" style={{ background: "hsl(220, 16%, 16%)", border: "1px solid hsl(220, 14%, 22%)" }}>
                  <div
                    className="flex items-center gap-1.5 rounded-full pl-1.5 pr-2.5 py-1 text-xs font-medium shrink-0"
                    style={{ background: `${display.color}20`, color: display.color, border: `1px solid ${display.color}40` }}
                  >
                    <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: display.color }}>
                      <display.icon className="w-3 h-3 text-white" />
                    </div>
                    {display.shortName}
                  </div>

                  <input type="text" placeholder="Posez votre question…" className="flex-1 bg-transparent outline-none text-sm" style={{ color: "hsl(220, 14%, 90%)" }} />
                  <button className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: display.color }}>
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <ProjectDialog
        open={projectDialogOpen}
        onOpenChange={setProjectDialogOpen}
        initial={editingProject}
        onSubmit={handleSubmitProject}
      />
    </div>
  );
};

export default Proposition1;
