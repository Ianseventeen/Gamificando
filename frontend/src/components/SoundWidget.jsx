import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundService } from '../services/sound';
import './SoundWidget.css';

export default function SoundWidget() {
  const [isMuted, setIsMuted] = useState(soundService.getMuteState());

  const handleToggle = () => {
    const nextMuted = soundService.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      soundService.playSuccessBell(); // Welcome bell sound
    }
  };

  return (
    <button 
      className={`sound-widget glass-panel ${isMuted ? 'muted' : 'active'}`}
      onClick={handleToggle}
      aria-label="Alternar Som"
    >
      {isMuted ? (
        <VolumeX className="sound-icon" size={18} />
      ) : (
        <Volume2 className="sound-icon" size={18} />
      )}
    </button>
  );
}
