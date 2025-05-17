import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage/HomePage";
import { FolderPage } from "./pages/FolderPage/FolderPage";
import { ReelPage } from "./pages/ReelPage/ReelPage";
import { routes } from "./routes/routes";
import { AudioContextProvider } from "./context/AudioContextProvider";

function App() {
  return (
    <AudioContextProvider>
      <div className={styles.appLayout}>
        <header className={styles.appHeader}>
          <div className={styles.headerContent}>
            <h1>Morphagene Editor</h1>
          </div>
        </header>
        <div className={styles.appContainer}>
          <div className={styles.contentWrapper}>
            <Routes>
              <Route path={routes.home} element={<HomePage />} />
              <Route path={routes.folder} element={<FolderPage />} />
              <Route path={routes.reel} element={<ReelPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </AudioContextProvider>
  );
}

export default App;
