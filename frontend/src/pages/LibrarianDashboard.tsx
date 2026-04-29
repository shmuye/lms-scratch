import { useState } from "react";
import { Profile, Borrows, ReturnRequest } from "../components";

const tabs = [
  { label: "Return Requests", value: "requests" },
  { label: "Profile", value: "profile" },
  { label: "Borrowed Books", value: "borrowed" },
];

const LibrarianDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 flex flex-col gap-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
          Librarian Dashboard
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage book returns and your profile
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 bg-white border border-primary-100 rounded-xl p-2 shadow-sm w-fit">
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

      <div className="bg-white border border-primary-100 rounded-xl shadow-sm p-4 sm:p-6">
        {activeTab === "requests" && <ReturnRequest />}

        {activeTab === "profile" && (
          <div className="text-gray-500 text-sm">
            <Profile />
          </div>
        )}

        {activeTab === "borrowed" && (
          <div className="text-gray-500 text-sm">
            <Borrows />
          </div>
        )}
      </div>
    </div>
  );
};

export default LibrarianDashboard;
