import { IconBell } from "@common/Icons";
import Modal from "@common/Modal/Modal";
import { UserService } from "api/UserService";
import { Google_ID } from "api/_config";
import React, { useRef, useState } from "react";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import { useUserStore } from "store/storeUser";
import Cookies from "universal-cookie";
import { storageKey } from "utils/storageKey";

const cookies = new Cookies();
const dd = 1 * 86400 * 1000;
const d = new Date();

const Subcribe = () => {
  const [visible, setVisible] = useState(false);
  const [txt, setTxt] = useState('');
  const [authorized, updateUserStore] = useUserStore((state) => [state.authorized, state.addUserInfo]);

  const btnRef: any = useRef(null);

  const onChange = (e) => {
    setTxt(e.target.value);
  }

  const onSubscribe = () => {
    UserService.subscribe({}, res => {
      if (res.success) {
        toast.success("Đăng ký nhận thông tin thành công!");
        setVisible(false);
        setTxt('');
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
        onSubscribe();
      } else {
        toast.error(res.message);
      }
    })
  }

  const handleSubcribe = () => {
    // setVisible(true);
    if (authorized) {
      onSubscribe();
    } else {
      btnRef.current.click();
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      onSubscribe();
    }
  }

  return (
    <>
      <div className="fixed bottom-20 right-6 lg:right-6 flex items-center pointer group" onClick={handleSubcribe}>
        <div className="w-11 h-11 flex-center bg-white rounded-full shadow-7 p-2">
          <IconBell className='w-6 h-auto text-primary-orange group-hover:animate-ringring shake' />
        </div>
        <div className="px-6 py-2 text-white bg-primary-orange text-base shadow-5 rounded-full font-semibold text-center ">Nhận thông tin</div>
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
            <input className="bg-transparent py-2 rounded-20 text-center px-4 w-full outline-none md:text-base
                 border-primary-orange border border-solid"
              placeholder="Nhập email"
              onKeyDown={handleKeyDown}
              value={txt} onChange={onChange}
            />
            <div className="flex-center mt-4">
              <button type="submit" onClick={onSubscribe} disabled={!txt}
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
