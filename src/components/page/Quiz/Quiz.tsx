import Modal from "@common/Modal/Modal";
import QuizDetail from "@common/QuizDetail/QuizDetail";
import { Form, Select } from "antd";
import { QuizService } from "api/QuizService";
import cn from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useCateStore } from "store/storeCate";
import { ROUTE } from "utils/constants";
import { storageKey } from "utils/storageKey";

const TYPE = {
  RANDOM: 'RANDOM',
  TEST: 'TEST',
}

const TIME_1_Q = 60;

const CountTime = ({ reCountTime, totalTime, endTime }) => {
  const [counter, setCounter] = React.useState(totalTime);

  useEffect(() => {
    if (counter === 0) {
      endTime();
    }
    const timer: any = counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  useEffect(() => {
    setCounter(totalTime);
  }, [reCountTime]);

  let minutes: any = Math.floor(counter / 60);
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  let seconds: any = counter % 60;
  seconds = seconds < 10 ? `0${seconds}` : seconds;

  return (
    <span className='text-red-600 font-bold text-xl'>{minutes} : {seconds}</span>
  )
}

const Quiz = () => {
  const [type, setType] = useState<any>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [openConfirmSubmit, setOpenConfirmSubmit] = useState(false);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [questionDone, setQuestionDone] = useState(0);
  const [questionList, setQuestionList] = useState<any>([]);
  const [cateList, setCateList] = useState<any>([]);
  const [reCountTime, setReCountTime] = useState(0);
  const [result, setResult] = useState<any>('');
  const [timeTodo, setTimeTodo] = useState('');

  const [formInfo] = Form.useForm();
  const [form] = Form.useForm();
  const router = useRouter();
  const [cateStore] = useCateStore((state) => [state.data]);

  useEffect(() => {
    const curentType = router.query.type;
    setType(curentType || '');
    setQuestionList([]);

    if (curentType) {
      let totalQ = curentType === TYPE.RANDOM ? 1 : 10;
      form.resetFields();
      handleTimeTodo(totalQ);
    }
  }, [router.query])

  useEffect(() => {
    if (cateStore.length) {
      setCateList([
        { cateId: '', cateName: 'Tất cả' },
        ...cateStore,
      ]);
    }
  }, [cateStore])

  const onSubmit = () => {
    const values = form.getFieldsValue();
    setOpenConfirmSubmit(false);
    let body: any = [];
    for (const [index, item] of Object.entries(values) as any) {
      body.push({
        answer: typeof item?.answer === "string" ? [item.answer] : item.answer || [],
        id: questionList[Number(index)].id
      })
    }

    QuizService.submitTest(body, res => {
      setIsSuccess(true);
      setResult(res);
      if (type === TYPE.RANDOM) {
        saveLocalId(body)
      }
    })
  };

  const saveLocalId = (body) => {
    let listIdSave: any = sessionStorage.getItem(storageKey.LIST_ID);
    if (listIdSave) {
      listIdSave = listIdSave?.split(',');
    } else {
      listIdSave = [];
    }
    body.forEach(item => {
      if (!listIdSave.includes(item.id)) {
        listIdSave.push(item.id)
      }
    })
    sessionStorage.setItem(storageKey.LIST_ID, listIdSave.toString());
  }

  const getQuestionList = () => {
    const params = {
      number: totalQuestion,
      ...formInfo.getFieldsValue(),
    }
    setReCountTime(reCountTime + 1);

    // setQuestionDone(0);
    // setIsSuccess(false);
    // setQuestionList(FAKE);

    QuizService.getQuestionList({ params }, res => {
      if (res?.length) {
        setQuestionDone(0);
        setIsSuccess(false);
        setQuestionList(res);
      }
    }, error => {
      toast.error(error.message);
    })
  }

  const handleTimeTodo = (totalQ) => {
    let time = totalQ * TIME_1_Q;
    let txt = '';
    if (time < 60) {
      txt = `${time} giây`;
    } else {
      let minutes: any = Math.floor(time / 60);
      let seconds: any = time % 60;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      txt = `${minutes} phút ${seconds > 0 ? (seconds + ' giây') : ''}`;
    }
    setTotalQuestion(totalQ);
    setTimeTodo(txt);
  }

  const continueTest = () => {
    form.resetFields();
    getQuestionList();
  }

  const handleEndTime = () => {
    onSubmit();
    toast.error('Đã hết thời gian làm bài!');
  }

  const onChangeFormInfo = (data) => {
    const keyNames: any = Object.keys(data);
    const value = data[keyNames];
    if (keyNames[0] === 'number') {
      handleTimeTodo(value);
    }
  }

  const onChangeQuiz = (data, values) => {
    let number = 0;
    for (const [index, item] of Object.entries(values) as any) {
      if (typeof item?.answer === "string") {
        number++;
      } else if (Array.isArray(item.answer) && item.answer.length) {
        number++;
      }
    }
    setQuestionDone(number);
  }

  const onSubmitInfo = () => {
    getQuestionList();
  }

  return (
    <div className="text-base pt-3 lg:pt-10 mb-28 px-3 lg:px-0">
      {!type &&
        <section>
          <div className="font-bold text-base lg:text-2xl container">
            <div className="w-5/6 ld:w-2/3 mx-auto">
              <p className="mb-4">Internet mang cả thế giới đến ngôi nhà của bạn, nhưng đồng nghĩa hacker cũng tiếp cận bạn dễ dàng hơn.</p>
              <p className="mb-0">Hãy nâng cao nhận thức an toàn thông tin để tránh các nguy cơ lừa đảo trực tuyến, đánh cắp danh tính hay bị lây nhiễm phần mềm độc hại... thông qua các câu hỏi trắc nghiệm!</p>
            </div>
          </div>
          <img src="/imgs/banner1.png" className='h-auto w-full mt-3 lg:-mt-12 ' alt="banner1" />
          <div className="flex-center space-x-8 lg:-mt-20 text-center">
            <Link href={`${ROUTE.QUIZ}?type=${TYPE.RANDOM}`} className="border border-primary-orange rounded-20 py-1 w-40 font-semibold hover-raise
         text-primary-orange text-lg hover:no-underline">Ngẫu nhiên</Link>
            <Link href={`${ROUTE.QUIZ}?type=${TYPE.TEST}`} className="border border-primary-orange bg-primary-orange text-white rounded-20 hover-raise
          py-1 w-40 font-semibold text-lg hover:no-underline">Bài thi</Link>
          </div>
        </section>
      }

      {type &&
        <section className="container">
          <div className="flex-center space-x-8 text-center border-b-2 pb-5">
            <Link href={`${ROUTE.QUIZ}?type=${TYPE.RANDOM}`}
              className={cn(`border border-primary-orange py-1 w-40 font-semibold hover-raise text-lg hover:no-underline`,
                type === TYPE.RANDOM ? 'bg-primary-orange text-white' : 'text-primary-orange')}>Ngẫu nhiên</Link>
            <Link href={`${ROUTE.QUIZ}?type=${TYPE.TEST}`}
              className={cn(`border border-primary-orange py-1 w-40 font-semibold hover-raise text-lg hover:no-underline`,
                type === TYPE.TEST ? 'bg-primary-orange text-white' : 'text-primary-orange')}>Bài thi</Link>
          </div>

          <div>
            {!questionList.length &&
              <div className="mt-12">
                <Form onFinish={onSubmitInfo} form={formInfo} initialValues={{ cateId: '', number: 10 }}
                  onValuesChange={onChangeFormInfo}>
                  <div className="rounded-lg py-6 px-10 shadow-7 bg-white mx-auto w-full lg:w-1/3">
                    <p className="mb-6 text-center font-bold text-xl">THÔNG TIN BÀI THI</p>
                    <div className="mb-3 flex items-center">
                      <span className="w-1/3">Thể loại:</span>
                      <Form.Item name='cateId' className="w-1/3 ml-4 mb-0">
                        <Select placeholder="Chọn chủ đề" className='rounded-md' showSearch={false}>
                          {cateList.map(item => (
                            <Select.Option value={item.cateId} key={item.cateId}>{item.cateName}</Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </div>
                    <div className="mb-3 flex items-center">
                      <span className="mr-4 w-1/3">Số lượng câu hỏi:</span>
                      {type === TYPE.RANDOM ? 1 :
                        <Form.Item name='number' className="w-1/3 mb-0">
                          <Select className='rounded-md' showSearch={false}>
                            {[10, 30].map(item => (
                              <Select.Option value={item} key={item}>{item}</Select.Option>
                            ))}
                          </Select>
                        </Form.Item>
                      }
                    </div>
                    <div className="flex">
                      <span className="w-1/3 mr-4">Thời gian làm bài:</span>
                      <span>{timeTodo}</span>
                    </div>
                  </div>
                  <div className="flex-center mt-10">
                    <button type="submit" className="border-none bg-primary-red rounded-20 text-white py-2 w-40 font-semibold hover-raise text-lg">
                      Bắt đầu
                    </button>
                  </div>
                </Form>
              </div>
            }

            {questionList.length ?
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-1/2 mx-auto mt-10">
                  <Form form={form} onValuesChange={onChangeQuiz}>
                    {questionList.map((item, index) => (
                      <div key={index} className='mb-4'>
                        <QuizDetail
                          data={item}
                          index={index}
                          isSuccess={isSuccess}
                          isMulti={type === TYPE.TEST}
                          result={result.detail ? result.detail[index] : ''}
                        />
                      </div>
                    ))}
                  </Form>
                </div>

                {!isSuccess ?
                  <div className="w-full lg:w-1/5 mx-auto mt-10 text-center order-first lg:order-none grid lg:block mobile:space-x-4 sticky top-0">
                    <div className="border mb-4 border-primary-orange py-1 px-4 rounded-md text-base">
                      <span>Đã làm:</span>
                      <span className="text-xl text-red-600 ml-1 font-bold">{questionDone} / {totalQuestion}</span>
                    </div>
                    <div className="border mb-4 border-primary-orange py-1 px-4 rounded-md text-base">
                      <span className="mr-1">Thời gian còn lại:</span>
                      <span>
                        <CountTime
                          reCountTime={reCountTime}
                          endTime={handleEndTime}
                          totalTime={totalQuestion * TIME_1_Q}
                        />
                      </span>
                    </div>
                    <div className="col-span-2 lg:mt-10">
                      <button className="rounded-md bg-primary-red text-white py-2 px-8 w-1/3 lg:w-auto hover-slide" onClick={() => setOpenConfirmSubmit(true)}>
                        Nộp bài</button>
                    </div>
                  </div> :

                  <div className="w-full lg:w-1/5 mx-auto mt-10 text-center order-first lg:order-none grid lg:block mobile:space-x-4">
                    <div className="border mb-4 border-primary-orange py-1 px-4 rounded-md text-base">
                      <span>Đã làm: </span>
                      <span className="text-xl text-red-600 ml-1 font-bold">{questionDone} / {totalQuestion}</span>
                    </div>
                    {/* <div className="border mb-4 border-primary-orange py-1 px-4 rounded-md">Thời gian: <span>00:21:55</span></div> */}
                    <div className="col-span lg:mt-10">
                      <div className="border mb-4 border-primary-orange py-1 px-4 rounded-md text-base">
                        <span>Điểm: </span>
                        <span className="text-xl text-red-600 ml-1 font-bold">{result.score} / {result.total}</span>
                      </div>
                      <button className="rounded-md bg-primary-red text-white py-2 px-8 w-1/3 lg:w-auto hover-slide"
                        onClick={continueTest} type="button">
                        {type === TYPE.RANDOM ? 'Câu hỏi tiếp theo' : 'Bài thi mới'}
                      </button>
                    </div>
                  </div>
                }
              </div> : null
            }

          </div>
        </section>
      }
      <Modal
        visible={openConfirmSubmit}
        closeModal={() => setOpenConfirmSubmit(false)}
        confirmAction={onSubmit}
        confirmButton="Nộp bài"
        closeButton="Hủy"
        title="Thông báo"
        content={<div className="text-center">
          {questionDone < totalQuestion ? "Bạn chưa hoàn thành bài thi, bạn có chắc chắn muốn nộp bài?" : "Bạn có chắc chắn muốn nộp bài?"}</div>}
      />
    </div>
  );
};

export default React.memo(Quiz);
