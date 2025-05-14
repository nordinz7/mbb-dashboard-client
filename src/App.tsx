import './App.css'

import config from '../config'
import DateRangeSelector from './components/DateRangeSelector'
import FileUploader from './components/FileUploader'
import ThemeSwitcher from './components/ThemeSwitcher'

function App() {
  const handleFilesSelected = async (files: FileList) => {
    if (!files.length) return
    const formData = new FormData()
    for (let i = 0; i < files.length; i++) {
      formData.append('file', files[i])
    }
    try {
      const res = await fetch(`${config.apiUrl}/api/bank-statements/upload`, {
        method: 'POST',
        body: formData
      })
      if (!res.ok) {
        const err = await res.json()
        alert(`Upload failed: ${err.error || res.statusText}`)
        return
      }
      alert(`Upload successful! Uploaded ${files.length} file(s).`)
    } catch (e) {
      alert('Upload failed: ' + (e instanceof Error ? e.message : e))
    }
  }

  return (
    <>
      {/* <ThemeSwitcher />
      <FileUploader onFilesSelected={handleFilesSelected} />
      <DateRangeSelector /> */}
      <h1> HEllo</h1>
    </>
  )
}

export default App
