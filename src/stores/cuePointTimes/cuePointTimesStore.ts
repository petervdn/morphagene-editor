import { create } from "zustand";

type CuePointTimesStore = {
  // initially set by loaded wav header data, can be modified by user
  cuePointTimes: Array<number> | null;
  // only set by loaded wav header, used to check if there are unsaved changes
  originalCuePointTimes: Array<number> | null;
  // a temp set of times, suggested by auto slice operations
  autoSliceCuePointTimes: Array<number> | null;
};

export const useCuePointTimesStore = create<CuePointTimesStore>(() => ({
  cuePointTimes: null,
  originalCuePointTimes: [],
  autoSliceCuePointTimes: null,
}));
