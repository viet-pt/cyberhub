import { IconCate, IconChecked, IconClose2 } from '@common/Icons';
import { Checkbox, Form, Radio } from 'antd';
import cn from 'clsx';
import React from 'react';
import { TITLE_ANS } from 'utils/constants';

function compare(array1, array2) {
  if (!array1?.length || !array2?.length) return false;
  const array2Sorted = array2.slice().sort();
  return array1.length === array2.length && array1.slice().sort().every((value, index) => value === array2Sorted[index]);
}

const QuizDetail = ({ data, index, isSuccess, result, isMulti }) => {
  const answerList = () => (
    <div className='quiz-detail'>
      {data.answer.map((item, i) => (
        <div className='ml-6 py-1.5 relative' key={i}>
          {data.answerNum > 1 ?
            <Checkbox value={TITLE_ANS[i]} disabled={isSuccess}>{item.label}</Checkbox> :
            <Radio value={TITLE_ANS[i]} disabled={isSuccess}>{item.label}</Radio>
          }
          {isSuccess ?
            <div className='absolute top-2 -left-5'>
              {result.correctAnswer?.includes(TITLE_ANS[i]) ? <IconChecked className="text-green-500 w-3" /> : null}
            </div> : null
          }
        </div>
      ))}
    </div>
  )

  return (
    <div className={cn('mb-5 border-2 border-primary-orange px-6 pt-10 pb-2 relative rounded-md')}>
      <div className='border-b-2 border-r-2 rounded-br-md border-primary-orange absolute top-0 left-0 px-2 py-1 flex-center'>
        <IconCate className="text-primary-orange w-4 mr-2" />
        <span className='font-semibold text-xs text-primary-orange italic capitalize'>{data.cateName || 'General'}</span>
      </div>
      <div className='medium mb-3 flex items-start'>
        {isMulti &&
          <span className='mr-1 whitespace-nowrap'>Câu {index + 1}. </span>
        }
        {isSuccess && result &&
          <div>
            {compare(result.chosenAnswer, result.correctAnswer) ?
              <IconChecked className="text-green-500 w-5 mr-2" /> :
              <IconClose2 className="text-red-500 w-5 mr-2 flex-grow" />
            }
          </div>
        }
        <span className='flex-grow-0'>{data.question}</span>
      </div>

      <Form.Item name={[index, "answer"]}>
        {data.answerNum > 1 ?
          <Checkbox.Group>
            {answerList()}
          </Checkbox.Group> :
          <Radio.Group>
            {answerList()}
          </Radio.Group>
        }
      </Form.Item>
    </div >
  );
}

export default React.memo(QuizDetail);
