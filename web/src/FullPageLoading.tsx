import type { FC } from 'react';

interface FullPageLoadingProps {}

export const FullPageLoading: FC<FullPageLoadingProps> = () => (
  <div className='flex h-full w-full flex-col items-center justify-center gap-2'>
    <div className='border-secondary-600/30 border-b-secondary-600 box-border h-16 w-16 animate-spin rounded-full border-2 border-solid' />
  </div>
);
