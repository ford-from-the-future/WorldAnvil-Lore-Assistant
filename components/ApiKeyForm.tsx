import React, { useState } from 'react';

interface ApiKeyFormProps {
  onSubmit: (appKey: string, authToken: string, worldId: string) => void;
  isLoading: boolean;
  error: string | null;
}

export const ApiKeyForm: React.FC<ApiKeyFormProps> = ({ onSubmit, isLoading, error }) => {
  const [appKey, setAppKey] = useState<string>('');
  const [authToken, setAuthToken] = useState<string>('');
  const [worldId, setWorldId] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (appKey.trim() && authToken.trim() && worldId.trim()) {
      onSubmit(appKey, authToken, worldId);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-[#000000]/50 rounded-lg shadow-lg shadow-[#cd8032]/20 p-8 border border-[#cd8032]/30">
      <h2 className="text-2xl font-bold text-[#cd8032] mb-2 text-center">Connect to World Anvil</h2>
      <p className="text-[#d8e4dd]/70 mb-6 text-center text-sm">
        Enter your Boromir API credentials to begin.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="appKey" className="block text-sm font-medium text-[#d8e4dd]/80 mb-1">
            x-application-key
          </label>
          <input
            id="appKey"
            type="password"
            value={appKey}
            onChange={(e) => setAppKey(e.target.value)}
            className="w-full bg-[#000000] border border-[#cd8032] rounded-md px-3 py-2 text-[#cd8032] placeholder-[#d8e4dd]/50 focus:ring-2 focus:ring-[#ff0000] focus:border-[#ff0000] transition"
            placeholder="Enter your application key"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label htmlFor="authToken" className="block text-sm font-medium text-[#d8e4dd]/80 mb-1">
            x-auth-token
          </label>
          <input
            id="authToken"
            type="password"
            value={authToken}
            onChange={(e) => setAuthToken(e.target.value)}
            className="w-full bg-[#000000] border border-[#cd8032] rounded-md px-3 py-2 text-[#cd8032] placeholder-[#d8e4dd]/50 focus:ring-2 focus:ring-[#ff0000] focus:border-[#ff0000] transition"
            placeholder="Enter your auth token"
            required
            disabled={isLoading}
          />
        </div>
         <div>
          <label htmlFor="worldId" className="block text-sm font-medium text-[#d8e4dd]/80 mb-1">
            World ID
          </label>
          <input
            id="worldId"
            type="text"
            value={worldId}
            onChange={(e) => setWorldId(e.target.value)}
            className="w-full bg-[#000000] border border-[#cd8032] rounded-md px-3 py-2 text-[#cd8032] placeholder-[#d8e4dd]/50 focus:ring-2 focus:ring-[#ff0000] focus:border-[#ff0000] transition"
            placeholder="Enter your World ID"
            required
            disabled={isLoading}
          />
        </div>
        {error && <div className="text-red-300 bg-[#ff0000]/20 p-3 rounded-md text-sm">{error}</div>}
        <button
          type="submit"
          className="w-full bg-[#cd8032] text-[#000000] font-bold py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#000080] focus:ring-[#ff0000] transition duration-300 disabled:bg-[#d8e4dd]/20 disabled:text-[#d8e4dd]/50 disabled:cursor-not-allowed flex items-center justify-center"
          disabled={!appKey.trim() || !authToken.trim() || !worldId.trim() || isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#000000]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Connecting...
            </>
          ) : (
            'Unlock Lore'
          )}
        </button>
      </form>
    </div>
  );
};