import "./App.css";
import CreditDebitDisplay from "./components/CreditDebitDisplay";
import DateRangeSelector from "./components/DateRangeSelector";
import FileUploader from "./components/FileUploader";
import ThemeSwitcher from "./components/ThemeSwitcher";

function App() {
  // File upload handler
  const handleFilesSelected = (files: FileList) => {
    alert(`${files.length} file(s) selected!`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-8 bg-gradient-to-br from-slate-100 to-slate-300 dark:from-zinc-900 dark:to-zinc-800">
      <div className="w-full flex justify-end p-2">
        <ThemeSwitcher />
      </div>
      <h1 className="text-4xl font-bold mb-2">MBB Dashboard</h1>
      <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl items-stretch">
        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col gap-6">
          <h2 className="text-2xl font-semibold mb-2">Upload Bank Statement</h2>
          <FileUploader onFilesSelected={handleFilesSelected} />
          <DateRangeSelector />
        </div>
        <div className="flex-1 bg-white dark:bg-zinc-900 rounded-xl shadow p-6 flex flex-col gap-6 justify-center items-center">
          <h2 className="text-2xl font-semibold mb-2">Summary</h2>
          <CreditDebitDisplay transactions={[]} />
        </div>
      </div>
    </div>
  );
}

export default App;
