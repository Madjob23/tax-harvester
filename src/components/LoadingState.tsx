export default function LoadingState() {
  return (
    <div className="flex items-center justify-center min-h-64 py-12">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-t-blue-600 border-blue-200 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading your financial data...</p>
        <p className="text-gray-500 text-sm mt-2">This may take a moment</p>
      </div>
    </div>
  );
}