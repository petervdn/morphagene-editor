import { createBrowserRouter, redirect } from "react-router-dom";
import { HomePage } from "../pages/HomePage/HomePage";
import { FolderPage } from "../pages/FolderPage/FolderPage";
import { OptionsPage } from "../pages/OptionsPage/OptionsPage";
import { ReelPage } from "../pages/ReelPage/ReelPage";
import { routes } from "./routes";
import { basePath } from "../constants/basePath";
import { useFolderContentStore } from "../stores/folderContentStore";

function requireFolderContent() {
  const { folderContent } = useFolderContentStore.getState();
  if (!folderContent) {
    return redirect(routes.home);
  }
  return null;
}

export const router = createBrowserRouter(
  [
    { path: routes.home, element: <HomePage /> },
    {
      path: routes.folder,
      element: <FolderPage />,
    },
    {
      path: routes.options,
      element: <OptionsPage />,
      loader: requireFolderContent,
    },
    {
      path: routes.splice,
      element: <ReelPage />,
      loader: requireFolderContent,
    },
  ],
  {
    basename: basePath,
  }
);
