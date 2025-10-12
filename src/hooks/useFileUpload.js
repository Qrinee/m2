import { useState, useRef } from 'react';

export const useFileUpload = () => {
  const [files, setFiles] = useState([]);
  const idRef = useRef(1);

  const addFiles = (fileList) => {
    const arr = Array.from(fileList).map((f) => {
      const id = idRef.current++;
      const src = f.type.startsWith("image/") ? URL.createObjectURL(f) : null;
      return { id, file: f, src, isCover: files.length === 0 && idRef.current === 2 };
    });
    setFiles((s) => [...s, ...arr]);
  };

  const toggleCover = (id) => {
    setFiles((s) => s.map((f) => ({ ...f, isCover: f.id === id })));
  };

  const removeFile = (id) => {
    setFiles((s) => s.filter((f) => f.id !== id));
  };

  const resetFiles = () => {
    setFiles([]);
    idRef.current = 1;
  };

  return {
    files,
    addFiles,
    toggleCover,
    removeFile,
    resetFiles
  };
};