import { OTPSession, DOOR_CONSTANTS } from '@/types';

// Store OTP session in memory (demo only)
let otpSession: OTPSession | null = null;

export const authService = {
    /**
     * Send OTP to phone number
     * Demo: Always succeeds, stores session with expiry
     */
    sendOTP: async (phone: string): Promise<{ success: boolean; message: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Create OTP session
        otpSession = {
            phone,
            expiresAt: Date.now() + (DOOR_CONSTANTS.OTP_EXPIRY_SECONDS * 1000),
        };

        console.log('[Demo] OTP sent to:', phone);

        return {
            success: true,
            message: 'OTP ถูกส่งไปยังหมายเลขของคุณแล้ว',
        };
    },

    /**
     * Verify OTP code
     * Demo: Accepts any 6-digit code if session is valid
     */
    verifyOTP: async (phone: string, otp: string): Promise<{ success: boolean; message: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Check if OTP is 6 digits
        if (!/^\d{6}$/.test(otp)) {
            return {
                success: false,
                message: 'OTP ต้องเป็นตัวเลข 6 หลัก',
            };
        }

        // Check if session exists
        if (!otpSession) {
            return {
                success: false,
                message: 'กรุณาขอ OTP ใหม่',
            };
        }

        // Check if phone matches
        if (otpSession.phone !== phone) {
            return {
                success: false,
                message: 'หมายเลขโทรศัพท์ไม่ตรงกัน',
            };
        }

        // Check if expired
        if (Date.now() > otpSession.expiresAt) {
            otpSession = null;
            return {
                success: false,
                message: 'OTP หมดอายุแล้ว กรุณาขอใหม่',
            };
        }

        console.log('[Demo] OTP verified for:', phone);

        // Clear session after successful verification
        otpSession = null;

        return {
            success: true,
            message: 'ยืนยัน OTP สำเร็จ',
        };
    },

    /**
     * Get remaining seconds until OTP expires
     */
    getOTPRemainingSeconds: (): number => {
        if (!otpSession) return 0;
        const remaining = Math.ceil((otpSession.expiresAt - Date.now()) / 1000);
        return Math.max(0, remaining);
    },

    /**
     * Clear OTP session
     */
    clearOTPSession: () => {
        otpSession = null;
    },
};
