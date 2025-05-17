import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FolderPage } from "./pages/FolderPage";
import { ReelPage } from "./pages/ReelPage";
import { routes } from "./routes/routes";

function App() {
  return (
    <div className="app-container">
      <h1>Morphagene editor</h1>
      <div className="content-wrapper">
        <Routes>
          <Route path={routes.home} element={<HomePage />} />
          <Route path={routes.folder} element={<FolderPage />} />
          <Route path={routes.reel} element={<ReelPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
