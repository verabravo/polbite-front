import { useState } from "react";
import DietTab from "./DietTab";
import ProgressTab from "./ProgressTab";

export default function MainTabsScreen() {
  const [activeTab, setActiveTab] = useState<"diet" | "progress" | "history" | "profile">("diet");

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col">
      {/* Main content area */}
      <div className="flex-1 overflow-y-auto pb-20">
        {activeTab === "diet" && <DietTab />}
        {activeTab === "progress" && <ProgressTab />}
        {activeTab === "history" && (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#6b7058]">Historial - Coming soon</p>
          </div>
        )}
        {activeTab === "profile" && (
          <div className="flex items-center justify-center h-full">
            <p className="text-[#6b7058]">Perfil - Coming soon</p>
          </div>
        )}
      </div>

      {/* Bottom tab bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#e8e5df] px-4 py-3 flex justify-around items-center">
        <button
          onClick={() => setActiveTab("diet")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === "diet" ? "text-[#7a956b]" : "text-[#6b7058]/60"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 3v18M3 12h18" />
          </svg>
          <span className="text-xs font-medium">Dieta</span>
        </button>

        <button
          onClick={() => setActiveTab("progress")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === "progress" ? "text-[#7a956b]" : "text-[#6b7058]/60"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path d="M3 3v16a2 2 0 0 0 2 2h16" />
            <path d="m19 9-5 5-4-4-3 3" />
          </svg>
          <span className="text-xs font-medium">Progreso</span>
        </button>

        <button
          onClick={() => setActiveTab("history")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === "history" ? "text-[#7a956b]" : "text-[#6b7058]/60"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M12 6v6l4 2" />
          </svg>
          <span className="text-xs font-medium">Historial</span>
        </button>

        <button
          onClick={() => setActiveTab("profile")}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === "profile" ? "text-[#7a956b]" : "text-[#6b7058]/60"
          }`}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <circle cx="12" cy="8" r="4" />
            <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
          </svg>
          <span className="text-xs font-medium">Perfil</span>
        </button>
      </div>
    </div>
  );
}
