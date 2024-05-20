import type { FC } from 'react';

export const ErrorComponent: FC<{
  children?: React.ReactNode;
  error: Error;
  reset: () => void;
}> = ({ error, reset, children }) => {
  return (
    <div className='flex h-full w-full min-w-[256px] max-w-full flex-col items-center justify-center gap-2 p-2'>
      <div className='flex flex-col items-center justify-center gap-2'>
        <span>{error.message}</span>
      </div>
      <button className='border border-black p-3' onClick={reset}>
        Refresh
      </button>
      {children}
    </div>
  );
};

export default ErrorComponent;
