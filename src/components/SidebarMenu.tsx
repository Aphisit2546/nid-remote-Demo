'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';

interface SidebarMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function SidebarMenu({ isOpen, onClose }: SidebarMenuProps) {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
                onClick={onClose}
            />

            {/* Sidebar Panel */}
            <div className="fixed top-0 right-0 z-50 h-full w-64 bg-white shadow-2xl flex flex-col animate-slide-in-right">
                {/* Menu Header */}
                <div className="px-6 py-5 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-800 text-center">เมนูหลัก</h2>
                </div>

                {/* Menu Items */}
                <nav className="flex-1 px-4 py-4 space-y-1">
                    <Link
                        href="/dashboard"
                        onClick={onClose}
                        className="block w-full px-4 py-3 text-left text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        หน้าหลัก
                    </Link>
                    <Link
                        href="/manage"
                        onClick={onClose}
                        className="block w-full px-4 py-3 text-left text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        การจัดการข้อมูล
                    </Link>
                    <Link
                        href="/profile"
                        onClick={onClose}
                        className="block w-full px-4 py-3 text-left text-gray-700 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        โปรไฟล์
                    </Link>
                </nav>

                {/* Logout Button at Bottom */}
                <div className="px-4 py-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full px-4 py-3 text-center text-red-600 font-bold hover:bg-red-50 rounded-lg transition-colors"
                    >
                        ออกจากระบบ
                    </button>
                </div>
            </div>
        </>
    );
}
