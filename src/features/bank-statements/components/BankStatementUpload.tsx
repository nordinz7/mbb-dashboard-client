import React, { useState } from 'react';
import { uploadBankStatements } from '../services/bank-statements.service';
import { BankStatementUploadResponse } from '../types/bank-statement.types';
import { Modal } from '../../../shared/components/ui';

export const BankStatementUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResults, setUploadResults] = useState<
    BankStatementUploadResponse[]
  >([]);
  const [showModal, setShowModal] = useState(false);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setShowModal(true);
    setIsUploading(true);
    setUploadResults([]);

    try {
      const results = await uploadBankStatements(files);
      setUploadResults(results);
    } catch (error) {
      console.error('Failed to upload bank statements:', error);
      // You might want to show an error toast here
    } finally {
      setIsUploading(false);
      // Clear the input
      event.target.value = '';
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-4">
        <label className="btn btn-primary">
          {isUploading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Uploading...
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
              Upload Bank Statements
            </>
          )}
          <input
            type="file"
            className="hidden"
            multiple
            accept=".pdf,.csv,.txt"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      {/* Upload Results Modal */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Bank Statement Upload Status"
        size="xl"
      >
        {isUploading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <span className="loading loading-spinner loading-lg"></span>
            <p className="mt-4 text-lg">Uploading bank statements...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Message</th>
                  <th>Account Number</th>
                  <th>File Name</th>
                </tr>
              </thead>
              <tbody>
                {uploadResults.map((result, index) => (
                  <tr key={index}>
                    <td>
                      <div className="flex items-center gap-2">
                        {result.success ? (
                          <>
                            <svg
                              className="w-5 h-5 text-success"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="badge badge-success">Success</span>
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5 text-error"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="badge badge-error">Failed</span>
                          </>
                        )}
                      </div>
                    </td>
                    <td>
                      <div className="text-sm">{result.date}</div>
                    </td>
                    <td>
                      <div className="text-sm">{result.message}</div>
                    </td>
                    <td>
                      <code className="text-sm">{result.account_number}</code>
                    </td>
                    <td>
                      <div className="font-medium">{result.fileName}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Modal>
    </div>
  );
};
