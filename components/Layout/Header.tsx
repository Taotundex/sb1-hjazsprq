'use client';

import { useState } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Logo from './Logo';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: 'about', label: 'אודותינו' },
  { id: 'contact', label: 'צור קשר' },
  { id: 'targets', label: 'יעדים קיימא' },
  { id: 'api', label: 'API' },
  { id: 'data-sources', label: 'חיפוש' },
  { id: 'market', label: 'משק החשמל' },
];

export default function Header({ activeSection, onSectionChange }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  return (
    <header className="text-white sticky top-0 z-50" style={{ backgroundColor: '#2A2E33' }}>
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Logo onClick={() => onSectionChange('home')} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant="ghost"
                className="px-0 py-2 text-sm font-normal text-white hover:text-gray-200 hover:bg-transparent cursor-pointer"
                onClick={() => onSectionChange(item.id)}
              >
                {item.label}
              </Button>
            ))}
          </nav>

          {/* Search */}
          <div className="flex items-center">
            <div className="relative">
              <div className="flex items-center rounded-full px-4 py-2 border border-white w-48" style={{ backgroundColor: '#2A2E33' }}>
                <Search className="h-4 w-4 text-white ml-2" />
                <input
                  type="text"
                  placeholder="חיפוש"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="bg-transparent border-none text-white placeholder-white text-sm focus:outline-none flex-1"
                />
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden ml-4"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-slate-600">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {/* Mobile Navigation Items */}
              {navItems.map((item) => (
                <Button
                  key={item.id}
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-slate-600 cursor-pointer"
                  onClick={() => {
                    onSectionChange(item.id);
                    setIsMenuOpen(false);
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}