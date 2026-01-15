// Door States
export type DoorState = 
  | 'IDLE'           // เริ่มต้น/พึ่งเข้าระบบ
  | 'OPENING'        // กำลังเปิด
  | 'CLOSING'        // กำลังปิด
  | 'STOPPED'        // หยุดอยู่
  | 'FULLY_OPEN'     // เปิดสุด (100%)
  | 'FULLY_CLOSED';  // ปิดสุด (0%)

export interface DoorControlState {
  percentage: number | null;  // null = ไม่แสดง (เริ่มต้น)
  state: DoorState;
  isMoving: boolean;
}

// Auth Types
export interface User {
  phone: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface OTPSession {
  phone: string;
  expiresAt: number;  // timestamp
}

// Door Control Constants
export const DOOR_CONSTANTS = {
  OPEN_DURATION_MS: 46000,   // 46 seconds
  CLOSE_DURATION_MS: 44000,  // 44 seconds
  CCTV_REFRESH_INTERVAL_MS: 500,  // 0.5 seconds
  OTP_EXPIRY_SECONDS: 60,
} as const;
