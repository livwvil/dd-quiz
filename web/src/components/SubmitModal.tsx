import type { FC } from 'react';

interface SubmitModalProps {
  onClose: () => void;
  onSubmit: (fname: string, lname: string, group: string, tg: string) => void;
}

export const SubmitModal: FC<SubmitModalProps> = ({ onClose, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fname = (e.target as HTMLFormElement)['fname']?.value ?? '';
    const lname = (e.target as HTMLFormElement)['lname']?.value ?? '';
    const group = (e.target as HTMLFormElement)['group']?.value ?? '';
    const tg = (e.target as HTMLFormElement)['tg']?.value ?? '';
    onSubmit(fname, lname, group, tg);
  };
  return (
    <>
      <form
        className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden text-black outline-none focus:outline-none'
        onSubmit={handleSubmit}
      >
        <div className='relative mx-auto my-6 w-auto max-w-3xl'>
          {/*content*/}
          <div className='relative flex w-full flex-col rounded-lg border-0 bg-white shadow-lg outline-none focus:outline-none'>
            {/*header*/}
            <div className='border-blueGray-200 flex items-start justify-between rounded-t border-b border-solid p-5'>
              <h3 className='text-3xl font-semibold'>
                Пароль введен корректно!
              </h3>
            </div>
            {/*body*/}
            <div className='relative flex flex-auto flex-col gap-3 p-6'>
              <div className='w-full'>
                <label className='block'>
                  Фамилия{' '}
                  <mark className='bg-transparent text-red-700'>(*)</mark>:
                </label>
                <input
                  className='w-full border font-normal'
                  type='text'
                  name='lname'
                />
              </div>
              <div className='w-full'>
                <label className='block'>
                  Имя <mark className='bg-transparent text-red-700'>(*)</mark>:
                </label>
                <input
                  className='w-full border font-normal'
                  type='text'
                  name='fname'
                />
              </div>
              <div className='w-full'>
                <label className='block'>
                  Группа{' '}
                  <mark className='bg-transparent text-red-700'>(*)</mark>:
                </label>
                <input
                  className='w-full border font-normal'
                  type='text'
                  name='group'
                />
              </div>
              <div className='w-full'>
                <label className='block'>Telegram nickname:</label>
                <input
                  className='w-full border font-normal'
                  type='text'
                  name='tg'
                />
              </div>
            </div>
            {/*footer*/}
            <div className='border-blueGray-200 flex items-center justify-end rounded-b border-t border-solid p-6'>
              <button
                className='background-transparent mb-1 mr-1 px-6 py-2 text-sm font-bold uppercase text-gray-500 outline-none transition-all duration-150 ease-linear focus:outline-none'
                onClick={onClose}
              >
                Закрыть
              </button>
              <button
                className='mb-1 mr-1 rounded bg-emerald-500 px-6 py-3 text-sm font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-lg focus:outline-none active:bg-emerald-600'
                type='submit'
                // onClick={onClose}
              >
                Отправить
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className='fixed inset-0 z-40 bg-black opacity-75'></div>
    </>
  );
};
