import Dropdown from "@common/Dropdown/Dropdown";
import InputForm from "@common/InputForm/InputForm";
import Modal from "@common/Modal/Modal";
import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { PROVINCES } from "utils/constants";
import { REGEX_NUMBER } from "utils/regex";
import useTrans from "utils/useTrans";
import * as yup from "yup";

const FormSchema = yup.object().shape({
  name: yup.string().required("IDS_NAME_REQUIRED"),
  phone: yup.string().required("IDS_PHONE_REQUIRED"),
  cccd: yup.string().required("IDS_CCCD_REQUIRED")
    .matches(REGEX_NUMBER, "IDS_ONLY_DIGITS")
    .min(9, 'IDS_MIN_DIGITS')
    .max(15, 'IDS_MAX_DIGITS'),
  email: yup
    .string()
    .email("IDS_EMAIL_INVALID")
    .required("IDS_EMAIL_REQUIRED"),
  province: yup.string().required("IDS_PROVINCE_REQUIRED"),
  agency: yup.string().required("IDS_AGENCY_REQUIRED"),
});

const Configurator = ({ data }) => {
  const [agencyList, setAgencyList] = useState<any>([]);
  const [openModal, setOpenModal] = useState(false);
  const i18n = useTrans();

  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset, resetField,
  } = useForm({ resolver: yupResolver(FormSchema) });

  const onSubmit = (values, e) => {
    console.log('values: ', values);
    e.target.reset();
    reset({
      name: '', phone: '',
      cccd: '', email: '',
      province: '', agency: ''
    });
    toast.success("Submit success!");
  };

  const changeProvince = (value) => {
    resetField('agency');
    setAgencyList([
      { value: 1, label: `Đại lý ${+value}` },
      { value: 2, label: `Đại lý ${+value + 1}` },
      { value: 3, label: `Đại lý ${+value + 2}` },
    ])
  }

  return (
    <div className="text-base relative pb-20">
      <div className="h-[300px] w-full bg-green z-[-1]"></div>
      <section className="mt-10">
        <div className="container">
          <h1 className="mb-10 medium text-2xl text-center">Nhập thông tin</h1>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-1/3 mx-auto">
            <InputForm
              name="name"
              placeholder="Name"
              register={register}
              className="mb-8"
              errors={errors.name}
            />
            <InputForm
              name="phone"
              onlyNumber
              placeholder="Phone"
              register={register}
              className="mb-8"
              errors={errors.phone}
            />
            <InputForm
              name="cccd"
              onlyNumber
              placeholder="CCCD"
              register={register}
              className="mb-8"
              errors={errors.cccd}
            />
            <InputForm
              name="email"
              placeholder="Email"
              register={register}
              className="mb-8"
              errors={errors.email}
            />
            <div className="grid grid-cols-2 gap-5">
              <Controller
                name="province"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    label="Chọn tỉnh thành"
                    value={value}
                    onChange={({ value }) => { onChange(value); changeProvince(value) }}
                    list={PROVINCES}
                    error={errors.province}
                  />
                )}
              />
              <Controller
                name="agency"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <Dropdown
                    label="Chọn đại lý"
                    value={value}
                    onChange={({ value }) => onChange(value)}
                    list={agencyList}
                    error={errors.agency}
                  />
                )}
              />
            </div>
            <button type="submit"
              className="mx-auto mt-8 md:mx-0 px-3 lg:px-6 py-2 rounded-none outline-none border-black border border-solid font-apoc"
            >Submit</button>
          </form>

          <button className="bg-purple-500 p-2 rounded-md" onClick={() => setOpenModal(true)}>Open Modal</button>
        </div>
      </section>
      <Modal
        visible={openModal}
        closeModal={() => setOpenModal(false)}
        title="Payment successful"
        confirmButton="OK" size="lg"
        content={<p className="text-black">Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.</p>}
      />
    </div>
  );
};

export default React.memo(Configurator);
