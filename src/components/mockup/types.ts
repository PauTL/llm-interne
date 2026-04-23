import { LucideIcon } from "lucide-react";
import { Tool } from "@/data/tools";

export interface DisplayInfo {
  color: string;
  icon: LucideIcon;
  name: string;
  shortName: string;
  description: string;
}

export interface Conversation {
  id: string;
  label: string;
  tool: Tool;
  projectId?: string;
}

export interface Project {
  id: string;
  title: string;
  instruction: string;
}
