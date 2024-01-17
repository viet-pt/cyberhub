import { IconCate } from '@common/Icons';
import { Form, Radio } from 'antd';
import cn from 'clsx';
import React from 'react';
import { TITLE_ANS } from 'utils/constants';

const QuizDetail = ({ data, index, onClickAns, isSuccess, result }) => {

  return (
    <div className={cn('mb-5 border-2 border-primary-orange px-6 pt-10 pb-2 relative rounded-md')}>
      <div className='border-b-2 border-r-2 rounded-br-md border-primary-orange absolute top-0 left-0 px-2 py-1 flex-center'>
        <IconCate className="text-primary-orange w-4 mr-2" />
        <span className='font-semibold text-xs text-primary-orange italic capitalize'>{data.cateName || 'General'}</span>
      </div>
      <p className='medium mb-3'>
        {index && <span>{index}. </span>}
        {data.question}
      </p>

      <Form.Item
        name={[index, "answer"]}
        rules={[{ required: true, message: 'Không được để trống' }]}
      >
        <Radio.Group>
          {data.answer.map((item, i) => (
            <div className='ml-6 py-1.5'>
              {/* <label key={i} className={cn('mb-2 block pointer',
                { 'text-red-500': isSuccess && result?.chosenAnswer?.includes(TITLE_ANS[i]) && !result.correctAnswer?.includes(TITLE_ANS[i]) },
                { 'text-blue-500': isSuccess && result?.correctAnswer?.includes(TITLE_ANS[i]) },
              )}> */}

              <Radio value={TITLE_ANS[i]}>{item.label}</Radio>

              {/* <Field
                onClick={onClickAns}
                disabled={isSuccess}
                type={data.answerNum > 1 ? 'checkbox' : 'radio'}
                name={name} value={TITLE_ANS[i]} /> */}
            </div>
          ))}
        </Radio.Group>
      </Form.Item>
    </div >
  );
}

export default React.memo(QuizDetail);
