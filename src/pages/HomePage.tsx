import { type ReactElement } from "react";
import { setDirectoryHandle } from "../stores/directoryHandleStore";
import { useNavigate } from "react-router-dom";

export function HomePage(): ReactElement {
  const navigate = useNavigate();
  const onFolderSelectClick = async () => {
    const directoryHandle = await window.showDirectoryPicker();

    setDirectoryHandle(directoryHandle);
    navigate("/folder");
  };

  return (
    <>
      <p>
        Welcome to the Morphagene Sound Editor! This is a web tool for editing
        sound files that are used in the Eurorack Morphagene module. It is
        currently in development and should be working by the time you read
        this. If you have any feedback or feature requests please feel free to
        open an issue on GitHub.
      </p>
      <button onClick={onFolderSelectClick} className="select-folder-btn">
        Select Reels Folder
      </button>
    </>
  );
}
