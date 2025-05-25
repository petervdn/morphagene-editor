export function selectAudioFile(): Promise<File> {
  return new Promise((resolve) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".wav,.aiff,.mp3";
    fileInput.multiple = false;

    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        resolve(file);
      }
    };

    fileInput.click();
  });
}
