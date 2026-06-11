import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { showError, showSuccess } from "../utils";
import { verifyEmail } from "../services/auth.api";
import { useEffect } from "react";
import { MailCheck, Loader2, XCircle, CheckCircle2 } from "lucide-react";

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
    if (isError) {
      showError("Invalid or expired link");
    }
  }, [isSuccess, isError, navigate]);

  if (!token) {
    return (
      <div className="auth-card text-center">
        <div className="p-3 rounded-full bg-danger-100 mx-auto w-fit">
          <XCircle className="text-danger-500" size={28} />
        </div>

        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Invalid Link</h1>
          <p className="text-sm text-gray-500 mt-2">
            This verification link is invalid or missing.
          </p>
        </div>

        <Link to="/signup" className="btn-primary w-full">
          Create Account
        </Link>
      </div>
    );
  }

  return (
    <div className="auth-card text-center">
      <div
        className={`p-3 rounded-full mx-auto w-fit ${
          isSuccess
            ? "bg-success-100"
            : isError
              ? "bg-danger-100"
              : "bg-primary-100"
        }`}
      >
        {isLoading && (
          <Loader2 className="text-primary-600 animate-spin" size={28} />
        )}
        {isSuccess && <CheckCircle2 className="text-success-500" size={28} />}
        {isError && <XCircle className="text-danger-500" size={28} />}
      </div>

      <div>
        {isLoading && (
          <>
            <h1 className="text-2xl font-semibold text-gray-900">
              Verifying Email
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Please wait while we verify your email address.
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <h1 className="text-2xl font-semibold text-gray-900">
              Email Verified
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              Your email has been successfully verified. Redirecting to login...
            </p>
          </>
        )}

        {isError && (
          <>
            <h1 className="text-2xl font-semibold text-gray-900">
              Verification Failed
            </h1>
            <p className="text-sm text-gray-500 mt-2">
              This verification link is invalid or has expired.
            </p>
          </>
        )}
      </div>

      {(isSuccess || isError) && (
        <Link to="/login" className="btn-primary w-full">
          Go to Login
        </Link>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-sm text-primary-600">
          <MailCheck size={18} />
          <span>Checking verification token...</span>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
