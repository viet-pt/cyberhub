import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { IconSearch } from '@common/Icons';

interface ISearch {
  onSearch: Function;
  onClick?: any;
}

const InputSearch = forwardRef(function({ onSearch, onClick }: ISearch, ref) {
  const [txt, setTxt] = useState('');

  useImperativeHandle(ref, () => ({
    resetText() {
      setTxt('');
    }
  }));

  const onClickSearch = () => {
    onSearch(txt.trim());
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(txt.trim());
    }
  }

  return (
    <div className="relative flex items-center" onClick={onClick}>
      <IconSearch
        onClick={onClickSearch}
        className='w-5 md:w-8 pointer absolute left-2 bottom-2 md:bottom-3 text-primary-green hover-scale'
      />
      <input
        onChange={e => setTxt(e.target.value)}
        value={txt}
        onKeyDown={onKeyDown}
        placeholder='Search'
        className='bg-transparent text-xl md:text-3xl pb-1 md:pb-2 pl-12 md:pl-18 border-b border-solid border-second-gray w-full outline-none text-primary-green font-apoc'
      />
    </div>
  )
})

export default React.memo(InputSearch);
