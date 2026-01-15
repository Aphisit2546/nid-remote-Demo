'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SidebarMenu } from '@/components/SidebarMenu';

export default function ProfilePage() {
    return (
        <ProtectedRoute>
            <ProfileContent />
        </ProtectedRoute>
    );
}

function ProfileContent() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen relative flex flex-col font-sans bg-gray-50 overflow-hidden">

            {/* Background Graphic Layer */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/20 via-white to-orange-400/20">
                <Image
                    src="/images/DesktopBG.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-100"
                    priority
                />
            </div>

            {/* Header */}
            <header className="relative z-20 flex items-center justify-between px-4 py-3 bg-white shadow-sm">
                <div className="flex items-center gap-2">
                    {/* Logo */}
                    <div className="relative h-10 w-10">
                        <Image
                            src="/images/Logo.png"
                            alt="NID Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                    <span className="text-xl font-bold text-black tracking-tight">NID Remote Office</span>
                </div>

                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                    <Menu className="w-7 h-7 text-gray-800" />
                </button>

                {/* Sidebar Menu */}
                <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-start p-5 w-full max-w-md mx-auto">

                {/* The White Card Container */}
                <div className="w-full bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center mt-6 min-h-[400px]">

                    <h1 className="text-2xl font-bold text-gray-900 mb-8 self-center">ข้อมูลโปรไฟล์</h1>

                    <div className="w-full space-y-4 text-left">
                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-bold text-gray-900">ชื่อ : xxxx xxxx</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-bold text-gray-900">อีเมล : xxxxxx@gmail.com</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-bold text-gray-900">ตำแหน่ง : พนักงานทั่วไป</span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-lg font-bold text-gray-900">เบอร์โทรศัพท์ : 0999999999</span>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
