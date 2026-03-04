import { selectUser } from "../features/auth/auth.slice";
import { useAppSelector } from "../hooks/hooks";

type ProtectedProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

const Protected: React.FC<ProtectedProps> = ({ allowedRoles, children }) => {
  const user = useAppSelector(selectUser);
  if (!user) return;
  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default Protected;
