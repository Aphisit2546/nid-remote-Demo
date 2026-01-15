'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';

export default function LoginPage() {
    const [phone, setPhone] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { setPhone: setAuthPhone } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!phone.trim()) {
            setError('กรุณากรอกหมายเลขโทรศัพท์');
            return;
        }

        if (!/^[0-9]{9,10}$/.test(phone.replace(/\D/g, ''))) {
            setError('กรุณากรอกหมายเลขโทรศัพท์ให้ถูกต้อง');
            return;
        }

        setIsLoading(true);

        try {
            const result = await authService.sendOTP(phone);

            if (result.success) {
                setAuthPhone(phone);
                router.push('/otp');
            } else {
                setError(result.message);
            }
        } catch {
            setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex flex-col items-center justify-start overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/DesktopBG.png"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full max-w-md px-4 pt-16 pb-8 flex flex-col items-center">
                {/* Logo */}
                <div className="mb-6">
                    <Image
                        src="/images/Logo.png"
                        alt="NID Progress Technology"
                        width={180}
                        height={120}
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Title */}
                <h1 className="text-2xl md:text-3xl font-bold text-[#000000] text-center mb-2">
                    ระบบเปิด-ปิดประตูม้วนเหล็กระยะไกล
                </h1>
                <p className="text-[#000000] text-center text-sm md:text-base mb-8">
                    Remote control system for opening and closing steel roller doors
                </p>

                {/* Login Card */}
                <div className="w-full bg-white/95 backdrop-blur-sm rounded-3xl p-6 shadow-2xl">
                    <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
                        เข้าสู่ระบบ
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-4" suppressHydrationWarning>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                เบอร์โทรศัพท์
                            </label>
                            <input
                                type="tel"
                                placeholder="กรอกเบอร์โทรศัพท์ 10 หลัก"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                    setError('');
                                }}
                                maxLength={10}
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                suppressHydrationWarning
                            />
                            {error && (
                                <p className="text-red-500 text-xs mt-2">{error}</p>
                            )}
                        </div>

                        {/* Demo Notice */}
                        <p className="text-gray-400 text-xs text-center">
                            ***เบอร์โทรศัพท์อะไรก็ได้***
                        </p>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-4 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-lg shadow-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    กำลังดำเนินการ...
                                </span>
                            ) : (
                                'ขอรหัส OTP'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
