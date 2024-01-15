import cn from 'clsx';
import React from 'react';
import { TITLE_ANS } from 'utils/constants';

const QuizDetail = ({ data, index }) => {
  return (
    <div className={cn('mb-5', { 'mb-4 pb-4 border-b': index })}>
      <p>Thể loại: <span className='medium'>{data.cateName}</span></p>
      <p className='medium'>
        {index && <span>{index}. </span>}
        {data.question}
      </p>
      <div className='ml-6'>
        {data?.answer?.length && data.answer.map((item, i) => (
          <p className=''>
            <span>{TITLE_ANS[i]}. </span>
            <span className='ml-1'>{item.label}</span>
          </p>
        ))}

      </div>
    </div>
  );
}

export default React.memo(QuizDetail);
