import React from "react";

const Loading = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center font-sans">
      <div className="w-full max-w-md p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">My Application</h1>

        {isLoading ? (
          <div className="mt-8">
            <div className="flex justify-center items-center h-full w-full">
              <div
                // The spinner element
                className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"
                role="status" // Accessibility role for screen readers
              >
                <span className="sr-only">Loading...</span>{" "}
                {/* Hidden text for screen readers */}
              </div>
            </div>
            <p className="mt-4 text-gray-400">Fetching data, please wait...</p>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl text-green-400">Content Loaded!</h2>
            <p className="mt-2 text-gray-300">Welcome to the application.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Loading;
