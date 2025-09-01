'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 relative overflow-hidden">
      {/* Background geometric shape */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full transform -translate-x-32 -translate-y-32"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Right side - Contact form */}
          <div className="order-1 lg:order-2">
            <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-yellow-200 max-w-md mx-auto">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="text-right border-gray-300 rounded-lg h-12"
                    placeholder="שם *"
                  />
                </div>
                
                <div>
                  <Input
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="text-right border-gray-300 rounded-lg h-12"
                    placeholder="כתובת דוא״ל *"
                  />
                </div>
                
                <div>
                  <Input
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className="text-right border-gray-300 rounded-lg h-12"
                    placeholder="אזור (אם יש)"
                  />
                </div>
                
                <div>
                  <Textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="text-right border-gray-300 rounded-lg min-h-[120px] resize-none"
                    placeholder="כתבו כאן את תוכן הפנייה"
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-full h-12 text-lg font-medium"
                >
                  שליחה
                </Button>
              </form>
            </div>
          </div>

          {/* Left side - Content */}
          <div className="order-2 lg:order-1 text-right">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">
              יצירת קשר
            </h1>
            <div className="w-16 h-1 bg-teal-600 mb-8 mr-auto"></div>
            
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  לא מצאתם מה שחיפשתם?
                  <br />
                  יש לכם הצעת שיפור?
                </h2>
                <div className="w-16 h-1 bg-teal-600 mb-4 mr-auto"></div>
                <p className="text-gray-600 text-lg">
                  מוזמנים לכתוב לנו ונעשה להשיב במקרום
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}