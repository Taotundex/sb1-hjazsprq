'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, Mail } from 'lucide-react';

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    'לצורך עבודה בתחום עסקי',
    'לצרכים משפחתיים',
    'לצורך מחקר אקדמיים',
    'לצורך מדיה (עיתונות)',
    'לצורך פרטי'
  ];

  useEffect(() => {
    // בדיקה אם המשתמש כבר מילא את הטופס
    const hasSubmitted = sessionStorage.getItem('newsletter-submitted');
    
    if (!hasSubmitted) {
      // הצגת הפופ-אפ אחרי 10 שניות
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleInterestToggle = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // שמירה בסשן שהמשתמש מילא את הטופס
    sessionStorage.setItem('newsletter-submitted', 'true');
    
    // כאן תוכל להוסיף לוגיקה לשליחת הנתונים לשרת
    console.log('Newsletter subscription:', { interests: selectedInterests });
    
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-lg p-8 overflow-hidden bg-white rounded-lg shadow-xl">
        {/* כפתור סגירה */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 left-4 z-10 w-8 h-8 p-0 hover:bg-gray-100 rounded"
          onClick={handleClose}
        >
          <X className="w-4 h-4" />
        </Button>





        {/* תוכן */}
        <div className="text-right">
          <DialogTitle className="text-2xl font-bold text-gray-800 mb-2">
            האתר חופשי לשימושך
            באופן מלא!
          </DialogTitle>
          <div className="w-16 h-1 bg-green-600 mb-6 mr-auto"></div>
          
          <p className="text-gray-600 mb-6 leading-relaxed">
            לצורך שיפור חוויית השימוש באתר, נשמח לדעת
            האם השימוש באתר הינו:
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* תחומי עניין */}
            <div className="text-right space-y-3">
              {interests.map((interest) => (
                <label key={interest} className="flex items-center justify-end space-x-3 space-x-reverse text-gray-700 cursor-pointer">
                  <span className="text-base">{interest}</span>
                  <div className="relative">
                    <input
                      type="radio"
                      name="interest"
                      value={interest}
                      checked={selectedInterests.includes(interest)}
                      onChange={() => {
                        setSelectedInterests([interest]);
                      }}
                      className="w-5 h-5 text-green-600 border-2 border-gray-300 focus:ring-green-500 focus:ring-2"
                    />
                  </div>
                </label>
              ))}
            </div>
            {/* כפתור הרשמה */}
            <div className="pt-4">
              <Button 
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-full text-lg"
              >
                המשך גלישה באתר
              </Button>
            </div>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}