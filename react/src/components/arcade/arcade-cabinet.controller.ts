import { useState } from 'react';
import type { Rect, ResolutionMode } from '@knerd/gui';
import { GAMES } from '../../games/games';
import type { Game } from '../../games/types';

export interface ArcadeConfig {
  gameId: string;
  resolutionMode: ResolutionMode;
  retroScale: number;
  showScanlines: boolean;
  isFullscreen: boolean;
  portalBounds: Rect | null;
}

const DEFAULT_CONFIG: ArcadeConfig = {
  gameId: 'undead-of-night',
  resolutionMode: 'retro',
  retroScale: 2,
  showScanlines: true,
  isFullscreen: false,
  portalBounds: null,
};

export interface ArcadeCabinetHook {
  config: ArcadeConfig;
  currentGame: Game;
  selectGame: (id: string) => void;
  toggleConfigKey: (key: 'resolutionMode' | 'retroScale' | 'showScanlines' | 'isFullscreen') => void;
  updatePortalBounds: (bounds: Rect) => void;
}

export function useArcadeCabinet(): ArcadeCabinetHook {
  const [config, setConfig] = useState<ArcadeConfig>(DEFAULT_CONFIG);

  const foundGame = GAMES.find((g) => g.id === config.gameId);
  const currentGame = foundGame ?? GAMES[0];

  const selectGame = (id: string): void => {
    setConfig((prev) => ({ ...prev, gameId: id }));
  };

  const toggleConfigKey = (key: 'resolutionMode' | 'retroScale' | 'showScanlines' | 'isFullscreen'): void => {
    setConfig((prev) => {
      const isResolutionMode = key === 'resolutionMode';
      if (isResolutionMode) {
        const nextMode = prev.resolutionMode === 'retro' ? 'native' : 'retro';
        return { ...prev, resolutionMode: nextMode };
      }
      const isRetroScale = key === 'retroScale';
      if (isRetroScale) {
        const nextScale = prev.retroScale === 2 ? 3 : 2;
        return { ...prev, retroScale: nextScale };
      }
      const isScanlines = key === 'showScanlines';
      if (isScanlines) {
        return { ...prev, showScanlines: !prev.showScanlines };
      }
      return { ...prev, isFullscreen: !prev.isFullscreen };
    });
  };

  const updatePortalBounds = (bounds: Rect): void => {
    setConfig((prev) => ({ ...prev, portalBounds: bounds }));
  };

  return {
    config,
    currentGame,
    selectGame,
    toggleConfigKey,
    updatePortalBounds,
  };
}
