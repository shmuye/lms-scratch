import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserByAdmin } from "../services/users.api";
import { useState } from "react";
import { showError, showSuccess } from "../utils";

type Props = {
  onClose: () => void;
};

const CreateLibrarian = ({ onClose }: Props) => {
  const queryClient = useQueryClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const { mutate, isPending } = useMutation({
    mutationFn: createUserByAdmin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      showSuccess("Librarian created successfully!");
      onClose();
    },
    onError: (error: any) => {
      showError(error.message || "Error creating librarian");
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      {/* Modal Card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8 flex flex-col gap-5 animate-fadeIn">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Create Librarian
          </h2>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            mutate({ email, password, name, role: "LIBRARIAN" });
          }}
          className="flex flex-col gap-4"
        >
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />

          {/* Buttons */}
          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="w-full py-2 rounded-lg bg-primary-600 text-white hover:bg-primary-700 transition disabled:opacity-50"
            >
              {isPending ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLibrarian;
