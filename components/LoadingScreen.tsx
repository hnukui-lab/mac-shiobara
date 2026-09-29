import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react';
import { askAIArchitect } from '../services/geminiService';
import { ChatMessage } from '../types';

export const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'こんにちは。建築金物に関する技術的なご質問や、施工のご相談など、AIコンサルタントがお答えします。' }
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const answer = await askAIArchitect(userMsg);
    
    setMessages(prev => [...prev, { role: 'model', text: answer }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Trigger Button */}
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="bg-slate-900 hover:bg-green-600 hover:text-white text-white p-4 rounded-full shadow-2xl transition-all transform hover:scale-110 flex items-center gap-2 group border border-white/10"
        >
          <Bot className="w-6 h-6" />
          <span className="font-bold pr-2 hidden group-hover:inline-block transition-all">AI相談窓口</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="bg-white w-[350px] md:w-[400px] h-[500px] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-slide-up">
          {/* Header */}
          <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="bg-green-600 p-1.5 rounded-full text-white">
                <Bot size={16} />
              </div>
              <div>
                <h3 className="font-bold text-sm">AI金物コンサルタント</h3>
                <p className="text-xs text-slate-400">Powered by Gemini 2.5</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-green-600 text-white rounded-br-none font-medium shadow-sm' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white p-3 rounded-2xl rounded-bl-none border border-slate-200 shadow-sm">
                  <Loader2 className="w-4 h-4 animate-spin text-green-600" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="例: SUS304と316の違いは？"
                className="w-full bg-slate-100 border-none rounded-full pl-4 pr-12 py-3 text-sm focus:ring-2 focus:ring-green-600 outline-none"
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-slate-900 text-white rounded-full hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={14} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
