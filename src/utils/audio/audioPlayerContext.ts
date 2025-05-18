import { createContext } from "react";
import type { AudioPlayerProps } from "../../context/AudioPlayerProvider";

export const audioPlayerContext = createContext<AudioPlayerProps | null>(null);
