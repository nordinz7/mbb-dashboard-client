import React, { useState, useRef, useEffect } from 'react';
import { useAccountNumbers } from '../../hooks/useAccountNumbers';

interface AccountSelectorProps {
  value: string;
  onChange: (accountNumber: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const AccountSelector: React.FC<AccountSelectorProps> = ({
  value,
  onChange,
  placeholder = "Search and select account number",
  disabled = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { accountNumbers, loading, error, searchAccounts } = useAccountNumbers();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      searchAccounts(searchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, searchAccounts]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onChange(newValue);
    setIsOpen(true);
  };

  const handleAccountSelect = (accountNumber: string) => {
    onChange(accountNumber);
    setSearchTerm('');
    setIsOpen(false);
    inputRef.current?.blur();
  };

  const handleInputFocus = () => {
    if (!disabled) {
      setIsOpen(true);
      setSearchTerm(value);
    }
  };

  const filteredAccounts = accountNumbers.filter(account => 
    account.account_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <div className="form-control w-full">
        <label className="label">
          <span className="label-text">Account Number</span>
        </label>
        <input
          ref={inputRef}
          type="text"
          placeholder={placeholder}
          className={`input input-bordered w-full ${disabled ? 'input-disabled' : ''}`}
          value={isOpen ? searchTerm : value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          disabled={disabled}
        />
      </div>

      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading && (
            <div className="flex justify-center items-center py-4">
              <span className="loading loading-spinner loading-sm"></span>
              <span className="ml-2 text-sm">Loading accounts...</span>
            </div>
          )}

          {error && (
            <div className="p-3 text-error text-sm">
              <div className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="stroke-current shrink-0 h-4 w-4 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            </div>
          )}

          {!loading && !error && filteredAccounts.length === 0 && (
            <div className="p-3 text-base-content/60 text-sm text-center">
              {searchTerm ? `No accounts found matching "${searchTerm}"` : 'No accounts available'}
            </div>
          )}

          {!loading && !error && filteredAccounts.map((account) => (
            <button
              key={account.account_number}
              className="w-full text-left px-3 py-2 hover:bg-base-200 focus:bg-base-200 focus:outline-none transition-colors"
              onClick={() => handleAccountSelect(account.account_number)}
            >
              <div className="flex items-center">
                <code className="text-sm font-mono bg-base-200 px-2 py-1 rounded">
                  {account.account_number}
                </code>
              </div>
            </button>
          ))}

          {!loading && !error && filteredAccounts.length > 0 && searchTerm && (
            <div className="border-t border-base-300 p-2">
              <div className="text-xs text-base-content/60 text-center">
                {filteredAccounts.length} account{filteredAccounts.length !== 1 ? 's' : ''} found
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
