import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { showError, showSuccess } from "../utils";
import { verifyEmail } from "../services/auth.api";
import { useEffect } from "react";
import { MailCheck, Loader2, XCircle, CheckCircle2 } from "lucide-react";
import AuthCard from "./ui/AuthCard";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  const navigate = useNavigate();

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => verifyEmail(token as string),
    enabled: !!token,
    retry: false,
  });

  useEffect(() => {
    if (isSuccess) {
      showSuccess("Email verified successfully");
      setTimeout(() => navigate("/login"), 2000);
    }
    if (isError) showError("Invalid or expired link");
  }, [isSuccess, isError, navigate]);

  if (!token) {
    return (
      <AuthCard
        icon={<XCircle size={24} className="text-danger-500" />}
        title="Invalid link"
        subtitle="This verification link is invalid or missing."
        footer={
          <Link to="/signup" className="btn-primary w-full text-center">
            Create Account
          </Link>
        }
      >
        <></>
      </AuthCard>
    );
  }

  const icon = isLoading ? (
    <Loader2 className="animate-spin" size={24} />
  ) : isSuccess ? (
    <CheckCircle2 className="text-success-600" size={24} />
  ) : isError ? (
    <XCircle className="text-danger-500" size={24} />
  ) : (
    <MailCheck size={24} />
  );

  const title = isLoading
    ? "Verifying email"
    : isSuccess
      ? "Email verified"
      : isError
        ? "Verification failed"
        : "Verify email";

  const subtitle = isLoading
    ? "Please wait while we verify your email address."
    : isSuccess
      ? "Redirecting you to sign in..."
      : isError
        ? "This link is invalid or has expired."
        : "Checking your verification token.";

  return (
    <AuthCard
      icon={icon}
      title={title}
      subtitle={subtitle}
      footer={
        (isSuccess || isError) ? (
          <Link to="/login" className="btn-primary w-full text-center">
            Go to Sign In
          </Link>
        ) : undefined
      }
    >
      {isLoading && (
        <p className="text-sm text-center text-slate-500 flex items-center justify-center gap-2">
          <Loader2 size={16} className="animate-spin" aria-hidden />
          Processing...
        </p>
      )}
    </AuthCard>
  );
};

export default VerifyEmail;
