import { useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/hooks";
import { useNavigate } from "react-router-dom";
import { selectUser, resetAuth } from "../features/auth/auth.slice";
import { deleteAccount as apiDeleteAccount } from "../services/users.api";
import { showError, showSuccess } from "../utils";
import Modal from "./ui/Modal";
import Badge from "./ui/Badge";

const Profile = () => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const roleVariant = () => {
    if (user?.role === "ADMIN") return "danger" as const;
    if (user?.role === "LIBRARIAN") return "info" as const;
    return "primary" as const;
  };

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "?";

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-md card card-body flex flex-col items-center gap-6">
        {user?.avatar ? (
          <img
            src={user.avatar}
            alt=""
            className="w-20 h-20 rounded-full object-cover ring-4 ring-primary-50 border-2 border-white shadow-md"
          />
        ) : (
          <div
            className="w-20 h-20 rounded-full bg-primary-600 text-white text-2xl font-bold flex items-center justify-center ring-4 ring-primary-50 shadow-md"
            aria-hidden
          >
            {firstLetter}
          </div>
        )}

        <div className="text-center">
          <h3 className="text-lg font-semibold text-slate-900">{user?.name}</h3>
          <p className="text-sm text-slate-500 mt-1">{user?.email}</p>
          {user?.role && (
            <div className="mt-3">
              <Badge variant={roleVariant()}>{user.role}</Badge>
            </div>
          )}
        </div>

        <div className="w-full space-y-4">
          <div>
            <label className="label" htmlFor="profile-name">Name</label>
            <input id="profile-name" type="text" value={user?.name || ""} readOnly className="input-readonly" />
          </div>
          <div>
            <label className="label" htmlFor="profile-email">Email</label>
            <input id="profile-email" type="email" value={user?.email || ""} readOnly className="input-readonly" />
          </div>
        </div>
        <div className="w-full flex justify-center mt-4">
          <button
            className="btn btn-error"
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete Account
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <Modal
          title="Delete Account"
          size="sm"
          onClose={() => setShowDeleteConfirm(false)}
          icon={
            <div className="text-primary-600 shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5"
                aria-hidden
              >
                <path
                  fillRule="evenodd"
                  d="M9.75 6.75a.75.75 0 0 0-1.5 0v.75H6.75A2.25 2.25 0 0 0 4.5 9.75v1.5h15v-1.5A2.25 2.25 0 0 0 17.25 7.5h-1.5v-.75a.75.75 0 0 0-1.5 0v.75h-3v-.75zM7.5 12a.75.75 0 0 1 .75-.75h7.5A.75.75 0 0 1 16.5 12v7.5a2.25 2.25 0 0 1-2.25 2.25h-6A2.25 2.25 0 0 1 6 19.5V12z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          }
          footer={
            <>
              <button
                type="button"
                className="btn btn-secondary w-full sm:w-auto"
                onClick={() => setShowDeleteConfirm(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary w-full sm:w-auto"
                onClick={async () => {
                  try {
                    await apiDeleteAccount();
                    setShowDeleteConfirm(false);
                    dispatch(resetAuth());
                    navigate("/login");
                    showSuccess("Your account has been deleted.");
                  } catch (err: any) {
                    const message =
                      err?.response?.data?.message ?? err?.message ?? "Deletion failed";
                    showError(message);
                  }
                }}
              >
                Confirm Delete
              </button>
            </>
          }
        >
          <p className="text-slate-700">
            Deleting your account will remove all your profile information and
            borrowing history. This action <span className="font-semibold text-danger-600">cannot be undone</span>.
          </p>
        </Modal>
      )}
    </div>
  );
};

export default Profile;
