import { IconBell, IconClose2 } from "@common/Icons";
import Modal from "@common/Modal/Modal";
import { Select } from "antd";
import { UserService } from "api/UserService";
import { Google_ID } from "api/_config";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import { useCateStore } from "store/storeCate";
import { useUserStore } from "store/storeUser";
import Cookies from "universal-cookie";
import { storageKey } from "utils/storageKey";

const cookies = new Cookies();
const dd = 1 * 86400 * 1000;
const d = new Date();

const ALL = '';

const Subcribe = () => {
  const [cateList, setCateList] = useState<any>([]);
  const [cateSeleted, setCateSeleted] = useState<any>(['']);
  const [visible, setVisible] = useState(false);
  const [showSub, setShowSub] = useState(true);
  const [authorized, updateUserStore] = useUserStore((state) => [state.authorized, state.addUserInfo]);
  const [cateStore] = useCateStore((state) => [state.data]);

  const btnRef: any = useRef(null);

  useEffect(() => {
    if (cateStore.length) {
      let list = cateStore.map((item: any) => ({
        value: item.cateId, label: item.cateName
      }))
      list.unshift({ value: ALL, label: 'Tất cả' });
      setCateList(list);
    }
  }, [cateStore])

  const onSubscribe = () => {
    let cateId = cateSeleted.includes(ALL) ? [] : cateSeleted;
    UserService.subscribe({ cateId }, res => {
      if (res.success) {
        toast.success("Đăng ký nhận thông tin thành công!");
        setVisible(false);
      } else {
        toast.error(res.message);
      }
    })
  }

  const handleLoginGoogle = (response) => {
    const { tokenId, profileObj } = response;
    const data = { googleId: tokenId };
    UserService.login(data, res => {
      if (res.success) {
        d.setTime(d.getTime() + dd);
        cookies.set(storageKey.ACCESS_TOKEN, res.data.access_token, { path: '/', expires: d });
        cookies.set(storageKey.PROFILE, JSON.stringify(profileObj), { path: '/', expires: d });
        updateUserStore(profileObj);
      } else {
        toast.error(res.message);
      }
    })
  }

  const handleSubcribe = () => {
    if (authorized) {
      setVisible(true);
    } else {
      btnRef.current.click();
    }
  }

  const handleChange = (value) => {
    let data: any = value;
    if (value[value.length - 1] === ALL || (!value.includes(ALL) && value.length === cateList.length - 1)) {
      data = [ALL];
    } else if (value.includes(ALL) && value.length < cateList.length) {
      data = value.filter(item => item !== ALL);
    }
    setCateSeleted(data);
  };

  return (
    <>
      <div className={clsx("fixed bottom-18 lg:bottom-20 right-6 lg:right-6 flex items-center pointer group", { 'hidden': !showSub })}>
        <div className="w-11 h-11 flex-center bg-white rounded-full shadow-7 p-2" onClick={handleSubcribe}>
          <IconBell className='w-6 h-auto text-primary-orange group-hover:animate-ringring shake' />
        </div>
        <div className="relative">
          <div className="px-6 py-2 text-white bg-primary-orange text-base shadow-5 rounded-full font-semibold text-center relative"
            onClick={handleSubcribe}>
            Nhận thông tin
          </div>
          <div className="rounded-full bg-white shadow-lg w-4 h-4 absolute right-0 -top-2 flex-center border-primary-orange border hover-scale"
            onClick={() => setShowSub(false)}>
            <IconClose2 className="w-3 text-primary-orange" />
          </div>
        </div>
      </div>

      <GoogleLogin
        clientId={Google_ID}
        render={renderProps => <div ref={btnRef} onClick={renderProps.onClick}></div>}
        buttonText="Login"
        onSuccess={handleLoginGoogle}
        cookiePolicy={'single_host_origin'}
      />

      <Modal
        visible={visible}
        closeModal={() => setVisible(false)}
        title="Nhận thông tin từ chúng tôi"
        content={
          <div className="w-3/5 mt-6 mx-auto">
            <Select
              mode="multiple"
              allowClear
              className="w-full"
              placeholder="Chọn danh mục theo dõi"
              // defaultValue={['']}
              value={cateSeleted}
              onChange={handleChange}
              options={cateList}
            />

            <div className="flex-center mt-6">
              <button type="submit" onClick={onSubscribe} disabled={!cateSeleted.length}
                className="px-3 lg:px-10 py-1.5 outline-none text-white bg-primary-orange rounded-20 font-apoc"
              >Submit</button>
            </div>
          </div>
        }
      />
    </>
  );
};

export default React.memo(Subcribe);
