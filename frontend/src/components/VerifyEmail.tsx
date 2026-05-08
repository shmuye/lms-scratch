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

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }

    if (isError) {
      showError("Invalid or expired link");
    }
  }, [isSuccess, isError, navigate]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-5 text-center">
          <div className="p-3 rounded-full bg-danger-100">
            <XCircle className="text-danger-500" size={28} />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-gray-900">
              Invalid Link
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              This verification link is invalid or missing.
            </p>
          </div>

          <Link
            to="/signup"
            className="w-full py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition"
          >
            Create Account
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center gap-6 text-center">
        {/* Icon */}
        <div
          className={`p-3 rounded-full ${
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

        {/* Content */}
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
                Your email has been successfully verified. Redirecting to
                login...
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

        {/* Actions */}
        {(isSuccess || isError) && (
          <Link
            to="/login"
            className="w-full py-2.5 rounded-lg bg-primary-600 text-white font-medium hover:bg-primary-700 transition"
          >
            Go to Login
          </Link>
        )}

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-primary-600">
            <MailCheck size={18} />
            <span>Checking verification token...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerifyEmail;
