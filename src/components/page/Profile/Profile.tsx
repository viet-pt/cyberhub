import { Table } from "antd";
import { UserService } from "api/UserService";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { useUserStore } from "store/storeUser";
import { convertTime } from "utils/helpers";

const Profile = () => {
  const [tab, setTab] = useState(1);
  const [pageIndex, setPageIndex] = useState(0);
  const [questionList, setQuestionList] = useState<any>([]);
  const [userInfo, setUserInfo] = useState<any>('');
  const [userStore] = useUserStore((state) => [state.data]);

  useEffect(() => {
    getQuestionList();
    getHistory();
  }, []);

  const getQuestionList = () => {
    UserService.getUserInfo({}, res => {
      setUserInfo(res);
    })
  }

  const getHistory = () => {
    UserService.getHistory({}, res => {
      setQuestionList(res);
    })
  }

  const viewDetail = (data) => {

  }

  const columnsTable = useMemo(() => (
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
        key: 'cateName',
        dataIndex: 'cateName',
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
        width: '10%',
        render: (row) =>
          <div className='flex space-x-3 items-center pointer hover:underline text-blue-500' onClick={() => viewDetail(row)}>
            Xem chi tiết
          </div>

      },
    ]
  ), [viewDetail, pageIndex])

  return (
    <div className="text-base container pt-4 lg:pt-10">
      <div className="md:flex">
        <ul className="flex-column space-y space-y-4 text-sm text-gray-700 font-semibold dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          <li onClick={() => setTab(1)}>
            <div className="inline-flex items-center pointer px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full">
              Thông tin cá nhân
            </div>
          </li>
          {/* <li>
            <div className="inline-flex items-center pointer px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full">
              Tin tức
            </div>
          </li> */}
          <li onClick={() => setTab(2)}>
            <div className="inline-flex items-center pointer px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full">
              Câu hỏi
            </div>
          </li>
        </ul>

        <div className="p-6 pb-32 bg-gray-50 text-medium text-gray-800 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-4/5">
          {tab === 1 ?
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
                    <p className="mb-2">{userInfo.name || 'Nguyen Van Hai'}</p>
                    <p>{userInfo.email || 'nguyenvanhai@gmail.com'}</p>
                  </div>
                </div>
                <div className="text-right font-semibold">{convertTime(userInfo.createTime, 'DD/MM/YYYY')}</div>
              </div>
            </section> : null
          }

          {tab === 2 ?
            <section>
              <div className="font-semibold py-3 border-b">
                Lịch sử kiểm tra
              </div>
              <div className="mt-5">
                <Table
                  columns={columnsTable}
                  dataSource={questionList}
                  pagination={{
                    onChange: (page) => {
                      setPageIndex(page - 1)
    
                    },
                    position: ['bottomCenter']
                  }}
                  rowKey="index"
                />
              </div>
            </section> : null
          }
        </div>
      </div>


    </div>
  );
};

export default React.memo(Profile);
