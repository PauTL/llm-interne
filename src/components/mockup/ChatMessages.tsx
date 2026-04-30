import { LucideIcon } from "lucide-react";

interface ChatMessagesProps {
  toolName: string;
  toolDescription: string;
  displayColor: string;
  DisplayIcon: LucideIcon;
}

const ChatMessages = ({ toolName, toolDescription, displayColor, DisplayIcon }: ChatMessagesProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-4">
      {/* AI greeting */}
      <div className="flex gap-3 max-w-2xl">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5"
          style={{ backgroundColor: displayColor }}
        >
          <DisplayIcon className="w-4 h-4 text-white" />
        </div>
        <div className="rounded-2xl rounded-tl-md px-4 py-3 text-sm" style={{ background: "hsl(220, 16%, 95%)", color: "hsl(220, 20%, 18%)" }}>
          Bonjour ! Je suis <strong>{toolName}</strong>. {toolDescription}. Comment puis-je vous aider ?
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
          style={{ backgroundColor: displayColor }}
        >
          <DisplayIcon className="w-4 h-4 text-white" />
        </div>
        <div className="rounded-2xl rounded-tl-md px-4 py-3 text-sm" style={{ background: "hsl(220, 16%, 95%)", color: "hsl(220, 20%, 18%)" }}>
          Bien sûr, je suis là pour vous aider. N'hésitez pas à me poser votre question !
        </div>
      </div>
    </div>
  );
};

export default ChatMessages;
