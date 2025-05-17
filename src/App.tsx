import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FolderPage } from "./pages/FolderPage";
import { ReelPage } from "./pages/ReelPage";
import { ROUTES } from "./routes/routes";

function App() {
  return (
    <div className="app-container">
      <h1>Morphagene editor</h1>
      <div className="content-wrapper">
        <Routes>
          <Route path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.FOLDER} element={<FolderPage />} />
          <Route path={ROUTES.REEL} element={<ReelPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
