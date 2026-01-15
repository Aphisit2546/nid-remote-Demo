import { OTPSession, DOOR_CONSTANTS } from '@/types';

const OTP_SESSION_KEY = 'rolling-shutter-otp-session';

// Helper to get OTP session from sessionStorage
const getOTPSession = (): OTPSession | null => {
    if (typeof window === 'undefined') return null;
    try {
        const stored = sessionStorage.getItem(OTP_SESSION_KEY);
        if (stored) {
            return JSON.parse(stored) as OTPSession;
        }
    } catch {
        // Ignore parse errors
    }
    return null;
};

// Helper to save OTP session to sessionStorage
const saveOTPSession = (session: OTPSession | null) => {
    if (typeof window === 'undefined') return;
    if (session) {
        sessionStorage.setItem(OTP_SESSION_KEY, JSON.stringify(session));
    } else {
        sessionStorage.removeItem(OTP_SESSION_KEY);
    }
};

export const authService = {
    /**
     * Send OTP to phone number
     * Demo: Always succeeds, stores session with expiry
     */
    sendOTP: async (phone: string): Promise<{ success: boolean; message: string }> => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));

        // Create OTP session and save to sessionStorage
        const session: OTPSession = {
            phone,
            expiresAt: Date.now() + (DOOR_CONSTANTS.OTP_EXPIRY_SECONDS * 1000),
        };
        saveOTPSession(session);

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

        const otpSession = getOTPSession();

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
            saveOTPSession(null);
            return {
                success: false,
                message: 'OTP หมดอายุแล้ว กรุณาขอใหม่',
            };
        }

        console.log('[Demo] OTP verified for:', phone);

        // Clear session after successful verification
        saveOTPSession(null);

        return {
            success: true,
            message: 'ยืนยัน OTP สำเร็จ',
        };
    },

    /**
     * Get remaining seconds until OTP expires
     */
    getOTPRemainingSeconds: (): number => {
        const otpSession = getOTPSession();
        if (!otpSession) return 0;
        const remaining = Math.ceil((otpSession.expiresAt - Date.now()) / 1000);
        return Math.max(0, remaining);
    },

    /**
     * Clear OTP session
     */
    clearOTPSession: () => {
        saveOTPSession(null);
    },
};
