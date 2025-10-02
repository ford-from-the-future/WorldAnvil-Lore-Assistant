import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage as ChatMessageType } from '../types';
import { ChatMessage } from './ChatMessage';
import { Loader } from './Loader';

interface ChatInterfaceProps {
  messages: ChatMessageType[];
  onSendMessage: (message: string) => void;
  isLoading: boolean;
  error: string | null;
  onResetKeys: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage, isLoading, error, onResetKeys }) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="flex-grow flex flex-col max-w-3xl mx-auto w-full h-[80vh] bg-[#000000]/50 rounded-lg shadow-lg border border-[#cd8032]/30 overflow-hidden">
      <div className="p-4 border-b border-[#cd8032]/30 flex justify-between items-center">
        <h2 className="text-xl text-[#cd8032]">Lore Master</h2>
        <button onClick={onResetKeys} className="text-sm text-[#d8e4dd]/70 hover:text-[#ff0000] transition-colors">Change Keys</button>
      </div>
      <div className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))}
          {isLoading && <Loader />}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {error && <div className="p-4 text-red-300 bg-[#ff0000]/20">{error}</div>}
      <div className="p-4 border-t border-[#cd8032]/30">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your world..."
            className="flex-grow bg-[#000000] border border-[#cd8032] rounded-md px-3 py-2 text-[#cd8032] focus:ring-2 focus:ring-[#ff0000] focus:border-[#ff0000] transition disabled:opacity-50"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-[#cd8032] text-[#000000] font-bold py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#000000] focus:ring-[#ff0000] transition duration-300 disabled:bg-[#d8e4dd]/20"
            disabled={isLoading || !input.trim()}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};