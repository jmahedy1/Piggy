'use client';

import { useState } from 'react';
import { PiggyBank, Menu, X } from 'lucide-react';
import { MobileNav } from './MobileNav';

export function MobileHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <PiggyBank size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900">Piggy</span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>
      {mobileMenuOpen && (
        <MobileNav onClose={() => setMobileMenuOpen(false)} />
      )}
    </>
  );
}
