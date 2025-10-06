
import React, { useState, useCallback, useEffect } from 'react';
import { ApiKeyForm } from './components/ApiKeyForm';
import { ChatInterface } from './components/ChatInterface';
import { Header } from './components/Header';
import { getAiResponse } from './services/geminiService';
import { fetchWorldData } from './services/worldAnvilService';
import { ChatMessage } from './types';

const App: React.FC = () => {
  const [worldAnvilAppKey, setWorldAnvilAppKey] = useState<string>('');
  const [worldAnvilAuthToken, setWorldAnvilAuthToken] = useState<string>('');
  const [worldId, setWorldId] = useState<string>('');
  const [worldData, setWorldData] = useState<any | null>(null);
  const [keysSubmitted, setKeysSubmitted] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleKeysSubmit = useCallback(async (appKey: string, authToken: string, worldId: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const data = await fetchWorldData(appKey, authToken, worldId);
      
      localStorage.setItem('worldAnvilAppKey', appKey);
      localStorage.setItem('worldAnvilAuthToken', authToken);
      localStorage.setItem('worldAnvilWorldId', worldId);

      setWorldAnvilAppKey(appKey);
      setWorldAnvilAuthToken(authToken);
      setWorldId(worldId);
      setWorldData(data);
      setKeysSubmitted(true);
      
      const worldName = data?.name || 'your world';
      const articleCount = (Array.isArray(data?.articles) ? data.articles.length : 0);
      const articleCountText = articleCount > 0 ? ` I have found ${articleCount} articles.` : '';

      setMessages([
        {
          role: 'assistant',
          content: `Connection successful. I have loaded the archives for '${worldName}'.${articleCountText} What lore may I illuminate for you?`,
        },
      ]);

    } catch (e) {
       // Display a more user-friendly error message with actionable advice.
       const userFriendlyError = "Connection failed. Please check your API keys and World ID, or ensure you have granted the Boromir API permission in your World Anvil settings.";
       setError(userFriendlyError);
       console.error("World Anvil connection error:", e); // Log the original error for debugging.
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const resetKeys = useCallback(() => {
    localStorage.removeItem('worldAnvilAppKey');
    localStorage.removeItem('worldAnvilAuthToken');
    localStorage.removeItem('worldAnvilWorldId');
    setWorldAnvilAppKey('');
    setWorldAnvilAuthToken('');
    setWorldId('');
    setWorldData(null);
    setKeysSubmitted(false);
    setMessages([]);
    setError(null);
  }, []);
  
  useEffect(() => {
    const storedAppKey = localStorage.getItem('worldAnvilAppKey');
    const storedAuthToken = localStorage.getItem('worldAnvilAuthToken');
    const storedWorldId = localStorage.getItem('worldAnvilWorldId');
    if (storedAppKey && storedAuthToken && storedWorldId) {
      handleKeysSubmit(storedAppKey, storedAuthToken, storedWorldId);
    }
  }, [handleKeysSubmit]);

  const handleSendMessage = useCallback(async (question: string) => {
    if (!worldData) {
        setError("World data is not loaded. Cannot process request.");
        return;
    }

    setError(null);
    setIsLoading(true);
    const userMessage: ChatMessage = { role: 'user', content: question };
    setMessages(prev => [...prev, userMessage]);

    try {
      const context = JSON.stringify(worldData);

      // Send the fetched data and the user's question to Gemini.
      const aiResponse = await getAiResponse(context, question);
      
      const assistantMessage: ChatMessage = { role: 'assistant', content: aiResponse };
      setMessages(prev => [...prev, assistantMessage]);

    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(errorMessage);
      const assistantErrorMessage: ChatMessage = { role: 'assistant', content: `Sorry, an error occurred: ${errorMessage}` };
      setMessages(prev => [...prev, assistantErrorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [worldData]);

  return (
    <div className="min-h-screen flex flex-col bg-[#000080] text-[#cd8032]">
      <Header />
      <main className="flex-grow container mx-auto p-4 flex flex-col">
        {!keysSubmitted ? (
          <ApiKeyForm onSubmit={handleKeysSubmit} isLoading={isLoading} error={error} />
        ) : (
          <ChatInterface 
            messages={messages} 
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
            error={error}
            onResetKeys={resetKeys}
          />
        )}
      </main>
       <footer className="text-center p-4 text-[#d8e4dd]/70 text-sm">
        <p>World Anvil Assistant</p>
      </footer>
    </div>
  );
};

export default App;
