'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, List, PieChart, Settings, LogOut } from 'lucide-react';

interface MobileNavProps {
  onClose: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  };

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: Home },
    { href: '/transactions', label: 'Transactions', icon: List },
    { href: '/categories', label: 'Categories', icon: PieChart },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="lg:hidden absolute top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-50 p-4">
      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                pathname === item.href
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
        <button
          onClick={() => {
            handleLogout();
            onClose();
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-50 text-red-600"
        >
          <LogOut size={20} />
          <span className="font-medium">Sign Out</span>
        </button>
      </nav>
    </div>
  );
}
