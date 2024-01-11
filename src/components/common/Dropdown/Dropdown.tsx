import React, { Fragment, memo, useEffect, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import IconArrowDown from '@common/Icons/IconArrowDown';
import cn, { clsx } from 'clsx';
import useTrans from 'utils/useTrans';

type OptionType = {
  value: string | number;
  label: string;
};

interface IProps {
  list: OptionType[];
  onChange: any;
  label: string;
  value?: any;
  className?: string;
  error?: any;
};

const Dropdown = ({ value, label, list, onChange, error, className }: IProps) => {
  const [txt, setTxt] = useState('');
  const i18n = useTrans();

  useEffect(() => {
    if (value) {
      const data: any = list.find(item => item.value === value);
      setTxt(data.label || '');
    } else if (value === '') {
      setTxt('');
    }
  }, [value, list]);

  // const getValue = (val) => {
  //   return val ? list.find(item => item.value === val.value) : val;
  // };

  const handleChange = (item) => {
    setTxt(item.label);
    onChange(item);
  }

  return (
    <div>
      <Combobox onChange={handleChange} nullable>
        <div className={clsx("relative", className)}>
          <Combobox.Button className="flex w-full items-center py-2">
            <span>{i18n[txt] || txt || i18n[label] || label}</span>
            <IconArrowDown
              className="ml-2 -mr-1 h-2.5"
              aria-hidden="true"
            />
          </Combobox.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Combobox.Options className="absolute mt-1 w-full min-w-[120px] max-h-60 overflow-auto rounded-[4px] bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              <div className="px-1 py-1">
                {list.length ? list.map(item => (
                  <Combobox.Option key={item.value} value={item}>
                    {({ active }) => (
                      <div className={cn(active ? 'bg-violet-500 text-white' : 'text-gray-900',
                        'group flex w-full items-center cursor-pointer rounded-[4px] px-2 py-2 text-sm')}
                      >{i18n[item.label] || item.label}</div>
                    )}
                  </Combobox.Option>
                )): 
                <div className='px-2 py-2 text-sm text-center'>No data</div>
              }
              </div>
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>

      {error &&
        <p className="mt-2 text-13 text-red-600" id="error">
          {i18n[error.message] || error.message}
        </p>
      }
    </div>
  )
}

export default memo(Dropdown);