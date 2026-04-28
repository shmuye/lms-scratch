import { useState } from "react";
import Users, { numberOfUsers } from "../components/Users";
import Books, { numberOfBooks } from "./BooksPage";
import { BookOpen, User2 } from "lucide-react";

import CreateLibrarian from "../components/CreateLibrarian";

const tabs = [
  { label: "Users", value: "users" },
  { label: "Books", value: "books" },
  { label: "Borrows", value: "borrowed" },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage users, books, and borrowing activity
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Total Users */}
        <div className="bg-white border border-primary-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900">
              {numberOfUsers ?? 0}
            </p>
          </div>

          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
            <User2 size={18} />
          </div>
        </div>

        {/* Total Books */}
        <div className="bg-white border border-primary-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Books</p>
            <p className="text-2xl font-semibold text-gray-900">
              {numberOfBooks ?? 0}
            </p>
          </div>

          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-primary-100 text-primary-600">
            <BookOpen size={18} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border border-primary-100 shadow-sm w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              activeTab === tab.value
                ? "bg-primary-600 text-white shadow"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Actions (only for users tab) */}
      {activeTab === "users" && (
        <div className="flex justify-end">
          <button
            onClick={() => setOpenModal(true)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition"
          >
            + Create Librarian
          </button>
        </div>
      )}

      {/* Content */}
      <div className="bg-white rounded-xl border border-primary-100 shadow-sm p-4 sm:p-6">
        {activeTab === "users" && <Users />}
        {activeTab === "books" && <p>Books management coming soon...</p>}
        {activeTab === "borrowed" && <p>Borrowed books coming soon...</p>}
      </div>

      {/* Modal */}
      {openModal && <CreateLibrarian onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default AdminPage;
