const Loader = ({ label = "Loading..." }: { label?: string }) => {
  return (
    <div
      className="flex flex-col justify-center items-center py-16 sm:py-24 gap-4"
      role="status"
      aria-live="polite"
    >
      <div className="spinner" aria-hidden />
      <p className="text-sm text-slate-500">{label}</p>
    </div>
  );
};

export default Loader;
