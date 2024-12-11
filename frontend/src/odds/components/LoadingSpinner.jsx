import { Loader2 } from 'lucide-react';

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      <span className="ml-2 text-lg text-gray-200">Loading matches...</span>
    </div>
  );
}