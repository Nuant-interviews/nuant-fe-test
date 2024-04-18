import React from 'react';

interface ErrorLoadingProps {
  loading: boolean;
  error: any; // eslint-disable-line
  children: React.ReactNode;
}

const ErrorLoading: React.FC<ErrorLoadingProps> = ({ loading, error, children }) => {
  if (loading) return <div className="flex justify-center items-center h-20">Loading...</div>;
  if (error) return <div
    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
    {error.message}
  </div>;
  return <>{children}</>;
};

export default ErrorLoading;