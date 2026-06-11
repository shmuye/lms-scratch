type PageContainerProps = {
  children: React.ReactNode;
  className?: string;
};

const PageContainer = ({ children, className = "" }: PageContainerProps) => (
  <div className={`page-container min-w-0 ${className}`}>{children}</div>
);

export default PageContainer;
