import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUserByAdmin } from "../services/users.api";
import { useState } from "react";
import { showError, showSuccess } from "../utils";
import Modal from "./ui/Modal";
import { UserPlus } from "lucide-react";

type Props = { onClose: () => void };

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
    <Modal
      title="Add Librarian"
      size="md"
      onClose={onClose}
      icon={
        <UserPlus className="text-primary-600 shrink-0" size={20} aria-hidden />
      }
      footer={
        <>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary w-full sm:w-auto"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="create-librarian-form"
            disabled={isPending}
            className="btn-primary w-full sm:w-auto"
          >
            {isPending ? "Creating..." : "Add Librarian"}
          </button>
        </>
      }
    >
      <form
        id="create-librarian-form"
        onSubmit={(e) => {
          e.preventDefault();
          mutate({ email, password, name, role: "LIBRARIAN" });
        }}
        className="space-y-4"
      >
        <div>
          <label className="label" htmlFor="lib-name">
            Full name
          </label>
          <input
            id="lib-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input"
            placeholder="Jane Doe"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="lib-email">
            Email
          </label>
          <input
            id="lib-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="librarian@library.com"
            required
          />
        </div>
        <div>
          <label className="label" htmlFor="lib-password">
            Password
          </label>
          <input
            id="lib-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="••••••••"
            required
          />
        </div>
      </form>
    </Modal>
  );
};

export default CreateLibrarian;
