"use client";

/** Small stand-in for the app's toast: a message bottom-right for 4 seconds. */
function show(kind: "success" | "error", title: string, description?: string) {
  if (typeof document === "undefined") return;
  const el = document.createElement("div");
  el.setAttribute("role", "status");
  el.className =
    "fixed bottom-6 right-6 z-[10000] max-w-sm rounded-xl px-4 py-3 shadow-lg text-white " +
    (kind === "success" ? "bg-emerald-600" : "bg-rose-600");
  el.innerHTML = "";
  const t = document.createElement("p");
  t.className = "font-semibold";
  t.textContent = title;
  el.appendChild(t);
  if (description) {
    const d = document.createElement("p");
    d.className = "text-sm opacity-90";
    d.textContent = description;
    el.appendChild(d);
  }
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 4000);
}

export function useAppToast() {
  return {
    success: (title: string, description?: string) => show("success", title, description),
    error: (title: string, description?: string) => show("error", title, description),
  };
}
