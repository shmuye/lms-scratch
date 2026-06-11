import { useState } from "react";
import { Profile, Borrows, ReturnRequest } from "../components";
import PageContainer from "../components/ui/PageContainer";
import PageHeader from "../components/ui/PageHeader";

const tabs = [
  { label: "Return Requests", value: "requests" },
  { label: "Profile", value: "profile" },
  { label: "Borrowed Books", value: "borrowed" },
];

const LibrarianDashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");

  return (
    <PageContainer>
      <PageHeader
        title="Librarian Dashboard"
        subtitle="Manage book returns and your profile"
      />

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

      <div className="card card-body">
        {activeTab === "requests" && <ReturnRequest />}
        {activeTab === "profile" && <Profile />}
        {activeTab === "borrowed" && <Borrows />}
      </div>
    </PageContainer>
  );
};

export default LibrarianDashboard;
