'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/services/authService';
import { DOOR_CONSTANTS } from '@/types';

export default function OTPPage() {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [countdown, setCountdown] = useState<number>(DOOR_CONSTANTS.OTP_EXPIRY_SECONDS);
    const [canResend, setCanResend] = useState(false);
    const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
    const router = useRouter();
    const { pendingPhone, login, isLoading } = useAuth();

    // Redirect to login if no pending phone (only after auth is loaded)
    useEffect(() => {
        if (!isLoading && !pendingPhone) {
            router.replace('/login');
        }
    }, [pendingPhone, isLoading, router]);

    // Countdown timer
    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(c => c - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [countdown]);

    const handleInputChange = (index: number, value: string) => {
        // Only allow digits
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        setError('');

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pastedData.length === 6) {
            setOtp(pastedData.split(''));
            inputRefs.current[5]?.focus();
        }
    };

    const handleSubmit = useCallback(async () => {
        const otpCode = otp.join('');

        if (otpCode.length !== 6) {
            setError('กรุณากรอก OTP ให้ครบ 6 หลัก');
            return;
        }

        if (!pendingPhone) {
            router.replace('/login');
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await authService.verifyOTP(pendingPhone, otpCode);

            if (result.success) {
                await login(pendingPhone);
                // Use replace to prevent back navigation issues
                router.replace('/dashboard');
            } else {
                setError(result.message);
            }
        } catch {
            setError('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง');
        } finally {
            setIsSubmitting(false);
        }
    }, [otp, pendingPhone, login, router]);

    const handleResendOTP = async () => {
        if (!canResend || !pendingPhone) return;

        setIsSubmitting(true);
        setError('');

        try {
            await authService.sendOTP(pendingPhone);
            setCountdown(DOOR_CONSTANTS.OTP_EXPIRY_SECONDS);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch {
            setError('ไม่สามารถส่ง OTP ได้');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Auto-submit when all digits are filled
    useEffect(() => {
        if (otp.every(digit => digit !== '') && !isSubmitting && pendingPhone) {
            handleSubmit();
        }
    }, [otp, isSubmitting, pendingPhone, handleSubmit]);

    const formatPhone = (phone: string) => {
        return '+66 ' + phone.slice(1).replace(/(\d{2})(\d{3})(\d{4})/, '$1 $2 $3');
    };

    const formatCountdown = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Show loading while auth is loading
    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500">กำลังโหลด...</p>
                </div>
            </div>
        );
    }

    // Don't render if no pending phone (will redirect)
    if (!pendingPhone) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    <p className="text-gray-500">กำลังโหลด...</p>
                </div>
            </div>
        );
    }

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
            <div className="relative z-10 w-full max-w-md px-4 pt-8 pb-8 flex flex-col items-center">
                {/* Back Button */}
                <div className="w-full flex justify-start mb-4">
                    <button
                        onClick={() => router.replace('/login')}
                        className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/90 backdrop-blur-sm shadow-md hover:bg-white transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-gray-700" />
                    </button>
                </div>

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
                    ยืนยันรหัส OTP
                </h1>
                <p className="text-[#000000] text-center text-sm md:text-base mb-12">
                    กรุณากรอก OTP 6 หลัก ที่ส่งไปยัง {formatPhone(pendingPhone)}
                </p>

                {/* OTP Inputs */}
                <div className="flex justify-center gap-2 md:gap-3 mb-4" onPaste={handlePaste}>
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            ref={el => { inputRefs.current[index] = el; }}
                            type="text"
                            inputMode="numeric"
                            maxLength={1}
                            value={digit}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleKeyDown(index, e)}
                            disabled={isSubmitting}
                            className="w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold rounded-xl bg-white/80 backdrop-blur-sm border-2 border-blue-400 text-gray-800 focus:border-blue-600 focus:bg-white focus:outline-none transition-all disabled:opacity-50"
                        />
                    ))}
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-red-500 text-sm text-center mb-4 bg-white/80 px-4 py-2 rounded-lg">{error}</p>
                )}

                {/* Countdown / Resend */}
                <div className="text-center mt-8">
                    {canResend ? (
                        <button
                            onClick={handleResendOTP}
                            disabled={isSubmitting}
                            className="text-[#000000] font-medium hover:underline transition-colors disabled:opacity-50"
                        >
                            Send code again
                        </button>
                    ) : (
                        <p className="text-[#000000] font-medium">
                            Send code again  <span className="font-semibold">{formatCountdown(countdown)}</span>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
