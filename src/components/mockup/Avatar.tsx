import { AppUser } from "./types";
import { getInitials } from "./users";

interface AvatarProps {
  user: AppUser;
  size?: number;
  ring?: boolean;
}

const Avatar = ({ user, size = 24, ring = false }: AvatarProps) => (
  <div
    className="rounded-full flex items-center justify-center text-white font-medium shrink-0"
    style={{
      backgroundColor: user.avatarColor,
      width: size,
      height: size,
      fontSize: size * 0.42,
      boxShadow: ring ? "0 0 0 2px hsl(220, 18%, 9%)" : undefined,
    }}
    title={user.name}
  >
    {getInitials(user.name)}
  </div>
);

export default Avatar;
