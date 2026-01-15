'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, ChevronLeft, Search, Calendar, Printer } from 'lucide-react';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { SidebarMenu } from '@/components/SidebarMenu';

export default function DoorHistoryPage() {
    return (
        <ProtectedRoute>
            <DoorHistoryContent />
        </ProtectedRoute>
    );
}

function DoorHistoryContent() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [filters, setFilters] = useState({
        open: false,
        stop: false,
        close: false,
        startDate: '',
        endDate: ''
    });

    // Mock Data
    const historyData = [
        { id: 1, action: 'เปิดประตู', date: '17/12/2568 09:10:40' },
        { id: 2, action: 'หยุดประตู', date: '17/12/2568 09:10:35' },
        { id: 3, action: 'ปิดประตู', date: '17/12/2568 09:10:30' },
        { id: 4, action: 'หยุดประตู', date: '17/12/2568 09:10:20' },
        { id: 5, action: 'เปิดประตู', date: '17/12/2568 09:10:10' },
    ];

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

                <SidebarMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-start p-4 w-full max-w-md mx-auto">

                {/* White Card Container */}
                <div className="w-full bg-white rounded-2xl shadow-xl p-4 flex flex-col mt-2 min-h-[600px] relative">

                    {/* Page Header */}
                    <div className="flex items-center mb-4">
                        <Link href="/manage" className="p-2 border border-gray-200 rounded-lg mr-3 hover:bg-gray-50">
                            <ChevronLeft className="w-5 h-5 text-gray-600" />
                        </Link>
                        <h1 className="text-xl font-bold text-gray-900">ประวัติการใช้งานประตู</h1>
                    </div>

                    {/* Filters */}
                    <div className="space-y-4 mb-4">
                        {/* Status Filter */}
                        <div className="flex flex-wrap items-center gap-4">
                            <span className="font-bold text-gray-700 min-w-[50px]">สถานะ:</span>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.open}
                                    onChange={(e) => setFilters(prev => ({ ...prev, open: e.target.checked }))}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-700">เปิดประตู</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.stop}
                                    onChange={(e) => setFilters(prev => ({ ...prev, stop: e.target.checked }))}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-700">หยุดประตู</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={filters.close}
                                    onChange={(e) => setFilters(prev => ({ ...prev, close: e.target.checked }))}
                                    className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                />
                                <span className="text-gray-700">ปิดประตู</span>
                            </label>
                        </div>

                        {/* Date Filters */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-gray-700 font-bold mb-1">วันเริ่มต้น</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={filters.startDate}
                                        onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value }))}
                                        onClick={(e) => e.currentTarget.showPicker()}
                                        className="w-full h-10 pl-3 pr-10 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:border-blue-500 appearance-none bg-transparent relative z-10 [&::-webkit-calendar-picker-indicator]:opacity-0"
                                    />
                                    <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 z-0 pointer-events-none" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 font-bold mb-1">วันสิ้นสุด</label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        value={filters.endDate}
                                        onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value }))}
                                        onClick={(e) => e.currentTarget.showPicker()}
                                        className="w-full h-10 pl-3 pr-10 border border-gray-300 rounded-lg text-gray-600 focus:outline-none focus:border-blue-500 appearance-none bg-transparent relative z-10 [&::-webkit-calendar-picker-indicator]:opacity-0"
                                    />
                                    <Calendar className="absolute right-3 top-2.5 w-5 h-5 text-gray-400 z-0 pointer-events-none" />
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button className="w-full h-12 bg-blue-700 hover:bg-blue-800 text-white rounded-xl flex items-center justify-center gap-2 font-bold text-lg shadow-md transition-colors">
                            <Search className="w-6 h-6" />
                            ค้นหา
                        </button>
                    </div>

                    {/* Table Header Controls */}
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2 text-sm font-bold text-gray-700">
                            แสดง
                            <select className="border border-gray-300 rounded px-1 py-0.5 mx-1 bg-white">
                                <option>5</option>
                                <option>10</option>
                            </select>
                            รายการ
                        </div>
                        <button className="p-1.5 bg-gray-500 rounded text-white hover:bg-gray-600">
                            <Printer className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Data Table */}
                    <div className="border border-gray-300 rounded-lg overflow-hidden mb-4">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="bg-white border-b border-gray-300">
                                    <th className="py-3 px-2 text-center font-bold text-black border-r border-gray-300 w-16">ลำดับ</th>
                                    <th className="py-3 px-2 text-center font-bold text-black border-r border-gray-300">การใช้งาน</th>
                                    <th className="py-3 px-2 text-center font-bold text-black">วันที่สร้าง</th>
                                </tr>
                            </thead>
                            <tbody>
                                {historyData.map((item) => (
                                    <tr key={item.id} className="border-b border-gray-300 last:border-b-0 hover:bg-gray-50">
                                        <td className="py-3 px-2 text-center text-gray-800 border-r border-gray-300">{item.id}</td>
                                        <td className="py-3 px-2 text-center text-gray-800 border-r border-gray-300">{item.action}</td>
                                        <td className="py-3 px-2 text-center text-gray-800">{item.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="mt-auto">
                        <div className="text-center text-sm font-bold text-gray-800 mb-2">
                            แสดง 1 ถึง 5 จาก 5 รายการ
                        </div>
                        <div className="flex justify-center gap-1.5">
                            <button disabled className="px-2 py-1 border border-gray-300 text-gray-400 rounded text-xs font-medium cursor-not-allowed">หน้าแรก</button>
                            <button disabled className="px-2 py-1 border border-gray-300 text-gray-400 rounded text-xs font-medium cursor-not-allowed">ก่อนหน้า</button>
                            <button className="w-7 h-7 bg-blue-900 text-white rounded flex items-center justify-center text-xs font-bold">1</button>
                            <button disabled className="px-2 py-1 border border-gray-300 text-gray-400 rounded text-xs font-medium cursor-not-allowed">ถัดไป</button>
                            <button disabled className="px-2 py-1 border border-gray-300 text-gray-400 rounded text-xs font-medium cursor-not-allowed">หน้าสุดท้าย</button>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
