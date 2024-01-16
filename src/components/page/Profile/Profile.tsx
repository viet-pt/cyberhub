import { UserService } from "api/UserService";
import React, { useEffect, useState } from "react";

const Profile = () => {
  const [userInfo, setUserInfo] = useState('');

  useEffect(() => {
    getQuestionList();
  }, []);

  const getQuestionList = () => {
    UserService.getUserInfo({}, res => {
      if (res?.length) {
        setUserInfo(res);
      }
    })
  }

  return (
    <div className="text-base container pt-4 lg:pt-10">
      <div className="md:flex">
        <ul className="flex-column space-y space-y-4 text-sm font-medium text-gray-500 dark:text-gray-400 md:me-4 mb-4 md:mb-0">
          <li>
            <div className="inline-flex items-center pointer px-4 py-3 text-white bg-blue-700 nơ rounded-lg active w-full dark:bg-blue-600" aria-current="page">
              Thông tin cá nhân
            </div>
          </li>
          <li>
            <a  className="inline-flex items-center pointer px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
              Tin tức
            </a>
          </li>
          <li>
            <a  className="inline-flex items-center pointer px-4 py-3 rounded-lg hover:text-gray-900 bg-gray-50 hover:bg-gray-100 w-full dark:bg-gray-800 dark:hover:bg-gray-700 dark:hover:text-white">
              Câu hỏi
            </a>
          </li>
        </ul>

        <div className="p-6 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-4/5">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">Thông tin cá nhân</h3>
        </div>
      </div>


    </div>
  );
};

export default React.memo(Profile);
