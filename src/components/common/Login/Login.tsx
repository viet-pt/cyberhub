import Modal from "@common/Modal/Modal";
import { UserService } from "api/UserService";
import { Google_ID } from "api/_config";
import Image from "next/image";
import React from "react";
import GoogleLogin from "react-google-login";
import { toast } from "react-toastify";
import { useUserStore } from "store/storeUser";
import Cookies from "universal-cookie";
import { storageKey } from "utils/storageKey";

const cookies = new Cookies();
const dd = 8 * 60 * 60 * 1000;
const d = new Date();

const Login = ({ visible, closeModal }) => {
  const [updateUserStore] = useUserStore((state) => [state.addUserInfo])

  const handleLoginGoogle = (response) => {
    const { tokenId, profileObj } = response;
    const data = { googleId: tokenId };
    UserService.login(data, res => {
      if (res.success) {
        toast.success("Đăng nhập thành công!");
        d.setTime(d.getTime() + dd);
        cookies.set(storageKey.ACCESS_TOKEN, res.data.access_token, { path: '/', expires: d });
        cookies.set(storageKey.PROFILE, JSON.stringify(profileObj), { path: '/', expires: d });
        updateUserStore(profileObj);
        closeModal();
      } else {
        toast.error(res.message);
      }
    })
  }

  return (
    <Modal
      visible={visible}
      closeModal={closeModal}
      title="Đăng nhập"
      content={
        <div className="py-4 flex-center">
          <GoogleLogin
            clientId={Google_ID}
            render={renderProps => (
              <div className="rounded-md p-1 text-center bg-[#3f7fec] text-white flex items-center lg:w-3/5 font-medium pointer group"
                onClick={renderProps.onClick}>
                <div className="rounded-md bg-white w-12 h-12 p-2 mr-8 group-hover:animate-ringring">
                  <Image
                    alt='google'
                    src='/imgs/G.png'
                    className='h-8 w-auto'
                    width={0} height={0}
                  />
                </div>
                <p className="mr-4">Đăng nhập với Google</p>
              </div>
            )}
            buttonText="Login"
            onSuccess={handleLoginGoogle}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      }
    />
  )
}

export default React.memo(Login);