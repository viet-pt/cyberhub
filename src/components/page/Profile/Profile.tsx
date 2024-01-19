import KCSModal from "@common/Modal/KCSModal";
import Modal from "@common/Modal/Modal";
import QuizView from "@common/QuizDetail/QuizView";
import { Form, Table, Tabs } from "antd";
import { UserService } from "api/UserService";
import clsx from "clsx";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useUserStore } from "store/storeUser";
import { convertTime } from "utils/helpers";

const TAB_LIST = ['Thông tin cá nhân', ' Tin tức', 'Câu hỏi'];

const Profile = () => {
  const [tab, setTab] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [questionList, setQuestionList] = useState<any>([]);
  const [newsList, setNewsList] = useState<any>([]);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [itemSeleted, setItemSeleted] = useState<any>('');
  const [quizDetail, setQuizDetail] = useState<any>('');
  const [showQuizDetail, setShowQuizDetail] = useState(false);
  const [userInfo, setUserInfo] = useState<any>('');
  const [userStore] = useUserStore((state) => [state.data]);

  const [form] = Form.useForm();

  useEffect(() => {
    if (tab === 0) {
      getUserInfo();
    } else if (tab === 1) {
      getSubscribeInfo();
    } else {
      getHistory();
    }
  }, [tab]);


  const getUserInfo = () => {
    if (userInfo) return;
    UserService.getUserInfo({}, res => {
      setUserInfo(res);
    })
  }

  const getSubscribeInfo = (isReset?: boolean) => {
    if (newsList.length && !isReset) return;
    UserService.getSubscribeInfo({}, res => {
      setNewsList(res);
    })
  }

  const getHistory = () => {
    if (questionList.length) return;
    UserService.getHistory({}, res => {
      setQuestionList(res);
    })
  }

  const viewDetail = (data) => {
    UserService.getQuizHistoryDetail({ id: data.id }, res => {
      setQuizDetail(res);
      setShowQuizDetail(true);
      form.setFieldsValue({
        answer: ['B']
      })
    }, error => {
      toast.error(error.message);
    })
  }

  const unSubcribe = () => {
    const body = { data: { cateId: [itemSeleted.cateId] } };
    UserService.unSubscribe(body, res => {
      setIsShowConfirm(false);
      getSubscribeInfo(true);
      toast.success('Bỏ theo dõi thành công!');
    }, error => {
      toast.error(error.message);
    })
  }

  const handleUnSubcribe = (data) => {
    setItemSeleted(data);
    setIsShowConfirm(true);
  }

  const columnsQuestion = useMemo(() => (
    [
      {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: '3%',
        render: (value, record, index) => pageIndex * 10 + index + 1,
      },
      {
        title: 'Thể loại',
        key: 'total',
        dataIndex: 'total',
        render: (value) => value > 1 ? 'Bài thi' : 'Ngẫu nhiên'
      },
      {
        title: 'Điểm',
        key: 'score',
        dataIndex: 'score',
        render: (row, value) => <span>{value.score} / {value.total}</span>
      },
      {
        title: 'Thời gian',
        key: 'createTime',
        dataIndex: 'createTime',
        render: (value) => convertTime(value, 'DD/MM/YYYY HH:mm')
      },
      {
        title: 'Action',
        key: 'action',
        width: '20%',
        render: (row) =>
          <div className='flex space-x-3 items-center pointer hover:underline text-blue-500' onClick={() => viewDetail(row)}>
            Xem chi tiết
          </div>
      },
    ]
  ), [viewDetail])

  const columnsNews = useMemo(() => (
    [
      {
        title: 'STT',
        dataIndex: 'index',
        key: 'index',
        width: '3%',
        render: (value, record, index) => index + 1,
      },
      {
        title: 'Danh mục',
        key: 'cateName',
        dataIndex: 'cateName',
      },
      {
        title: 'Action',
        key: 'action',
        render: (row) =>
          <div className='flex space-x-3 items-center pointer hover:underline text-blue-500' onClick={() => handleUnSubcribe(row)}>
            Bỏ theo dõi
          </div>
      },
    ]
  ), [handleUnSubcribe, pageIndex])

  return (
    <div className="text-base container pt-4 lg:pt-10 mobile:px-2">
      <div className="md:flex">
        <ul className="flex-column space-y space-y-2 lg:space-y-4 text-sm text-gray-700 font-semibold dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          {TAB_LIST.map((item, index) => (
            <li onClick={() => setTab(index)}>
              <div className={clsx("inline-flex items-center pointer px-4 py-3 rounded-lg hover:opacity-80 w-full",
                tab === index ? 'bg-blue-600 text-white' : 'bg-gray-50')}>
                {item}
              </div>
            </li>
          ))}
        </ul>

        <div className="p-2 lg:p-6 pb-32 bg-gray-50 text-gray-800 dark:text-gray-400 dark:bg-gray-800 rounded-lg lg:w-4/5">
          {tab === 0 ?
            <section>
              <div className="font-semibold flex-between py-3 border-b">
                <span>Tài khoản</span>
                <span>Đăng ký</span>
              </div>
              <div className="grid grid-cols-2 mt-5">
                <div className="flex items-center">
                  <Image
                    alt='avatar'
                    src={userStore?.imageUrl || 'https://upload.wikimedia.org/wikipedia/vi/thumb/e/ef/Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg/1200px-Logo_%C4%90%E1%BA%A1i_h%E1%BB%8Dc_B%C3%A1ch_Khoa_H%C3%A0_N%E1%BB%99i.svg.png'}
                    className='h-12 w-auto aspect-[1/1] rounded-full'
                    width={0} height={0}
                  />
                  <div className="font-semibold ml-3">
                    <p className="mb-2">{userInfo.name}</p>
                    <p>{userInfo.email}</p>
                  </div>
                </div>
                <div className="text-right font-semibold">{convertTime(userInfo.createTime, 'DD/MM/YYYY')}</div>
              </div>
            </section> : null
          }

          {tab === 1 ?
            <section>
              <div className="font-semibold py-3 border-b">
                Đang theo dõi
              </div>
              <div className="mt-5">
                <Table
                  columns={columnsNews}
                  dataSource={newsList}
                  pagination={false}
                  rowKey="index"
                  className="shadow-lg"
                />
              </div>
            </section> : null
          }

          {tab === 2 ?
            <section>
              <Tabs
                items={[
                  {
                    key: '1',
                    label: <span className="py-3 text-gray-800 text-base">Lịch sử kiểm tra</span>,
                    children: <div className="mt-5">
                      <Table
                        columns={columnsQuestion}
                        dataSource={questionList}
                        pagination={{
                          onChange: (page) => setPageIndex(page - 1),
                          position: ['bottomCenter']
                        }}
                        rowKey="index"
                        className="shadow-lg"
                      />
                    </div>
                  },
                  {
                    key: '2',
                    label: <span className="py-3 text-gray-800 text-base">Biểu đồ thi</span>,
                    children: <div className="mt-5">

                    </div>
                  },
                ]}
              />
            </section> : null
          }
        </div>
      </div>

      <Modal
        visible={isShowConfirm}
        closeModal={() => setIsShowConfirm(false)}
        confirmAction={unSubcribe}
        confirmButton="Xác nhận"
        closeButton="Hủy"
        title="Thông báo"
        content={<div className="text-center">
          Bạn có chắc chắn muốn nộp bỏ theo dõi danh mục: <b>{itemSeleted.cateName}</b>?</div>}
      />

      <KCSModal
        visible={showQuizDetail}
        closeModal={() => setShowQuizDetail(false)}
        confirmAction={() => setShowQuizDetail(false)}
        confirmButton="Đóng"
        title="Chi tiết bài thi"
        size='xl'
        content={
          <div>
            <div className="mb-4 text-lg">Điểm: <b className="text-red-500">{quizDetail?.score} / {quizDetail?.total}</b></div>
            <Form className="mt-5" form={form}>
              {quizDetail?.detail?.map((item, index) => (
                <div key={index} className='mb-4'>
                  <QuizView
                    data={item}
                    index={index}
                    isMulti={quizDetail?.total > 1}
                  />
                </div>
              ))}
            </Form>
          </div>
        }
      />
    </div>
  );
};

export default React.memo(Profile);
