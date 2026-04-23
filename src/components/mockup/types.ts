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

export type AppRole = "editor" | "user";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatarColor: string;
}

export interface Project {
  id: string;
  title: string;
  instruction: string;
  ownerId: string;
  memberIds: string[];
}
