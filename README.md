# 🚪 Rolling Shutter Remote Control Demo

ระบบควบคุมประตูม้วนเหล็กระยะไกล (Demo) | Remote control system for steel roller doors

![Next.js](https://img.shields.io/badge/Next.js-16.1.2-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4)

---

## ✨ Features

- 📱 **Responsive Design** - รองรับทั้ง Desktop และ Mobile
- 🔐 **Phone + OTP Authentication** (Demo Mode)
- 🎛️ **Door Controls** - ปุ่ม OPEN / STOP / CLOSE พร้อม animation
- 📹 **Live CCTV Feed** - แสดงภาพจากกล้องวงจรปิดแบบ real-time
- 📊 **Progress Indicator** - แสดงเปอร์เซ็นต์การเปิด-ปิดประตู
- 📜 **History Logs** - ประวัติการใช้งานประตูและระบบ (Mock)

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd rolling-shutter-demo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## ⚙️ Environment Variables

สร้างไฟล์ `.env.local` ที่ root ของโปรเจค:

```env
NEXT_PUBLIC_CCTV_URL=https:xxxxxxxxxxxxxxxxx
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_CCTV_URL` | URL ของ CCTV image feed |

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/          # หน้าควบคุมประตูหลัก
│   ├── history/
│   │   ├── door/           # ประวัติการใช้งานประตู
│   │   └── system/         # ประวัติการใช้งานระบบ
│   ├── login/              # หน้า Login
│   ├── manage/             # หน้าจัดการข้อมูล
│   ├── otp/                # หน้ายืนยัน OTP
│   ├── profile/            # หน้าโปรไฟล์
│   └── layout.tsx          # Root layout
├── components/
│   ├── ProtectedRoute.tsx  # Auth guard component
│   └── SidebarMenu.tsx     # Navigation sidebar
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── hooks/
│   └── useDoorControl.ts   # Door control state & logic
├── services/
│   └── authService.ts      # OTP authentication service
├── types/
│   └── index.ts            # TypeScript types & constants
└── utils/
    └── cn.ts               # Classname utility
```

---

## 🎮 Door Control Logic

| State | Description |
|-------|-------------|
| `IDLE` | เริ่มต้น / พึ่งเข้าระบบ |
| `OPENING` | กำลังเปิด (46 วินาที 0→100%) |
| `CLOSING` | กำลังปิด (44 วินาที 100→0%) |
| `STOPPED` | หยุดกลางทาง |
| `FULLY_OPEN` | เปิดสุด (100%) |
| `FULLY_CLOSED` | ปิดสุด (0%) |

---

## ⚠️ Important Notes

> **🚨 Demo Mode Only**
> 
> ระบบนี้เป็น Demo เท่านั้น:
> - OTP รับค่าอะไรก็ได้ 6 หลัก
> - เบอร์โทรศัพท์ไม่มีการตรวจสอบจริง  
> - Auth เก็บใน localStorage
> 
> **ห้ามนำไป Deploy เป็น Production โดยไม่แก้ไขระบบ Authentication!**

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS 4
- **Icons**: Lucide React
- **Language**: TypeScript

---

## 📄 License

ไว้ทดสอบเท่านั้นครับ.
