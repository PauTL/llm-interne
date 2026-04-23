import { AppUser } from "./types";

export const CURRENT_USER_ID = "u_me";

export const directory: AppUser[] = [
  { id: "u_me", name: "Vous", email: "vous@entreprise.com", avatarColor: "#3232FF" },
  { id: "u_alice", name: "Alice Martin", email: "alice.martin@entreprise.com", avatarColor: "#FFBF0A" },
  { id: "u_bob", name: "Bob Durand", email: "bob.durand@entreprise.com", avatarColor: "#9900FF" },
  { id: "u_chloe", name: "Chloé Petit", email: "chloe.petit@entreprise.com", avatarColor: "hsl(142, 71%, 45%)" },
  { id: "u_david", name: "David Leroy", email: "david.leroy@entreprise.com", avatarColor: "hsl(350, 89%, 60%)" },
  { id: "u_emma", name: "Emma Roux", email: "emma.roux@entreprise.com", avatarColor: "hsl(25, 95%, 53%)" },
];

export const getUser = (id: string): AppUser | undefined =>
  directory.find((u) => u.id === id);

export const getInitials = (name: string): string =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
