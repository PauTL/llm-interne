import { useState } from "react";
import { ChevronDown, Plus, MessageSquare, Search, Menu } from "lucide-react";
import { tools, Tool } from "@/data/tools";
import ChatMessages from "./ChatMessages";

const Proposition1 = () => {
  const [activeTool, setActiveTool] = useState<Tool>(tools[0]);
  const [toolDropdownOpen, setToolDropdownOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const conversations = [
    "Comment poser des congés ?",
    "Résumé réunion Q1",
    "Créer campagne été 2026",
    "Question sur le télétravail",
  ];

  return (
    <div className="flex h-full rounded-xl overflow-hidden border" style={{ borderColor: "hsl(220, 14%, 20%)" }}>
      {/* Sidebar */}
      {sidebarOpen && (
        <div className="w-72 flex flex-col shrink-0" style={{ background: "hsl(220, 18%, 9%)" }}>
          {/* Tool selector block */}
          <div className="p-3 border-b" style={{ borderColor: "hsl(220, 14%, 16%)" }}>
            <div
              className="relative cursor-pointer rounded-lg p-3 transition-colors"
              style={{ background: "hsl(220, 16%, 14%)" }}
              onClick={() => setToolDropdownOpen(!toolDropdownOpen)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: activeTool.color }}
                >
                  <activeTool.icon className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate" style={{ color: "hsl(220, 14%, 90%)" }}>
                    {activeTool.name}
                  </div>
                  <div className="text-xs truncate" style={{ color: "hsl(220, 10%, 55%)" }}>
                    Outil actif
                  </div>
                </div>
                <ChevronDown
                  className="w-4 h-4 shrink-0 transition-transform"
                  style={{
                    color: "hsl(220, 10%, 55%)",
                    transform: toolDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </div>

              {/* Dropdown */}
              {toolDropdownOpen && (
                <div
                  className="absolute left-0 right-0 top-full mt-1 rounded-lg overflow-hidden z-10 shadow-xl"
                  style={{ background: "hsl(220, 16%, 14%)", border: "1px solid hsl(220, 14%, 22%)" }}
                >
                  {tools.map((tool) => (
                    <div
                      key={tool.id}
                      className="flex items-center gap-3 px-3 py-2.5 cursor-pointer transition-colors"
                      style={{
                        background: tool.id === activeTool.id ? "hsl(220, 16%, 18%)" : "transparent",
                      }}
                      onMouseEnter={(e) => {
                        if (tool.id !== activeTool.id) e.currentTarget.style.background = "hsl(220, 16%, 17%)";
                      }}
                      onMouseLeave={(e) => {
                        if (tool.id !== activeTool.id) e.currentTarget.style.background = "transparent";
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveTool(tool);
                        setToolDropdownOpen(false);
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-md flex items-center justify-center"
                        style={{ backgroundColor: tool.color }}
                      >
                        <tool.icon className="w-3.5 h-3.5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm truncate" style={{ color: "hsl(220, 14%, 90%)" }}>
                          {tool.name}
                        </div>
                        <div className="text-xs truncate" style={{ color: "hsl(220, 10%, 50%)" }}>
                          {tool.description}
                        </div>
                      </div>
                      {tool.id === activeTool.id && (
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tool.color }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* New chat button */}
          <div className="p-3">
            <button
              className="w-full flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm transition-colors"
              style={{ background: "hsl(220, 16%, 14%)", color: "hsl(220, 14%, 90%)" }}
            >
              <Plus className="w-4 h-4" />
              Nouvelle conversation
            </button>
          </div>

          {/* Search */}
          <div className="px-3 pb-2">
            <div className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm" style={{ background: "hsl(220, 16%, 14%)" }}>
              <Search className="w-3.5 h-3.5" style={{ color: "hsl(220, 10%, 45%)" }} />
              <span style={{ color: "hsl(220, 10%, 45%)" }}>Rechercher…</span>
            </div>
          </div>

          {/* Conversation history */}
          <div className="flex-1 overflow-y-auto px-2 py-1">
            <div className="px-2 py-2 text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(220, 10%, 40%)" }}>
              Aujourd'hui
            </div>
            {conversations.map((conv, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer text-sm transition-colors mb-0.5"
                style={{
                  color: "hsl(220, 14%, 75%)",
                  background: i === 0 ? "hsl(220, 16%, 14%)" : "transparent",
                }}
              >
                <MessageSquare className="w-3.5 h-3.5 shrink-0" style={{ color: "hsl(220, 10%, 45%)" }} />
                <span className="truncate">{conv}</span>
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
          <span className="ml-3 text-sm font-medium" style={{ color: "hsl(220, 14%, 90%)" }}>
            {activeTool.name}
          </span>
        </div>

        <ChatMessages activeTool={activeTool} />

        {/* Input area */}
        <div className="p-4 shrink-0">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center gap-2 rounded-xl px-4 py-3" style={{ background: "hsl(220, 16%, 16%)", border: "1px solid hsl(220, 14%, 22%)" }}>
              <input
                type="text"
                placeholder={`Posez votre question à ${activeTool.shortName}…`}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "hsl(220, 14%, 90%)" }}
              />
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ background: activeTool.color }}
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Proposition1;
