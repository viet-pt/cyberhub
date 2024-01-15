import IconBell from "@common/Icons/IconBell";
import Modal from "@common/Modal/Modal";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Subcribe = () => {
  const [visible, setVisible] = useState(false);
  const [txt, setTxt] = useState('');

  const onChange = (e) => {
    setTxt(e.target.value);
  }

  const onSubmit = () => {
    console.log(1111, txt);
    toast.success("Đăng ký nhận thông tin thành công!");
    setVisible(false);
    setTxt('');
  }

  return (
    <>
      <div className="fixed bottom-20 right-6 lg:right-6 flex items-center pointer group" onClick={() => setVisible(true)}>
        <div className="w-11 h-11 flex-center bg-white rounded-full shadow-7 p-2">
          <IconBell className='w-6 h-auto text-primary-orange group-hover:animate-ringring' />
        </div>
        <div className="px-6 py-2 text-white bg-primary-orange text-base shadow-5 rounded-full font-semibold text-center ">Nhận thông tin</div>
      </div>

      <Modal
        visible={visible}
        closeModal={() => setVisible(false)}
        title="Nhận thông tin từ chúng tôi"
        content={
          <div className="w-3/5 mt-6 mx-auto">
            <input className="bg-transparent py-2 rounded-20 text-center px-4 w-full outline-none md:text-base
                 border-primary-orange border border-solid"
              placeholder="Nhập email"
              value={txt} onChange={onChange}
            />
            <div className="flex-center mt-4">
              <button type="submit" onClick={onSubmit} disabled={!txt}
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
