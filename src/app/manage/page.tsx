'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, FileText, GalleryVerticalEnd } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SidebarMenu } from '@/components/SidebarMenu';

export default function ManagePage() {
    return (
        <ProtectedRoute>
            <ManageContent />
        </ProtectedRoute>
    );
}

function ManageContent() {
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
                <div className="w-full bg-white rounded-3xl shadow-xl p-6 flex flex-col items-center gap-6 mt-4 min-h-[500px]">

                    <h1 className="text-2xl font-bold text-gray-900 mt-2">จัดการข้อมูล</h1>

                    <div className="flex gap-4 w-full mt-4">
                        {/* System History Card */}
                        <Link href="/history/system" className="flex-1 aspect-[4/5] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group relative">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src="/images/MobileBG.png"
                                    alt="Background"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Icon Container */}
                            <div className="absolute inset-0 pb-10 flex items-center justify-center">
                                <FileText className="w-16 h-16 text-black stroke-[1.5]" />
                            </div>

                            {/* Orange Label Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-orange-500 flex items-center justify-center">
                                <span className="text-white text-xs font-bold text-center px-1">ประวัติการใช้งานระบบ</span>
                            </div>
                        </Link>

                        {/* Door History Card */}
                        <Link href="/history/door" className="flex-1 aspect-[4/5] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer group relative">
                            {/* Background Image */}
                            <div className="absolute inset-0">
                                <Image
                                    src="/images/MobileBG.png"
                                    alt="Background"
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Icon Container */}
                            <div className="absolute inset-0 pb-10 flex items-center justify-center">
                                <GalleryVerticalEnd className="w-16 h-16 text-black stroke-[1.5]" />
                            </div>

                            {/* Orange Label Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-10 bg-orange-500 flex items-center justify-center">
                                <span className="text-white text-xs font-bold text-center px-1">ประวัติการใช้งานประตู</span>
                            </div>
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}
