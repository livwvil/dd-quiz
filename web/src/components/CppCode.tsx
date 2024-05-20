import type { FC } from 'react';

import {
  F1,
  F10,
  F11,
  F12,
  F13,
  F14,
  F15,
  F2,
  F3,
  F4,
  F5,
  F6,
  F7,
  F8,
  F9,
} from '@/tools/messages';

interface CppCodeProps {}

export const CppCode: FC<CppCodeProps> = () => {
  return (
    <>
      <pre className='block'>{'int main() {'}</pre>
      <pre className='block'>{'    int n = 123456789;'}</pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F1}>
          f1(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F2}>
          f2(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F3}>
          f3(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F4}>
          f4(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F5}>
          f5(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F6}>
          f6(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F7}>
          f7(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F8}>
          f8(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F9}>
          f9(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F10}>
          f10(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F11}>
          f11(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F12}>
          f12(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F13}>
          f13(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F14}>
          f14(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>
        {'    n = '}
        <a className='text-blue-500 underline' href='#' onClick={F15}>
          f15(n)
        </a>
        {';'}
      </pre>
      <pre className='block'>{'    std::cout << n;'}</pre>
      <pre className='block'>{'    return 0;'}</pre>
      <pre className='block'>{'}'}</pre>
    </>
  );
};
