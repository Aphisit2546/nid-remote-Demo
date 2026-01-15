'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { DoorState, DoorControlState, DOOR_CONSTANTS } from '@/types';

interface UseDoorControlReturn extends DoorControlState {
    open: () => void;
    close: () => void;
    stop: () => void;
    canOpen: boolean;
    canClose: boolean;
    canStop: boolean;
}

export function useDoorControl(): UseDoorControlReturn {
    const [percentage, setPercentage] = useState<number | null>(null);
    const [state, setState] = useState<DoorState>('IDLE');
    const [isMoving, setIsMoving] = useState(false);

    const animationRef = useRef<number | null>(null);
    const startTimeRef = useRef<number | null>(null);
    const startPercentageRef = useRef<number>(0);
    const targetPercentageRef = useRef<number>(0);
    const durationRef = useRef<number>(0);

    // Cleanup animation on unmount
    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    const animate = useCallback((timestamp: number) => {
        if (!startTimeRef.current) {
            startTimeRef.current = timestamp;
        }

        const elapsed = timestamp - startTimeRef.current;
        const progress = Math.min(elapsed / durationRef.current, 1);

        const startPct = startPercentageRef.current;
        const targetPct = targetPercentageRef.current;
        const currentPct = startPct + (targetPct - startPct) * progress;

        setPercentage(Math.round(currentPct));

        if (progress < 1) {
            animationRef.current = requestAnimationFrame(animate);
        } else {
            // Animation complete
            setPercentage(targetPct);
            setIsMoving(false);
            animationRef.current = null;
            startTimeRef.current = null;

            if (targetPct === 100) {
                setState('FULLY_OPEN');
            } else if (targetPct === 0) {
                setState('FULLY_CLOSED');
            }
        }
    }, []);

    const open = useCallback(() => {
        if (isMoving) return;

        // Initialize percentage if first action
        const currentPct = percentage ?? 0;

        if (currentPct >= 100) return; // Already fully open

        // Calculate remaining duration based on current percentage
        const remainingPercentage = 100 - currentPct;
        const duration = (remainingPercentage / 100) * DOOR_CONSTANTS.OPEN_DURATION_MS;

        startPercentageRef.current = currentPct;
        targetPercentageRef.current = 100;
        durationRef.current = duration;
        startTimeRef.current = null;

        setPercentage(currentPct);
        setState('OPENING');
        setIsMoving(true);

        animationRef.current = requestAnimationFrame(animate);
    }, [isMoving, percentage, animate]);

    const close = useCallback(() => {
        if (isMoving) return;

        // Initialize percentage if first action
        const currentPct = percentage ?? 100;

        if (currentPct <= 0) return; // Already fully closed

        // Calculate remaining duration based on current percentage
        const remainingPercentage = currentPct;
        const duration = (remainingPercentage / 100) * DOOR_CONSTANTS.CLOSE_DURATION_MS;

        startPercentageRef.current = currentPct;
        targetPercentageRef.current = 0;
        durationRef.current = duration;
        startTimeRef.current = null;

        setPercentage(currentPct);
        setState('CLOSING');
        setIsMoving(true);

        animationRef.current = requestAnimationFrame(animate);
    }, [isMoving, percentage, animate]);

    const stop = useCallback(() => {
        if (!isMoving) return;

        if (animationRef.current) {
            cancelAnimationFrame(animationRef.current);
            animationRef.current = null;
        }

        startTimeRef.current = null;
        setState('STOPPED');
        setIsMoving(false);
    }, [isMoving]);

    // Determine which buttons can be pressed
    const canOpen = !isMoving && (percentage === null || percentage < 100);
    const canClose = !isMoving && (percentage === null || percentage > 0);
    const canStop = isMoving;

    return {
        percentage,
        state,
        isMoving,
        open,
        close,
        stop,
        canOpen,
        canClose,
        canStop,
    };
}
