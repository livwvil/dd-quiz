import type { FC } from 'react';

interface PasswordCellProps {}

export const PasswordCell: FC<PasswordCellProps> = () => {
  return (
    <input
      className='h-[40px] w-[30px] rounded-md bg-[#fffa] text-center'
      style={{ boxShadow: '0 5px 3px #444' }}
      onFocus={e => e.target?.select()}
      onKeyUp={e => {
        const target = e.target as HTMLElement;
        const elem = (
          e.key === 'Backspace' || e.key === 'ArrowLeft'
            ? target.previousElementSibling
            : target.nextElementSibling
        ) as HTMLInputElement;
        elem?.focus();
        elem?.select();
      }}
      maxLength={1}
      type='text'
    />
  );
};
