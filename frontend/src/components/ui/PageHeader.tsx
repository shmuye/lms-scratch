type PageHeaderProps = {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
};

const PageHeader = ({ title, subtitle, actions }: PageHeaderProps) => (
  <div className="page-header sm:flex sm:items-center sm:justify-between gap-4">
    <div>
      <h1 className="page-title">{title}</h1>
      {subtitle && <p className="page-subtitle">{subtitle}</p>}
    </div>
    {actions && <div className="shrink-0">{actions}</div>}
  </div>
);

export default PageHeader;
