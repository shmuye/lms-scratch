import { useSearchParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { showError, showSuccess } from "../utils";
import { verifyEmail } from "../services/auth.api";
import { useEffect } from "react";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => verifyEmail(token as string),
    enabled: !!token, // only run if token exists
    retry: false, // don't retry invalid tokens
  });

  // side effects (toast + redirect)
  useEffect(() => {
    if (isSuccess) {
      showSuccess("Email verified successfully");
      setTimeout(() => navigate("/login"), 2000);
    }

    if (isError) {
      showError("Invalid or expired link");
    }
  }, [isSuccess, isError, navigate]);

  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        Invalid verification link
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      {isLoading && <p>Verifying your email...</p>}
      {isSuccess && (
        <p className="text-success-500">Email verified! Redirecting...</p>
      )}
      {isError && <p className="text-danger-500">Verification failed</p>}
    </div>
  );
};

export default VerifyEmail;
