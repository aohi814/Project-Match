import { FileText, Briefcase, Search } from "lucide-react";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 py-4 px-6 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 p-2 rounded-lg text-white">
            <Briefcase size={24} />
          </div>
          <h1 className="text-xl font-bold text-gray-900">Resume Project Matcher</h1>
        </div>
        <div className="text-sm text-gray-500 hidden sm:block">
          Tailor your resume with AI-powered insights
        </div>
      </div>
    </header>
  );
}
