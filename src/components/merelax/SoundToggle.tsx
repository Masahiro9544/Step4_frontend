'use client';

import { useSound } from '@/hooks/useSound';

interface SoundToggleProps {
    className?: string;
}

export default function SoundToggle({ className = '' }: SoundToggleProps) {
    const { soundEnabled, toggleSound } = useSound();

    return (
        <button
            onClick={toggleSound}
            className={`flex items-center gap-2 bg-white/90 backdrop-blur-md px-4 py-3 rounded-full text-merelax-primary font-bold shadow-lg hover:bg-white transition-all transform hover:scale-105 active:scale-95 border-2 border-merelax-primary/20 ${className}`}
            aria-label="音声切り替え"
        >
            <span className="text-xl">{soundEnabled ? '🎵' : '🔇'}</span>
            <span className="text-sm font-bold">おと {soundEnabled ? 'ON' : 'OFF'}</span>
        </button>
    );
}
