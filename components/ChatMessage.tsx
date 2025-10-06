
import React from 'react';
import { ChatMessage as ChatMessageType } from '../types';

interface ChatMessageProps {
  message: ChatMessageType;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // Renders message content, converting any markdown links to clickable <a> tags.
  const renderContent = (content: string) => {
    // Splits the string by markdown links, but keeps the link itself in the array
    const parts = content.split(/(\[[^\]]+\]\([^)]+\))/g);
    
    return parts.map((part, index) => {
      // Check if the current part is a markdown link
      const match = /\[([^\]]+)\]\(([^)]+)\)/.exec(part);
      if (match) {
        const linkText = match[1];
        const relativeUrl = match[2];
        // Prepend the base URL to make the relative link work
        const fullUrl = `https://www.worldanvil.com${relativeUrl}`;
        return (
          <a
            key={index}
            href={fullUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ff0000] hover:underline"
          >
            {linkText}
          </a>
        );
      }
      // If it's not a link, return the text part as is
      return part;
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-lg lg:max-w-xl px-4 py-2 rounded-lg ${
          isUser
            ? 'bg-[#cd8032]/20 text-[#cd8032]'
            : 'bg-[#000000]/40 text-[#d8e4dd]'
        }`}
      >
        <p className="whitespace-pre-wrap">
          {isUser ? message.content : renderContent(message.content)}
        </p>
      </div>
    </div>
  );
};
