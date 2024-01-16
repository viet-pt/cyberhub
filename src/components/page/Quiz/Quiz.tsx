import QuizDetail from "@common/QuizDetail/QuizDetail";
import { QuizService } from "api/QuizService";
import cn from "clsx";
import { FieldArray, Form, Formik } from 'formik';
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { ROUTE } from "utils/constants";
import { storageKey } from "utils/storageKey";

const TYPE = {
  RANDOM: 'RANDOM',
  TEST: 'TEST',
}

const TIME_1 = 5;
const TIME_10 = 5;

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
    <span className={cn({ 'text-red-600 font-bold': counter < 16 })}>{minutes}:{seconds}</span>
  )
}

const Quiz = () => {
  const [type, setType] = useState<any>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const [questionDone, setQuestionDone] = useState(0);
  const [questionList, setQuestionList] = useState<any>([]);
  const [reCountTime, setReCountTime] = useState(0);
  const [result, setResult] = useState<any>('');

  const router = useRouter();
  const btnRef: any = useRef(null);
  const bodyRef: any = useRef(null);
  const isSubmit: any = useRef(true);

  useEffect(() => {
    const curentType = router.query.type;
    setType(curentType || '');
    setQuestionList([]);
  }, [router.query])

  const convertBody = (answer) => {
    let body: any = [];
    for (const id in answer) {
      if (answer[id]?.length) {
        body.push({ id, answer: answer[id] });
      }
    }
    return body;
  }

  const onSubmit = (data) => {
    const { answer } = data;
    let body = convertBody(answer);
    bodyRef.current = body;

    if (!isSubmit.current) {
      setQuestionDone(body.length);
      isSubmit.current = true;
      return;
    }

    if (body.length < totalQuestion) {
      toast.error('Vui lòng hoàn thành hết các câu hỏi!');
      return;
    }

    submitTest(body);
  };

  const submitTest = (body) => {
    console.log('body', body);
    setIsSuccess(true);
    QuizService.submitTest(body, res => {
      setResult(res);
      let detail: any = {};
      // can check lai
      res.detail.forEach(item => {
        detail[item.id] = item;
      });
      res.detail = detail;
      if (type === TYPE.RANDOM) {
        saveLocalId(body)
      }
    })
  }

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
    const number = type === TYPE.RANDOM ? 1 : 10;
    setTotalQuestion(number);
    setReCountTime(reCountTime + 1);
    
    const params = {
      cateName: '',
      number
    };
    QuizService.getQuestionList({ params }, res => {
      if (res?.length) {
        setQuestionDone(0);
        setIsSuccess(false);
        setQuestionList(res);
      }
    })
  }

  const continueTest = (resetForm) => {
    bodyRef.current = null;
    resetForm();
    getQuestionList();
  }

  const handleEndTime = () => {
    let list = bodyRef.current || [];
    questionList.forEach(item => {
      const findItem = list.find(e => e.id === item.id);
      if (!findItem) {
        list.push({
          id: item.id,
          answer: []
        })
      }
    });
    submitTest(list);
    toast.error('Đã hết thời gian làm bài!');
  }

  const onClickAns = () => {
    if (!isSuccess) {
      isSubmit.current = false;
      btnRef.current.click();
    }
  }

  return (
    <div className="text-base relative pt-3 lg:pt-10 mb-28 px-3 lg:px-0 overflow-auto">
      {!type &&
        <section>
          <div className="font-bold text-base lg:text-2xl container">
            <div className="w-5/6 ld:w-2/3 mx-auto">
              <p className="mb-4">Internet mang cả thế giới đến ngôi nhà của bạn, nhưng đồng nghĩa hacker cũng tiếp cận bạn dễ dàng hơn.</p>
              <p className="mb-0">Hãy nâng cao nhận thức an toàn thông tin để tránh các nguy cơ lừa đảo trực tuyến, đánh cắp danh tính hay bị lâ nhiễm phần mềm độc hại... thông qua các câu hỏi trắc nghiệm!</p>
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
              <div className="flex-center mt-16">
                <button className="border-none bg-primary-red rounded-20 text-white py-1 w-40 font-semibold hover-raise text-lg"
                  onClick={getQuestionList}>
                  Kiểm tra
                </button>
              </div>
            }

            {questionList.length ?
              <div>
                <Formik initialValues={{ answer: {} }} onSubmit={onSubmit}>
                  {({ values, resetForm }) => (
                    <Form>
                      <div className="flex flex-col lg:flex-row">
                        <div className="lg:w-1/2 mx-auto mt-10">
                          <FieldArray
                            name="answer"
                            render={() => (
                              <div>
                                {questionList.map((item, index) => (
                                  <div key={index}>
                                    <QuizDetail
                                      data={item}
                                      onClickAns={onClickAns}
                                      index={index + 1}
                                      name={`answer.${item.id}`}
                                      isSuccess={isSuccess}
                                      result={result?.detail ? result?.detail[item.id] : ''}
                                    />
                                  </div>
                                ))}
                              </div>
                            )}
                          />
                        </div>

                        {!isSuccess ?
                          <div className="w-full lg:w-1/5 mx-auto mt-10 text-center order-first lg:order-none grid lg:block space-x-4 sticky top-0">
                            <div className="border-2 mb-4 border-primary-orange py-1 px-4 rounded-md">Đã làm: <span>{questionDone}</span>/<span>{totalQuestion}</span></div>
                            <div className="border-2 mb-4 border-primary-orange py-1 px-4 rounded-md">
                              <span className="mr-1">Thời gian còn lại:</span>
                              <span>
                                <CountTime
                                  reCountTime={reCountTime}
                                  endTime={handleEndTime}
                                  totalTime={type === TYPE.RANDOM ? TIME_1 : TIME_10}
                                />
                              </span>
                            </div>
                            <div className="col-span-2 lg:mt-10">
                              <button type="submit" ref={btnRef} className="rounded-md bg-primary-red text-white py-2 px-8 w-1/3 lg:w-auto hover-slide">Gửi bài</button>
                            </div>
                          </div> :

                          <div className="w-full lg:w-1/5 mx-auto mt-10 text-center order-first lg:order-none grid lg:block space-x-4">
                            <div className="border-2 mb-4 border-primary-orange py-1 px-4 rounded-md">Đã làm: <span>{questionDone}</span>/<span>{totalQuestion}</span></div>
                            {/* <div className="border-2 mb-4 border-primary-orange py-1 px-4 rounded-md">Thời gian: <span>00:21:55</span></div> */}
                            <div className="col-span-2 lg:mt-10">
                              <div className="border-2 mb-4 border-primary-orange py-1 px-4 rounded-md">Điểm: <span>{result.score}</span>/<span>{result.total}</span></div>
                              <button className="rounded-md bg-primary-red text-white py-2 px-8 w-1/3 lg:w-auto hover-slide"
                                onClick={() => continueTest(resetForm)} type="button">
                                {type === TYPE.RANDOM ? 'Câu hỏi tiếp theo' : 'Bài thi mới'}
                              </button>
                            </div>
                          </div>
                        }
                      </div>
                    </Form>
                  )}
                </Formik>
              </div> : null
            }
          </div>
        </section>
      }
    </div>
  );
};

export default React.memo(Quiz);
