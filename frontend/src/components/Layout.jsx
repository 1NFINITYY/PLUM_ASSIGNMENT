
export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-3xl bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl p-6 md:p-8">
        <header className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl md:text-2xl font-semibold">
              AI-Powered Benefits Assistant
            </h1>
            <p className="text-sm text-slate-400">
              Describe your health need and discover your benefits.
            </p>
          </div>
          <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
            SDE Intern Assignment
          </span>
        </header>
        {children}
      </div>
    </div>
  );
}
