import styles from "./App.module.css";
import { RouterProvider } from "react-router-dom";
import { AudioContextProvider } from "./context/AudioContextProvider";
import { Footer } from "./components/Footer/Footer";
import { AudioPlayerProvider } from "./context/AudioPlayerProvider";
import { router } from "./routes/router";

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
