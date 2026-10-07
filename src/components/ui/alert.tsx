"use client";

type AlertType = "success" | "error";

interface AlertProps {
  message?: string | null;
  type?: AlertType;
  onClose?: () => void;
}

export function Alert({ message, type = "success", onClose }: AlertProps) {
  if (!message) return null;

  const success = type === "success";
  return <div role={success ? "status" : "alert"} className="fixed right-4 top-4 z-[100]">
    <div className={`flex items-center gap-3 rounded-xl border-l-4 bg-white p-4 shadow-lg ${success ? "border-emerald-500" : "border-rose-500"}`}>
      <span className={`rounded-full p-1.5 ${success ? "bg-emerald-50 text-emerald-500" : "bg-rose-50 text-rose-500"}`} aria-hidden="true">
        {success ? <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          : <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
      </span>
      <p className="text-sm font-bold text-slate-800">{message}</p>
      {onClose && <button type="button" onClick={onClose} aria-label="Dismiss alert" className="ml-4 text-slate-400 hover:text-slate-600 focus-visible:outline-2 focus-visible:outline-indigo-500">
        <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
      </button>}
    </div>
  </div>;
}
