// src/components/AIAssistant.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader } from 'lucide-react';
import Button from './shared/Button';
import { useTheme } from '../context/ThemeContext';
import { CONFIG } from '../config/config';

const AIAssistant = ({ servicesData, onRecommendation }) => {
  const { theme } = useTheme();
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

  // Add initial welcome message when component mounts
  useEffect(() => {
    setMessages([{
      role: 'assistant',
      content: 'Hallo! Ich bin hier, um dir zu helfen, die richtige Unterstützung zu finden. Und ich bin bloß eine Demo bis wir uns das LLM wirklich leisten können :) Grundsätzlich jedoch, würde ich dann versuchen mit dir das Anliege zu klären und mit dir in der Datenbank was pasendes suchen! Derzeit kann ich dir noch nicht antworten, aber ich werde versuchen es in Kürze zu verbessern.'
    }]);
  }, []);

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

      if (data.content && data.content.length > 0) {
        setMessages(prev => [...prev,
          { role: 'user', content: userMessage },
          { role: 'assistant', content: data.content[0].text }
        ]);

        // Check if there's a service recommendation in the response
        const recommendationMatch = data.content[0].text.match(/ID: (\d+)/);
        if (recommendationMatch && recommendationMatch[1]) {
          const serviceId = parseInt(recommendationMatch[1]);
          const recommendedService = servicesData.find(service => service.id === serviceId);
          if (recommendedService && onRecommendation) {
            // Add delay before triggering recommendation to allow user to read the message
            setTimeout(() => {
              onRecommendation(recommendedService);
            }, 2000);
          }
        }
      } else {
        // Fallback for demo purposes
        setMessages(prev => [...prev,
          { role: 'user', content: userMessage },
          { role: 'assistant', content: 'Basierend auf deiner Beschreibung, könnte ich folgendes Angebot empfehlen: "Psychologische Beratung" (ID: 1). Möchtest du mehr darüber erfahren?' }
        ]);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: 'Sorry, Ich kann dir leider noch nicht antworten. Ich bin noch nicht aktiviert. Als Demo-Empfehlung könnte ich dir den ersten Eintrag in unserer Datenbank vorschlagen.' }
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

  // Handle recommendation button click
  const handleRecommendService = () => {
    if (servicesData && servicesData.length > 0 && onRecommendation) {
      // For demo: just recommend the first service
      onRecommendation(servicesData[0]);
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-200">
      {/* Chat Header */}
      <div className="px-6 py-4 bg-primary text-white rounded-t-lg">
        <h3 className="text-xl font-semibold">Beratungs-Assistent</h3>
        <p className="text-sm opacity-90">Ich helfe dir, die passende Unterstützung zu finden.</p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.map((message, index) => (
          <div key={index} className={`chat-message ${message.role}`}>
            <div className={`${
              message.role === 'user' 
                ? 'bg-primary/10 ml-auto text-gray-800' 
                : 'bg-white text-gray-800 border border-gray-100'
              } rounded-lg p-4 max-w-[80%] shadow-sm`}>
              <p>{message.content}</p>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center space-x-2 text-gray-500 bg-white p-3 rounded-lg shadow-sm inline-flex">
            <Loader className="animate-spin" size={20} />
            <span>Nachricht wird verarbeitet...</span>
          </div>
        )}

        {/* Demo button for quick recommendation */}
        {messages.length > 1 && !isLoading && (
          <div className="flex justify-center">
            <button
              onClick={handleRecommendService}
              className="bg-primary/80 hover:bg-primary text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              Demo: Angebot anzeigen
            </button>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 bg-white rounded-b-lg">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ihre Nachricht..."
            className="flex-1 border border-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
          />
          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-hover disabled:opacity-50 transition-colors duration-300"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default AIAssistant;