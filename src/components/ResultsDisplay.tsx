import ReactMarkdown from "react-markdown";
import { motion } from "motion/react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface ResultsDisplayProps {
  markdown: string;
  groundingMetadata?: any;
}

export function ResultsDisplay({ markdown, groundingMetadata }: ResultsDisplayProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(markdown);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 mt-8 relative overflow-hidden"
    >
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={handleCopy}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
          title="Copy to clipboard"
        >
          {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
        </button>
      </div>

      <div className="prose prose-blue max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-p:text-gray-600 prose-li:text-gray-600">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>

      {groundingMetadata && groundingMetadata.groundingChunks && (
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h4 className="text-sm font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <ExternalLink size={14} />
            Sources & References
          </h4>
          <div className="flex flex-wrap gap-2">
            {groundingMetadata.groundingChunks.map((chunk: any, index: number) => (
              chunk.web?.uri && (
                <a
                  key={index}
                  href={chunk.web.uri}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded-full border border-gray-200 transition-colors truncate max-w-[200px]"
                >
                  {chunk.web.title || chunk.web.uri}
                </a>
              )
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}
