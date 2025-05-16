import "./App.css";
import { Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { FolderPage } from "./pages/FolderPage";
import { ReelPage } from "./pages/ReelPage";

function App() {
  return (
    <div className="app-container">
      <h1>Morphagene editor</h1>
      <div className="content-wrapper">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/folder" element={<FolderPage />} />
          <Route path="/folder/reel/:reelName" element={<ReelPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
