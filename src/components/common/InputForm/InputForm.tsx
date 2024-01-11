import React from 'react';
import cn from 'clsx';
import useTrans from 'utils/useTrans';

interface IProps {
  title?: string;
  name: string;
  placeholder?: string;
  className?: string;
  inputClass?: string;
  onlyNumber?: boolean;
  register: any;
  errors?: any;
};

const InputForm = ({ title, name, register, errors, className, inputClass, onlyNumber,
  ...props }: IProps) => {
  const i18n = useTrans();

  return (
    <div className={cn('w-full mb-0', className)}>
      {title && <p className='mb-0'>{title}</p>}
      <input
        className={cn(
          `bg-transparent pb-2 px-4 w-full outline-none rounded-none md:text-base border-b
            border-t-transparent border-x-transparent border-black border-solid`,
          inputClass
        )}
        type={onlyNumber ? "number" : "text"}
        {...register(name)}
        {...props}
      />
      {errors && <p className='text-red-600 text-13 mt-2 mb-0'>
        {i18n[errors?.message?.toString()] || errors?.message?.toString()}</p>}
    </div>
  );
}

export default React.memo(InputForm);