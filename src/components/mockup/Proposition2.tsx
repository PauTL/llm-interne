import { useState, useRef, useEffect } from "react";
import { ChevronDown, Plus, MessageSquare, Search, Menu } from "lucide-react";
import { tools, Tool } from "@/data/tools";
import ChatMessages from "./ChatMessages";

const Proposition2 = () => {
  const [activeTool, setActiveTool] = useState<Tool>(tools[0]);
  const [chipOpen, setChipOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const chipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (chipRef.current && !chipRef.current.contains(e.target as Node)) {
        setChipOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const conversations = [
    "Comment poser des congés ?",
    "Résumé réunion Q1",
    "Créer campagne été 2026",
    "Question sur le télétravail",
  ];

  return (
    <div className="flex h-full rounded-xl overflow-hidden border" style={{ borderColor: "hsl(220, 14%, 20%)" }}>
      {/* Sidebar — no tool selector here */}
      {sidebarOpen && (
        <div className="w-64 flex flex-col shrink-0" style={{ background: "hsl(220, 18%, 9%)" }}>
          {/* New chat */}
          <div className="p-3 border-b" style={{ borderColor: "hsl(220, 14%, 16%)" }}>
            <button
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

        {/* Input area with chip */}
        <div className="p-4 shrink-0">
          <div className="max-w-2xl mx-auto">
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2.5"
              style={{ background: "hsl(220, 16%, 16%)", border: "1px solid hsl(220, 14%, 22%)" }}
            >
              {/* Tool chip */}
              <div className="relative" ref={chipRef}>
                <button
                  onClick={() => setChipOpen(!chipOpen)}
                  className="flex items-center gap-1.5 rounded-full pl-1.5 pr-2.5 py-1 text-xs font-medium transition-all shrink-0"
                  style={{
                    background: `${activeTool.color}20`,
                    color: activeTool.color,
                    border: `1px solid ${activeTool.color}40`,
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: activeTool.color }}
                  >
                    <activeTool.icon className="w-3 h-3 text-white" />
                  </div>
                  {activeTool.shortName}
                  <ChevronDown
                    className="w-3 h-3 transition-transform"
                    style={{ transform: chipOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {/* Popover */}
                {chipOpen && (
                  <div
                    className="absolute bottom-full left-0 mb-2 w-72 rounded-xl overflow-hidden shadow-2xl z-20"
                    style={{ background: "hsl(220, 18%, 14%)", border: "1px solid hsl(220, 14%, 22%)" }}
                  >
                    <div className="px-3 pt-3 pb-2">
                      <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "hsl(220, 10%, 45%)" }}>
                        Choisir un outil
                      </span>
                    </div>
                    <div className="px-1.5 pb-1.5 grid grid-cols-1 gap-0.5">
                      {tools.map((tool) => (
                        <div
                          key={tool.id}
                          className="flex items-center gap-3 px-2.5 py-2.5 rounded-lg cursor-pointer transition-colors"
                          style={{
                            background: tool.id === activeTool.id ? "hsl(220, 16%, 20%)" : "transparent",
                          }}
                          onMouseEnter={(e) => {
                            if (tool.id !== activeTool.id) e.currentTarget.style.background = "hsl(220, 16%, 18%)";
                          }}
                          onMouseLeave={(e) => {
                            if (tool.id !== activeTool.id) e.currentTarget.style.background = "transparent";
                          }}
                          onClick={() => {
                            setActiveTool(tool);
                            setChipOpen(false);
                          }}
                        >
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                            style={{ backgroundColor: tool.color }}
                          >
                            <tool.icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium" style={{ color: "hsl(220, 14%, 90%)" }}>
                              {tool.name}
                            </div>
                            <div className="text-xs" style={{ color: "hsl(220, 10%, 50%)" }}>
                              {tool.description}
                            </div>
                          </div>
                          {tool.id === activeTool.id && (
                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: tool.color }} />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <input
                type="text"
                placeholder={`Posez votre question…`}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: "hsl(220, 14%, 90%)" }}
              />
              <button
                className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
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

export default Proposition2;
