import { useState } from "react";
import Users, { numberOfUsers } from "../components/Users";
import { numberOfBooks } from "./BooksPage";
import { BookOpen, User2 } from "lucide-react";
import CreateLibrarian from "../components/CreateLibrarian";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";

const tabs = [
  { label: "Users", value: "users" },
  { label: "Books", value: "books" },
  { label: "Borrows", value: "borrowed" },
];

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [openModal, setOpenModal] = useState(false);

  return (
    <PageContainer>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage users, books, and borrowing activity"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="stat-card">
          <div>
            <p className="text-sm text-gray-500">Total Users</p>
            <p className="text-2xl font-semibold text-gray-900">
              {numberOfUsers ?? 0}
            </p>
          </div>
          <div className="stat-icon">
            <User2 size={18} />
          </div>
        </div>

        <div className="stat-card">
          <div>
            <p className="text-sm text-gray-500">Total Books</p>
            <p className="text-2xl font-semibold text-gray-900">
              {numberOfBooks ?? 0}
            </p>
          </div>
          <div className="stat-icon">
            <BookOpen size={18} />
          </div>
        </div>
      </div>

      <div className="tabs w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`tab ${activeTab === tab.value ? "tab-active" : ""}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "users" && (
        <div className="flex justify-end">
          <button
            onClick={() => setOpenModal(true)}
            className="btn-primary btn-sm"
          >
            + Create Librarian
          </button>
        </div>
      )}

      <div className="card card-body">
        {activeTab === "users" && <Users />}
        {activeTab === "books" && (
          <div className="empty-state">
            <p className="empty-state-title">Books management</p>
            <p className="empty-state-text">Coming soon...</p>
          </div>
        )}
        {activeTab === "borrowed" && (
          <div className="empty-state">
            <p className="empty-state-title">Borrowed books</p>
            <p className="empty-state-text">Coming soon...</p>
          </div>
        )}
      </div>

      {openModal && <CreateLibrarian onClose={() => setOpenModal(false)} />}
    </PageContainer>
  );
};

export default AdminPage;
