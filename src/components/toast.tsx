import React from 'react';

interface ToastType {
  toastType: string;
  fn: () => void;
  message: string;
}

const Toast = ({ toastType, fn, message }: ToastType) => {
  return (
    <div
      className={`max-w-xs ${toastType} text-sm text-white rounded-xl shadow-lg`}
      role="alert"
      aria-labelledby="hs-toast-solid-color-red-label"
    >
      <div id="hs-toast-solid-color-red-label" className="flex p-4">
        {message}
        <div className="ms-auto">
          <button
            type="button"
            className="inline-flex shrink-0 justify-center items-center size-5 rounded-lg text-white hover:text-white opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100"
            aria-label="Close"
            onClick={() => fn()}
          >
            <span className="sr-only">Close</span>
            <svg
              className="shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
