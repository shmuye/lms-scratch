import React from "react";

const BooksPageLayout = ({ children }: { children: React.ReactNode }) => {
  return <div className="flex">{children}</div>;
};

export default BooksPageLayout;
