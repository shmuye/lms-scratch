type AuthCardProps = {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

const AuthCard = ({ icon, title, subtitle, children, footer }: AuthCardProps) => (
  <div className="auth-card">
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="p-3 rounded-xl bg-primary-50 text-primary-600">{icon}</div>
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-900">{title}</h1>
        {subtitle && (
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">{subtitle}</p>
        )}
      </div>
    </div>
    {children}
    {footer}
  </div>
);

export default AuthCard;
