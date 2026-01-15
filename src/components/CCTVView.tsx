'use client';

import { useEffect, useState } from 'react';
import { Video, RefreshCw } from 'lucide-react';
import { DOOR_CONSTANTS } from '@/types';

const CCTV_URL = 'https://accessio.nidpro.tech/cctv.jpg';

export function CCTVView() {
    const [imageUrl, setImageUrl] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

    useEffect(() => {
        // Function to update image URL with cache-busting timestamp
        const updateImage = () => {
            setImageUrl(`${CCTV_URL}?t=${Date.now()}`);
            setLastUpdate(new Date());
        };

        // Initial load
        updateImage();

        // Set up interval for auto-refresh
        const interval = setInterval(updateImage, DOOR_CONSTANTS.CCTV_REFRESH_INTERVAL_MS);

        return () => clearInterval(interval);
    }, []);

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('th-TH', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    return (
        <div className="bg-bg-card rounded-2xl overflow-hidden border border-border">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-bg-elevated border-b border-border">
                <div className="flex items-center gap-2">
                    <Video className="w-5 h-5 text-danger" />
                    <span className="font-semibold text-text-primary">กล้องวงจรปิด</span>
                    <span className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-danger rounded-full animate-pulse" />
                        <span className="text-xs text-danger">LIVE</span>
                    </span>
                </div>
                {lastUpdate && (
                    <div className="flex items-center gap-1 text-xs text-text-muted">
                        <RefreshCw className="w-3 h-3" />
                        {formatTime(lastUpdate)}
                    </div>
                )}
            </div>

            {/* Camera View */}
            <div className="relative aspect-video bg-bg-primary">
                {isLoading && !error && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    </div>
                )}

                {error ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-text-muted">
                        <Video className="w-12 h-12 mb-2 opacity-50" />
                        <p>ไม่สามารถโหลดภาพได้</p>
                    </div>
                ) : imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="CCTV Feed"
                        className="w-full h-full object-cover"
                        onLoad={() => {
                            setIsLoading(false);
                            setError(false);
                        }}
                        onError={() => {
                            setIsLoading(false);
                            setError(true);
                        }}
                    />
                ) : null}

                {/* Overlay Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <div className="flex items-center justify-between text-white text-xs">
                        <span>CAM-01 | ประตูหน้า</span>
                        <span>🔴 Recording</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
