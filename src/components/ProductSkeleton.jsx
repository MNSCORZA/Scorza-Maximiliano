export const ProductSkeleton = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 animate-pulse flex flex-col h-full">
      <div className="h-44 bg-gray-200 rounded-md mb-3 w-full"></div>
      
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
      
      <div className="mt-auto">
        <div className="h-8 bg-gray-200 rounded w-full mb-3"></div>
        <div className="h-10 bg-gray-200 rounded w-full"></div>
      </div>
    </div>
  );
};