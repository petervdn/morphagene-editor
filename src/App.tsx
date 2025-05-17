import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FolderPage } from "./pages/FolderPage";
import { ReelPage } from "./pages/ReelPage";
import { routes } from "./routes/routes";
import { AudioContextProvider } from "./context/AudioContextProvider";

function App() {
  return (
    <AudioContextProvider>
      <div className="app-layout">
        <header className="app-header">
          <div className="header-content">
            <h1>Morphagene Editor</h1>
          </div>
        </header>
        <div className="app-container">
          <div className="content-wrapper">
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
