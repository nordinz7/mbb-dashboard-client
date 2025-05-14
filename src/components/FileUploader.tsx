import React from 'react'

interface FileUploaderProps {
  onFilesSelected?: (files: FileList) => void
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && onFilesSelected) {
      onFilesSelected(e.target.files)
    }
  }

  return (
    <div>
      <input type="file" multiple onChange={handleChange} accept="application/pdf" />
      <p>Upload PDF files or a folder</p>
    </div>
  )
}

export default FileUploader
