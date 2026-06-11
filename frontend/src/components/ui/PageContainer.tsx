type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer = ({ children, className = "" }: PageContainerProps) => (
  <div className={`page-container ${className}`}>{children}</div>
);

export default PageContainer;
