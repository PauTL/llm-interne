import { useState } from "react";
import { Plus, MessageSquare, Search, Menu, Bot, Megaphone, Sparkles } from "lucide-react";
import { tools, Tool } from "@/data/tools";
import ChatMessages from "./ChatMessages";

const Proposition1 = () => {
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [conversationStarted, setConversationStarted] = useState(true); // existing conv by default
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Simulated "new conversation" state
  const [showWelcome, setShowWelcome] = useState(false);

  const conversations = [
    { label: "Comment poser des congés ?", tool: tools[0] },
    { label: "Résumé réunion Q1", tool: tools[0] },
    { label: "Créer campagne été 2026", tool: tools[2] },
    { label: "Question sur le télétravail", tool: tools[1] },
  ];

  const [activeConvIndex, setActiveConvIndex] = useState(0);

  // The currently displayed tool (from conversation or selection)
  const displayTool = activeTool || (activeConvIndex >= 0 ? conversations[activeConvIndex].tool : tools[0]);

  const handleNewConversation = () => {
    setShowWelcome(true);
    setConversationStarted(false);
    setActiveTool(null);
    setActiveConvIndex(-1);
  };

  const handleSelectTool = (tool: Tool) => {
    setActiveTool(tool);
    setShowWelcome(false);
    setConversationStarted(true);
  };

  const handleSelectConversation = (index: number) => {
    setActiveConvIndex(index);
    setActiveTool(conversations[index].tool);
    setShowWelcome(false);
    setConversationStarted(true);
  };

  // Actions shown on the welcome screen
  const actions = [
    {
      tool: tools[0], // Assistant IA
      label: "Lancer une conversation classique",
      description: "Posez vos questions génériques à l'IA",
      icon: Sparkles,
      color: "#FFBF0A",
    },
    {
      tool: tools[2], // Campagne
      label: "Utiliser l'assistant META",
      description: "Créez des campagnes Facebook via MCP",
      icon: Megaphone,
      color: "#9900FF",
    },
  ];

  return (
    <div className="flex h-full rounded-xl overflow-hidden border" style={{ borderColor: "hsl(220, 14%, 20%)" }}>
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-64 flex flex-col shrink-0" style={{ background: "hsl(220, 18%, 9%)" }}>
          {/* New chat */}
          <div className="p-3 border-b" style={{ borderColor: "hsl(220, 14%, 16%)" }}>
            <button
              onClick={handleNewConversation}
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors"
              style={{ background: "hsl(220, 16%, 14%)", color: "hsl(220, 14%, 90%)" }}
            >
              <Plus className="w-4 h-4" />
              Nouvelle conversation
            </button>
          </div>

          {/* Search */}
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm" style={{ background: "hsl(220, 16%, 14%)" }}>
              <Search className="w-3.5 h-3.5" style={{ color: "hsl(220, 10%, 45%)" }} />
              <span style={{ color: "hsl(220, 10%, 45%)" }}>Rechercher…</span>
            </div>
          </div>

          {/* History */}
          <div className="flex-1 overflow-y-auto px-2 py-1">
            <div className="px-2 py-2 text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(220, 10%, 40%)" }}>
              Aujourd'hui
            </div>
            {conversations.map((conv, i) => (
              <div
                key={i}
                onClick={() => handleSelectConversation(i)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors mb-0.5"
                style={{
                  color: "hsl(220, 14%, 75%)",
                  background: i === activeConvIndex ? "hsl(220, 16%, 14%)" : "transparent",
                }}
              >
                <div
                  className="w-4 h-4 rounded flex items-center justify-center shrink-0"
                  style={{ backgroundColor: conv.tool.color }}
                >
                  <conv.tool.icon className="w-2.5 h-2.5 text-white" />
                </div>
                <span className="truncate">{conv.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col" style={{ background: "hsl(220, 16%, 12%)" }}>
        {/* Top bar */}
        <div className="h-12 flex items-center px-4 border-b shrink-0" style={{ borderColor: "hsl(220, 14%, 18%)" }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-md transition-colors" style={{ color: "hsl(220, 10%, 55%)" }}>
            <Menu className="w-5 h-5" />
          </button>
          {conversationStarted && (
            <span className="ml-3 text-sm font-medium" style={{ color: "hsl(220, 14%, 90%)" }}>
              {displayTool.name}
            </span>
          )}
        </div>

        {/* Welcome screen OR chat */}
        {showWelcome ? (
          <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-lg px-4">
              {/* Icon */}
              <div className="flex justify-center mb-5">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: "#3232FF" }}
                >
                  <Bot className="w-6 h-6 text-white" />
                </div>
              </div>
              <h2 className="text-2xl font-semibold mb-2" style={{ color: "hsl(220, 14%, 92%)" }}>
                Comment puis-je vous aider aujourd'hui ?
              </h2>
              <p className="text-sm mb-8" style={{ color: "hsl(220, 10%, 50%)" }}>
                Sélectionnez une action ci-dessous
              </p>
              <div className="flex gap-3 justify-center">
                {actions.map((action, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectTool(action.tool)}
                    className="flex items-center gap-3 rounded-xl px-5 py-4 text-left transition-all w-64"
                    style={{
                      background: "hsl(220, 16%, 15%)",
                      border: "1px solid hsl(220, 14%, 22%)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "hsl(220, 16%, 18%)";
                      e.currentTarget.style.borderColor = action.tool.color;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "hsl(220, 16%, 15%)";
                      e.currentTarget.style.borderColor = "hsl(220, 14%, 22%)";
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: action.tool.color }}
                    >
                      <action.tool.icon className="w-4.5 h-4.5 text-white" />
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
            <ChatMessages activeTool={displayTool} />

            {/* Input area with non-clickable chip */}
            <div className="p-4 shrink-0">
              <div className="max-w-2xl mx-auto">
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5"
                  style={{ background: "hsl(220, 16%, 16%)", border: "1px solid hsl(220, 14%, 22%)" }}
                >
                  {/* Non-clickable tool chip */}
                  <div
                    className="flex items-center gap-1.5 rounded-full pl-1.5 pr-2.5 py-1 text-xs font-medium shrink-0"
                    style={{
                      background: `${displayTool.color}20`,
                      color: displayTool.color,
                      border: `1px solid ${displayTool.color}40`,
                    }}
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: displayTool.color }}
                    >
                      <displayTool.icon className="w-3 h-3 text-white" />
                    </div>
                    {displayTool.shortName}
                  </div>

                  <input
                    type="text"
                    placeholder="Posez votre question…"
                    className="flex-1 bg-transparent outline-none text-sm"
                    style={{ color: "hsl(220, 14%, 90%)" }}
                  />
                  <button
                    className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: displayTool.color }}
                  >
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
    </div>
  );
};

export default Proposition1;
