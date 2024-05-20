import { useRef, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

import classNames from 'classnames';

import { CppCode } from './components/CppCode';
import { PasswordCell } from './components/PasswordCell';
import { PythonCode } from './components/PythonCode';
import { SubmitModal } from './components/SubmitModal';
import logo from './resources/logo.svg';
import miet from './resources/miet.svg';
import safe from './resources/safe.png';

export const Layout = () => {
  const [lang, setLang] = useState<'cpp' | 'python'>('python');
  const [isModalOpen, setModalIsOpen] = useState(false);
  const passRef = useRef<string | null>(null);

  const handleOpenSafe = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const cells = [
      ...((e.target as HTMLElement).parentElement?.querySelectorAll('input') ??
        []),
    ];

    const value = cells
      .map(cell => {
        const val = cell.value;
        cell.value = '';
        return val;
      })
      .join('');

    const res = await fetch('/test', {
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'manual',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({ password: value }),
    });

    if (res.status === 200) {
      if ((await res.json()).valid) {
        passRef.current = value;
        setModalIsOpen(true);
      } else {
        toast.error(`Пароль '${value}' не подошел!`);
      }
    } else {
      toast.error(`Ошибка: '${await res.text()}'`);
    }
  };

  const handleSubmitForm = async (
    fname: string,
    lname: string,
    group: string,
    tg: string,
  ) => {
    if (!(fname && lname && group)) {
      toast.error('Введены не все обязательные поля');
      return;
    }
    const res = await fetch('/submit', {
      method: 'POST',
      mode: 'same-origin',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'manual',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify({
        fname,
        lname,
        group,
        tg,
        password: passRef.current,
      }),
    });

    if (res.status === 200) {
      toast.success('Данные отправлены в ЦК. Поздравляем, Вы молодец!');
      setModalIsOpen(false);
    } else {
      toast.error(`Ошибка: '${await res.text()}'`);
    }
  };

  return (
    <div className='flex min-h-full w-full justify-center bg-[#171717] pt-5 font-mono font-black text-[#e8e8e8]'>
      <div
        className='flex max-w-[800px] flex-col items-center gap-2 overflow-auto p-3 sm:flex-row sm:items-stretch'
        style={{
          background: `url(${miet}) no-repeat`,
          backgroundSize: '70%',
        }}
      >
        <div className='flex w-full min-w-[300px] flex-col gap-10 sm:w-auto'>
          <div>
            <img src={logo} alt='logo' />
          </div>
          <div className='w-[250px] self-center sm:self-auto'>
            <div className='flex flex-row justify-center'>
              <button
                className={classNames(
                  'rounded-tl-md rounded-tr-md border border-b-0 p-2',
                  lang === 'python'
                    ? 'border-[#757170] bg-[#757170]'
                    : 'bg-[#171717]',
                )}
                onClick={() => setLang('python')}
              >
                Python
              </button>
              <button
                className={classNames(
                  'rounded-tl-md rounded-tr-md border border-b-0 p-2',
                  lang === 'cpp'
                    ? 'border-[#757170] bg-[#757170]'
                    : 'bg-[#171717]',
                )}
                onClick={() => setLang('cpp')}
              >
                C++
              </button>
            </div>
            <div className='rounded-lg border bg-[#171717] px-6 py-2'>
              {lang === 'cpp' && <CppCode />}
              {lang === 'python' && <PythonCode />}
            </div>
          </div>
        </div>

        <div className='min-w-[300px] flex-1'>
          <div className='flex h-full w-full flex-col gap-2'>
            <p className='text-center'>
              Собери все части программного кода и узнай пароль от сейфа, в
              котором хранятся ценные подарки от Цифровой кафедры НИУ МИЭТ!
            </p>
            <div
              className='relative flex max-h-[500px] min-h-[300px] min-w-[300px] flex-1'
              style={{
                background: `url(${safe}) center no-repeat`,
                backgroundSize: 'contain',
              }}
            >
              <div className='absolute bottom-[10%] left-[50%] flex -translate-x-[50%] flex-col items-center gap-2 sm:bottom-[25%]'>
                <div className='flex flex-row items-end gap-2 text-2xl text-black'>
                  <PasswordCell />
                  <PasswordCell />
                  <PasswordCell />
                  <PasswordCell />
                  <PasswordCell />
                  <PasswordCell />
                </div>
                <button
                  onClick={handleOpenSafe}
                  className='rounded-3xl bg-green-400 p-2 px-4 text-lg text-black'
                >
                  Открыть сейф
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <SubmitModal
          onClose={() => setModalIsOpen(false)}
          onSubmit={handleSubmitForm}
        />
      )}
      <Toaster
        position='top-center'
        reverseOrder={false}
        gutter={8}
        containerClassName=''
        containerStyle={{}}
        toastOptions={{
          className: '',
          duration: 5000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
          },
        }}
      />
    </div>
  );
};

export default Layout;
