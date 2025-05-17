// Type definitions for WebAudio API with vendor prefixes

interface Window {
  AudioContext: typeof AudioContext;
  webkitAudioContext: typeof AudioContext;
}
