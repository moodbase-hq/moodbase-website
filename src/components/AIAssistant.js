import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import { CONFIG } from '../config/config';

const AIAssistant = ({ servicesData, onRecommendation }) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initialPrompt = `You are a helpful mental health support assistant. You help people find the right psychosocial support from our database. Be empathetic and understanding. Ask questions to understand their situation better. Here is our database of services: ${JSON.stringify(servicesData)}`;

  const sendMessage = async (userMessage) => {
    try {
      setIsLoading(true);
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': CONFIG.ANTHROPIC_API_KEY,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: initialPrompt },
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage }
          ],
          model: 'claude-3-opus-20240229',
          max_tokens: 1000,
        })
      });

      const data = await response.json();

      if (data.content) {
        setMessages(prev => [...prev,
          { role: 'user', content: userMessage },
          { role: 'assistant', content: data.content }
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputMessage.trim()) {
      sendMessage(inputMessage);
      setInputMessage('');
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-pink-500 text-white rounded-t-lg">
        <h3 className="text-xl font-semibold">Beratungs-Assistent</h3>
        <p className="text-sm opacity-90">Ich helfe Ihnen, die passende Unterstützung zu finden.</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="chat-message assistant">
          <div className="bg-pink-50 rounded-lg p-4 max-w-[80%]">
            <p>Hallo! Ich bin hier, um dir zu helfen, die richtige Unterstützung zu finden.
               Und ich bin bloß eine Demo bis wir uns das LLM wirklich leisten können :)
               Grundsätzlich jedoch, würde ich dann versuchen mit dir das Anliege zu klären und mit dir in der Datenbank was pasendes suchen!
               Derzeit kann ich dir noch nicht antworten, aber ich werde versuchen es in Kürze zu verbessern.</p>
          </div>
        </div>

        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <div className={`${
              message.role === 'user' 
                ? 'bg-blue-100 ml-auto' 
                : 'bg-pink-50'
              } rounded-lg p-4 max-w-[80%]`}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader className="animate-spin" size={20} />
            <span>Nachricht wird verarbeitet...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ihre Nachricht..."
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIAssistant;