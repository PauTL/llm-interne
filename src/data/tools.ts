import { Bot, Users, Megaphone, FileText, Shield } from "lucide-react";

export interface Tool {
  id: string;
  name: string;
  shortName: string;
  description: string;
  icon: typeof Bot;
  color: string; // tailwind hsl token-friendly
}

export const tools: Tool[] = [
  {
    id: "assistant",
    name: "Assistant IA interne",
    shortName: "Assistant IA",
    description: "Posez vos questions génériques à l'IA",
    icon: Bot,
    color: "hsl(217, 91%, 60%)",
  },
  {
    id: "rh",
    name: "LLM RH",
    shortName: "RH",
    description: "Recherchez des informations RH",
    icon: Users,
    color: "hsl(142, 71%, 45%)",
  },
  {
    id: "campaign",
    name: "LLM Créateur de campagne",
    shortName: "Campagne",
    description: "Créez des campagnes Facebook via MCP",
    icon: Megaphone,
    color: "hsl(25, 95%, 53%)",
  },
  {
    id: "legal",
    name: "LLM Juridique",
    shortName: "Juridique",
    description: "Consultez la documentation juridique",
    icon: FileText,
    color: "hsl(262, 83%, 58%)",
  },
  {
    id: "compliance",
    name: "LLM Conformité",
    shortName: "Conformité",
    description: "Vérifiez la conformité réglementaire",
    icon: Shield,
    color: "hsl(350, 89%, 60%)",
  },
];
