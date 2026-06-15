import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { resetAuth } from "../features/auth/auth.slice";
import { setAuthSessionHandlers } from "../services/authSession";

const AuthSessionSetup = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    setAuthSessionHandlers({
      onSessionExpired: () => {
        dispatch(resetAuth());
        navigate("/login", { replace: true });
      },
    });

    return () => setAuthSessionHandlers({});
  }, [dispatch, navigate]);

  return null;
};

export default AuthSessionSetup;
