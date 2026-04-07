import { Tool } from "@/data/tools";

interface ChatMessagesProps {
  activeTool: Tool;
}

const ChatMessages = ({ activeTool }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {/* AI greeting */}
      <div className="flex gap-3 max-w-2xl">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: activeTool.color }}
        >
          <activeTool.icon className="w-4 h-4 text-white" />
        </div>
        <div className="rounded-2xl rounded-tl-md px-4 py-3 text-sm" style={{ background: "hsl(220, 16%, 18%)", color: "hsl(220, 14%, 90%)" }}>
          Bonjour ! Je suis <strong>{activeTool.name}</strong>. {activeTool.description}. Comment puis-je vous aider ?
        </div>
      </div>

      {/* User message */}
      <div className="flex justify-end">
        <div className="rounded-2xl rounded-tr-md px-4 py-3 text-sm max-w-md" style={{ background: "hsl(217, 91%, 55%)", color: "white" }}>
          Bonjour, j'ai une question.
        </div>
      </div>

      {/* AI response */}
      <div className="flex gap-3 max-w-2xl">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: activeTool.color }}
        >
          <activeTool.icon className="w-4 h-4 text-white" />
        </div>
        <div className="rounded-2xl rounded-tl-md px-4 py-3 text-sm" style={{ background: "hsl(220, 16%, 18%)", color: "hsl(220, 14%, 90%)" }}>
          Bien sûr, je suis là pour vous aider. N'hésitez pas à me poser votre question !
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
