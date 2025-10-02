import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-lg lg:max-w-xl px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-[#cd8032]/20 text-[#cd8032]'
            : 'bg-[#000000]/40 text-[#d8e4dd]'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </div>
  );
};