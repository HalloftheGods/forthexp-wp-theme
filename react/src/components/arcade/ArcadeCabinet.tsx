import React, { useMemo, type CSSProperties } from 'react';
import {
  Button,
  CanvasUI,
  Column,
  Panel,
  PortalSlot,
  Row,
  SpriteText,
  type Rect,
  type UINode,
} from '@knerd/gui';
import { GAMES } from '../../games/games';
import { useArcadeCabinet } from './arcade-cabinet.controller.js';

const CONTAINER_STYLE: CSSProperties = {
  position: 'relative',
  width: '100%',
  height: '780px',
  backgroundColor: '#05070f',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '2px solid rgba(98, 201, 255, 0.25)',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(98, 201, 255, 0.1)',
};

const IFRAME_CONTAINER_STYLE: CSSProperties = {
  position: 'absolute',
  inset: '0',
  pointerEvents: 'auto',
  zIndex: 10,
};

const CRT_SCANLINES_STYLE: CSSProperties = {
  position: 'absolute',
  inset: '0',
  pointerEvents: 'none',
  zIndex: 25,
  background: 'linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.4) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))',
  backgroundSize: '100% 4px, 6px 100%',
};

const IFRAME_FULL_STYLE: CSSProperties = {
  position: 'fixed',
  inset: '0',
  width: '100vw',
  height: '100vh',
  zIndex: 9999,
  backgroundColor: '#000000',
  border: 'none',
};

const IFRAME_INSET_STYLE: CSSProperties = {
  width: '100%',
  height: '100%',
  border: 'none',
  borderRadius: '8px',
};

export function ArcadeCabinet() {
  const { config, currentGame, selectGame, toggleConfigKey, updatePortalBounds } = useArcadeCabinet();
  const { resolutionMode, retroScale, showScanlines, isFullscreen } = config;

  // Build the pure Canvas 2D scene graph for the arcade cabinet
  const guiRoot: UINode = useMemo(() => {
    return Column({ width: '100%', height: '100%', padding: [12, 16, 12, 16], gap: 8 }, [
      // Marquee Header
      Panel(
        {
          backgroundColor: '#0a0f1d',
          borderColor: '#62c9ff',
          borderWidth: 2,
        },
        {
          width: '100%',
          height: 48,
          padding: [8, 16, 8, 16],
          alignItems: 'center',
          justifyContent: 'space-between',
          flexDirection: 'row',
        },
        [
          Row({ gap: 8, alignItems: 'center' }, [
            SpriteText({
              text: '<color=#62c9ff>★ FORTHE-XP ARCADE ★</color>',
              fontSize: 14,
            }),
            SpriteText({
              text: () => `<wave>${currentGame.title.toUpperCase()}</wave>`,
              color: '#f8fafc',
              fontSize: 12,
            }),
          ]),
          Row({ gap: 6, alignItems: 'center' }, [
            Button(
              {
                onClick: () => toggleConfigKey('resolutionMode'),
                defaultBg: '#1e293b',
                hoverBg: '#334155',
                borderColor: '#62c9ff',
              },
              { padding: [4, 10, 4, 10] },
              [
                SpriteText({
                  text: () => `MODE: ${resolutionMode.toUpperCase()}`,
                  fontSize: 10,
                  color: '#62c9ff',
                }),
              ],
            ),
            Button(
              {
                onClick: () => toggleConfigKey('retroScale'),
                defaultBg: '#1e293b',
                hoverBg: '#334155',
                borderColor: '#62c9ff',
              },
              { padding: [4, 8, 4, 8] },
              [
                SpriteText({
                  text: () => `ZOOM: ${retroScale}X`,
                  fontSize: 10,
                  color: '#cbd5e1',
                }),
              ],
            ),
            Button(
              {
                onClick: () => toggleConfigKey('showScanlines'),
                defaultBg: '#1e293b',
                hoverBg: '#334155',
                borderColor: '#62c9ff',
              },
              { padding: [4, 8, 4, 8] },
              [
                SpriteText({
                  text: () => (showScanlines ? 'CRT: ON' : 'CRT: OFF'),
                  fontSize: 10,
                  color: showScanlines ? '#4ade80' : '#94a3b8',
                }),
              ],
            ),
            Button(
              {
                onClick: () => toggleConfigKey('isFullscreen'),
                defaultBg: '#1e293b',
                hoverBg: '#334155',
                borderColor: '#62c9ff',
              },
              { padding: [4, 8, 4, 8] },
              [
                SpriteText({
                  text: () => (isFullscreen ? 'EXIT FULL' : 'EXPAND'),
                  fontSize: 10,
                  color: '#facc15',
                }),
              ],
            ),
          ]),
        ],
      ),

      // Screen Monitor Aperture
      Panel(
        {
          backgroundColor: '#020617',
          borderColor: '#1e293b',
          borderWidth: 3,
        },
        {
          width: '100%',
          flexGrow: 1,
          padding: 4,
          alignItems: 'stretch',
          justifyContent: 'center',
        },
        [
          PortalSlot({
            portalId: 'arcade-monitor-slot',
            onBoundsChange: (b: Rect) => {
              updatePortalBounds(b);
            },
          }),
        ],
      ),

      // Arcade Lower Bezel Controls & Game Selector
      Panel(
        {
          backgroundColor: '#0b1120',
          borderColor: '#334155',
          borderWidth: 1,
        },
        {
          width: '100%',
          height: 52,
          padding: [6, 12, 6, 12],
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        [
          Row({ gap: 6, alignItems: 'center' }, [
            SpriteText({ text: 'SELECT CARTRIDGE:', fontSize: 10, color: '#94a3b8' }),
            ...GAMES.map((game) => {
              const isSelected = game.id === config.gameId;
              return Button(
                {
                  onClick: () => selectGame(game.id),
                  defaultBg: isSelected ? '#1e3a8a' : '#0f172a',
                  hoverBg: '#1e293b',
                  borderColor: isSelected ? '#62c9ff' : '#334155',
                  borderWidth: isSelected ? 2 : 1,
                },
                { padding: [4, 8, 4, 8] },
                [
                  SpriteText({
                    text: game.title.split(':')[0],
                    fontSize: 10,
                    color: isSelected ? '#ffffff' : '#94a3b8',
                  }),
                ],
              );
            }),
          ]),
          Row({ gap: 8, alignItems: 'center' }, [
            SpriteText({
              text: 'STATUS: INSERT COIN / CLICK SCREEN TO PLAY',
              fontSize: 10,
              color: '#38bdf8',
            }),
          ]),
        ],
      ),
    ]);
  }, [
    currentGame,
    resolutionMode,
    retroScale,
    showScanlines,
    isFullscreen,
    config.gameId,
    selectGame,
    toggleConfigKey,
    updatePortalBounds,
  ]);

  const activeIframeStyle = isFullscreen ? IFRAME_FULL_STYLE : IFRAME_INSET_STYLE;

  return (
    <div style={CONTAINER_STYLE}>
      <CanvasUI root={guiRoot} resolutionMode={resolutionMode} retroScale={retroScale}>
        <div style={IFRAME_CONTAINER_STYLE} className="p-3">
          <div className="relative w-full h-[620px] rounded-lg overflow-hidden bg-black flex items-center justify-center">
            {showScanlines && <div style={CRT_SCANLINES_STYLE} />}
            <iframe
              src={currentGame.playUrl}
              title={currentGame.title}
              style={activeIframeStyle}
              allow="autoplay; fullscreen; gamepad"
            />
          </div>
        </div>
      </CanvasUI>
    </div>
  );
}
