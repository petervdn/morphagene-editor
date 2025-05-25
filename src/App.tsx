import styles from "./App.module.css";
import { RouterProvider } from "react-router-dom";
import { AudioContextProvider } from "./context/AudioContextProvider";
import { Footer } from "./components/Footer/Footer";
import { AudioPlayerProvider } from "./context/AudioPlayerProvider";
import { router } from "./routes/router";

/*
- add mm linting
- unify ids/index for both reels and splices
- remove file
- auto slice with divisions
- auto slice on transients
- options
- zoom/pan
- better home page
- view wave as L/R/stereo
- cut parts of audio
- mm ts config (noUncheckedIndexedAccess)
- use mantine?
- delete all splices
- handle when splice doesnt exit (when you looking at it and remove it)
- keyboard navigation
- splice waveview up into two units? (or keep one wave view?)
- drag splice edges
- show marker under mouse when hovering over wave
- some kind of way to only cut in wave corssing
- indicate disk action
- max splices
- throw error on 0 splices
- handle audiocontext not running at 48khz? not sure if this matters
- check what morphagene does with gaps in filenames
- show warinnig if a file is not 48khz or 32bit? )probably include is there are no cuepoints)
- use wav read/write lib
*/

function App() {
  return (
    <AudioContextProvider>
      <AudioPlayerProvider>
        <div className={styles.appLayout}>
          <header className={styles.appHeader}>
            <div className={styles.headerContent}>
              <h1>Morphagene Editor</h1>
            </div>
          </header>
          <div className={styles.appContainer}>
            <div className={styles.contentWrapper}>
              <RouterProvider router={router} />
            </div>
          </div>
          <Footer />
        </div>
      </AudioPlayerProvider>
    </AudioContextProvider>
  );
}

export default App;
