import { AlertCircle } from "lucide-react";

const ErrorAlert = ({ error, onClose }) => (
  <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
    <div className="flex items-center">
      <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
      <div className="flex-1">
        <h3 className="text-sm font-medium text-red-800">Error</h3>
        <p className="text-sm text-red-700 mt-1">{error}</p>
      </div>
      <button onClick={onClose} className="text-red-400 hover:text-red-600">
        ×
      </button>
    </div>
  </div>
);

export default ErrorAlert;