'use client';

import { ChevronUp, ChevronDown, Square } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/utils/cn';

interface DoorControlsProps {
    onOpen: () => void;
    onClose: () => void;
    onStop: () => void;
    canOpen: boolean;
    canClose: boolean;
    canStop: boolean;
    isMoving: boolean;
}

export function DoorControls({
    onOpen,
    onClose,
    onStop,
    canOpen,
    canClose,
    canStop,
    isMoving,
}: DoorControlsProps) {
    return (
        <div className="bg-bg-card rounded-2xl p-6 border border-border">
            <h3 className="text-lg font-semibold text-text-primary mb-6">ควบคุมประตู</h3>

            <div className="space-y-4">
                {/* OPEN Button */}
                <Button
                    onClick={onOpen}
                    disabled={!canOpen}
                    variant="success"
                    size="lg"
                    className={cn(
                        'w-full text-lg',
                        !canOpen && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <ChevronUp className="w-6 h-6 mr-2" />
                    OPEN
                    <span className="ml-2 text-sm opacity-80">(เปิด)</span>
                </Button>

                {/* STOP Button */}
                <Button
                    onClick={onStop}
                    variant="warning"
                    size="lg"
                    className={cn(
                        'w-full text-lg',
                        canStop && 'animate-pulse-slow',
                        !canStop && 'bg-gray-300 hover:bg-gray-400 text-gray-700 shadow-none'
                    )}
                >
                    <Square className="w-5 h-5 mr-2" />
                    STOP
                    <span className="ml-2 text-sm opacity-80">(หยุด)</span>
                </Button>

                {/* CLOSE Button */}
                <Button
                    onClick={onClose}
                    disabled={!canClose}
                    variant="danger"
                    size="lg"
                    className={cn(
                        'w-full text-lg',
                        !canClose && 'opacity-50 cursor-not-allowed'
                    )}
                >
                    <ChevronDown className="w-6 h-6 mr-2" />
                    CLOSE
                    <span className="ml-2 text-sm opacity-80">(ปิด)</span>
                </Button>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-bg-elevated rounded-xl">
                <p className="text-sm text-text-muted">
                    {isMoving ? (
                        <span className="text-warning">
                            ⚠️ ระหว่างเคลื่อนที่ กด STOP เพื่อหยุดก่อนจึงจะกดปุ่มอื่นได้
                        </span>
                    ) : (
                        <span>
                            ℹ️ กด OPEN เพื่อเปิดประตู หรือ CLOSE เพื่อปิดประตู
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
}
