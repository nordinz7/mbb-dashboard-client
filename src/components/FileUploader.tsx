import React from 'react';
import config from '../config';

interface FileUploaderProps {
  onFilesSelected?: (files: FileList) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onFilesSelected) {
      onFilesSelected(e.target.files);
    }
    if (e.target.files) {
      const formData = new FormData();
      Array.from(e.target.files).forEach((file) => {
        formData.append('file', file); // Flask expects 'file' for each file
      });
      try {
        const response = await fetch(
          `${config.API_URL}/api/bank-statements/upload`,
          {
            method: 'POST',
            body: formData,
          },
        );
        if (!response.ok) {
          // Handle error
          alert('Upload failed');
        } else {
          // Optionally handle success
          alert('Upload successful');
        }
      } catch {
        alert('Upload error');
      }
    }
  };

  return (
    <input
      type="file"
      multiple
      onChange={handleChange}
      accept="application/pdf"
    />
  );
};

export default FileUploader;
