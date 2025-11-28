import { useState } from 'react';
import {
  ToneProvider,
  TONES,
  type ToneId,
} from '../../src/effects/ToneProvider';
import { ThemeShowcase } from './components/ThemeShowcase';

const TONE_IDS = Object.keys(TONES) as ToneId[];

export default function App() {
  const [activeTheme, setActiveTheme] = useState<ToneId>('default');

  return (
    <div className="min-h-screen bg-[rgb(10,12,28)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgb(10,12,28)]/95 backdrop-blur-lg">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500">
                <span className="text-xl">🎮</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Loyalteez</h1>
                <p className="text-xs text-gray-400">React Component Library</p>
              </div>
            </div>
            <a
              href="https://github.com/Alpha4-Labs/loyalteez-react-components"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

        {/* Theme Tabs */}
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex gap-1 overflow-x-auto pb-2 scrollbar-thin">
            {TONE_IDS.map((toneId) => {
              const tone = TONES[toneId];
              const isActive = activeTheme === toneId;
              return (
                <button
                  key={toneId}
                  onClick={() => setActiveTheme(toneId)}
                  className={`flex-shrink-0 rounded-t-lg px-4 py-2 text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                  }`}
                  style={{
                    borderBottom: isActive
                      ? `2px solid rgb(${tone.colors.primary})`
                      : '2px solid transparent',
                  }}
                >
                  {tone.name}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8">
        <ToneProvider tone={activeTheme} key={activeTheme}>
          <ThemeShowcase toneId={activeTheme} />
        </ToneProvider>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-gray-500">
        <p>
          Built with 💜 by{' '}
          <a href="https://loyalteez.io" className="text-cyan-400 hover:underline">
            Loyalteez
          </a>
        </p>
        <p className="mt-1">v0.6.0 • Effects Layer Edition</p>
      </footer>
    </div>
  );
}

