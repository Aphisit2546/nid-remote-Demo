'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, ArrowUp, ArrowDown } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SidebarMenu } from '@/components/SidebarMenu';
import { useDoorControl } from '@/hooks/useDoorControl';

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardContent />
        </ProtectedRoute>
    );
}

function DashboardContent() {
    const doorControl = useDoorControl();
    const [menuOpen, setMenuOpen] = useState(false);

    // ข้อความสถานะ
    const getStatusText = () => {
        if (doorControl.isMoving) {
            return 'โปรดแตะปุ่ม STOP/หยุด เพื่อหยุด';
        }
        return 'โปรดแตะปุ่ม OPEN/เปิด หรือ CLOSE/ปิด เพื่อเปิด-ปิดประตู';
    };

    // ข้อความหัวข้อสถานะ
    const getHeaderText = () => {
        if (doorControl.state === 'OPENING') return 'กำลังเปิดประตู';
        if (doorControl.state === 'CLOSING') return 'กำลังปิดประตู';
        return 'สถานะ';
    };

    // percentage เป็น null เมื่อเริ่มต้น
    const percentage = doorControl.percentage;
    const displayPercentage = percentage !== null ? `${percentage}%` : '-';

    return (
        <div className="min-h-screen relative flex flex-col font-sans bg-gray-50 overflow-hidden">

            {/* Background Graphic Layer */}
            {/* ใช้ div นี้เพื่อวางภาพพื้นหลังสีสัน (Blue/Orange geometric shapes) */}
            <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-500/20 via-white to-orange-400/20">
                <Image
                    src="/images/DesktopBG.png"
                    alt="Background"
                    fill
                    className="object-cover opacity-100" // ปรับตามความเหมาะสมของรูปจริง
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
                <div className="w-full bg-white rounded-3xl shadow-xl p-5 flex flex-col items-center gap-4 mt-2 mb-safe">

                    {/* CCTV Section */}
                    <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden bg-black shadow-inner border border-gray-100">
                        <div className="absolute top-2 right-2 z-20 bg-black/60 backdrop-blur-md rounded px-2 py-0.5 flex items-center gap-1.5 border border-white/10">
                            <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse shadow-[0_0_8px_rgba(220,38,38,0.8)]" />
                            <span className="text-[10px] font-bold text-white tracking-widest">LIVE</span>
                        </div>
                        <CCTVImage />
                    </div>

                    {/* Status Section */}
                    <div className="flex flex-col items-center w-full py-2">
                        <h2 className={`text-lg font-bold mb-3 ${doorControl.state === 'OPENING' ? 'text-green-500' : doorControl.state === 'CLOSING' ? 'text-orange-500' : 'text-gray-900'}`}>
                            {getHeaderText()}
                        </h2>

                        {/* Circular Progress */}
                        <div className="relative w-28 h-28 mb-4">
                            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                                {/* Track */}
                                <circle cx="50" cy="50" r="42" fill="none" stroke="#E5E7EB" strokeWidth="10" />
                                {/* Indicator - สีเปลี่ยนตามสถานะ */}
                                <circle
                                    cx="50" cy="50" r="42" fill="none"
                                    stroke={doorControl.state === 'OPENING' ? '#22c55e' : doorControl.state === 'CLOSING' ? '#f97316' : '#9CA3AF'}
                                    strokeWidth="10"
                                    strokeLinecap="round"
                                    strokeDasharray={percentage !== null ? `${percentage * 2.64} 264` : '0 264'}
                                    className="transition-all duration-300 ease-linear"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className={`text-2xl font-bold ${doorControl.state === 'OPENING' ? 'text-green-500' : doorControl.state === 'CLOSING' ? 'text-orange-500' : 'text-gray-600'}`}>
                                    {displayPercentage}
                                </span>
                            </div>
                        </div>

                        <p className={`text-xs font-semibold text-center px-4 leading-relaxed ${doorControl.isMoving ? 'text-red-500' : 'text-blue-700'}`}>
                            {getStatusText()}
                        </p>
                    </div>

                    {/* Control Buttons Group */}
                    <div className="w-full flex flex-col gap-3 mt-auto pt-2">
                        {/* OPEN Button */}
                        <button
                            onClick={doorControl.open}
                            disabled={!doorControl.canOpen}
                            className="w-full h-14 rounded-xl bg-[#2ea44f] text-white font-bold text-xl flex items-center justify-center gap-3 shadow-md hover:bg-[#2c974b] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                        >
                            <ArrowUp className="w-6 h-6 stroke-[3]" />
                            <span>OPEN/เปิด</span>
                        </button>

                        {/* STOP Button (สีแดงเข้ม ไม่มีไอคอน) */}
                        <button
                            onClick={doorControl.stop}
                            disabled={!doorControl.canStop}
                            className="w-full h-14 rounded-xl bg-[#ff0000] text-white font-bold text-xl flex items-center justify-center shadow-md hover:bg-[#d90000] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                        >
                            <span>STOP/หยุด</span>
                        </button>

                        {/* CLOSE Button (สีส้ม/เหลือง) */}
                        <button
                            onClick={doorControl.close}
                            disabled={!doorControl.canClose}
                            className="w-full h-14 rounded-xl bg-[#ff9900] text-white font-bold text-xl flex items-center justify-center gap-3 shadow-md hover:bg-[#e68a00] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                        >
                            <ArrowDown className="w-6 h-6 stroke-[3]" />
                            <span>CLOSE/ปิด</span>
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}

// CCTV Component
function CCTVImage() {
    const [imageUrl, setImageUrl] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        // ใช้ timestamp เพื่อป้องกัน cache
        const updateImage = () => {
            setImageUrl(`https://accessio.nidpro.tech/cctv.jpg?t=${Date.now()}`);
        };

        updateImage();
        const interval = setInterval(updateImage, 1000); // อัปเดตทุก 1 วินาที
        return () => clearInterval(interval);
    }, []);

    if (error) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 text-gray-400">
                <div className="text-2xl mb-2">📷</div>
                <p className="text-xs">No Signal</p>
            </div>
        );
    }

    return imageUrl ? (
        <img
            src={imageUrl}
            alt="CCTV Feed"
            className="w-full h-full object-cover"
            onError={() => setError(true)}
        />
    ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-900">
            <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
        </div>
    );
}