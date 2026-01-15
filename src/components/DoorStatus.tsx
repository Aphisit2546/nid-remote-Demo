'use client';

import { DoorState } from '@/types';
import { cn } from '@/utils/cn';

interface DoorStatusProps {
    percentage: number | null;
    state: DoorState;
    isMoving: boolean;
}

export function DoorStatus({ percentage, state, isMoving }: DoorStatusProps) {
    const getStatusText = () => {
        switch (state) {
            case 'OPENING':
                return 'กำลังเปิด...';
            case 'CLOSING':
                return 'กำลังปิด...';
            case 'STOPPED':
                return 'หยุดอยู่';
            case 'FULLY_OPEN':
                return 'เปิดสุด';
            case 'FULLY_CLOSED':
                return 'ปิดสุด';
            case 'IDLE':
            default:
                return 'พร้อมใช้งาน';
        }
    };

    const getStatusColor = () => {
        switch (state) {
            case 'OPENING':
                return 'text-success';
            case 'CLOSING':
                return 'text-danger';
            case 'STOPPED':
                return 'text-warning';
            case 'FULLY_OPEN':
                return 'text-success';
            case 'FULLY_CLOSED':
                return 'text-text-muted';
            default:
                return 'text-text-secondary';
        }
    };

    const getProgressColor = () => {
        if (state === 'OPENING' || state === 'FULLY_OPEN') return 'bg-success';
        if (state === 'CLOSING') return 'bg-danger';
        if (state === 'STOPPED') return 'bg-warning';
        return 'bg-primary';
    };

    return (
        <div className="bg-bg-card rounded-2xl p-6 border border-border">
            {/* Status Header */}
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-text-primary">สถานะประตู</h3>
                <div className={cn(
                    'px-3 py-1 rounded-full text-sm font-medium',
                    isMoving ? 'animate-pulse-slow' : '',
                    state === 'OPENING' && 'bg-success/20 text-success',
                    state === 'CLOSING' && 'bg-danger/20 text-danger',
                    state === 'STOPPED' && 'bg-warning/20 text-warning',
                    state === 'FULLY_OPEN' && 'bg-success/20 text-success',
                    state === 'FULLY_CLOSED' && 'bg-bg-elevated text-text-muted',
                    state === 'IDLE' && 'bg-bg-elevated text-text-secondary',
                )}>
                    {state.replace('_', ' ')}
                </div>
            </div>

            {/* Percentage Display */}
            <div className="text-center py-8">
                {percentage !== null ? (
                    <div className="relative">
                        <span className="text-7xl font-bold text-text-primary tabular-nums">
                            {percentage}
                        </span>
                        <span className="text-3xl text-text-secondary ml-1">%</span>
                    </div>
                ) : (
                    <div className="text-2xl text-text-muted">
                        กดปุ่มเพื่อเริ่มควบคุม
                    </div>
                )}
                <p className={cn('mt-3 text-lg font-medium', getStatusColor())}>
                    {getStatusText()}
                </p>
            </div>

            {/* Progress Bar */}
            {percentage !== null && (
                <div className="mt-4">
                    <div className="h-3 bg-bg-elevated rounded-full overflow-hidden">
                        <div
                            className={cn(
                                'h-full rounded-full transition-all duration-100',
                                getProgressColor(),
                                isMoving && 'animate-pulse-slow'
                            )}
                            style={{ width: `${percentage}%` }}
                        />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-text-muted">
                        <span>ปิด (0%)</span>
                        <span>เปิด (100%)</span>
                    </div>
                </div>
            )}
        </div>
    );
}
