import { useState } from "react";
import { Header } from "./components/Header";
import { InputForm } from "./components/InputForm";
import { ResultsDisplay } from "./components/ResultsDisplay";
import { generateSuggestions, SuggestionResponse } from "./services/gemini";
import { motion } from "motion/react";
import { Loader2 } from "lucide-react";

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<SuggestionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: { companyName: string; jobDescription: string; resume: string }) => {
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await generateSuggestions(data.companyName, data.jobDescription, data.resume);
      setResults(response);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900 selection:bg-blue-100 selection:text-blue-900">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="text-center space-y-4 mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl"
            >
              Land Your Dream Job
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-500 max-w-2xl mx-auto"
            >
              Get AI-powered project suggestions tailored to specific companies and job descriptions.
            </motion.p>
          </div>

          <InputForm onSubmit={handleSubmit} isLoading={isLoading} />

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md shadow-sm"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700 font-medium">{error}</p>
                </div>
              </div>
            </motion.div>
          )}

          {isLoading && (
            <div className="flex flex-col justify-center items-center py-12 space-y-4">
              <Loader2 className="animate-spin text-blue-600" size={48} />
              <p className="text-gray-500 animate-pulse">Analyzing company data & matching your profile...</p>
            </div>
          )}

          {results && !isLoading && (
            <ResultsDisplay markdown={results.markdown} groundingMetadata={results.groundingMetadata} />
          )}
        </div>
      </main>
    </div>
  );
}
