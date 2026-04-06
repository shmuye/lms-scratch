import { useState } from "react";
import Users from "../components/Users";

const tabs = [
  { label: "Users", value: "users" },
  { label: "Books", value: "books" },
  { label: "Borrowing History", value: "history" },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users");

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

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white p-2 rounded-xl border border-primary-100 shadow-sm w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`
              px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                activeTab === tab.value
                  ? "bg-primary-600 text-white shadow"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-xl border border-primary-100 shadow-sm p-4 sm:p-6">
        {activeTab === "users" && <Users />}
        {activeTab === "books" && (
          <p className="text-gray-500">Books management coming soon...</p>
        )}
        {activeTab === "history" && (
          <p className="text-gray-500">Borrowing history coming soon...</p>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
