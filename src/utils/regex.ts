export const REGEX_MONEY = /[^0-9,]/g;
export const REGEX_TEMPLATE = /^[a-zA-z]+$/g;
export const DATE_TIME_REGEX = /^[0-9 /]*$/;
export const REGEX_VIETNAMESE = /[^a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼẾỀỂưăạảấầẩẫậắằẳẵặẹẻẽếềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổ.,:;ỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳýỵỷỹ]/u;
export const REGEX_NUMBER = /^[0-9]*$/;
export const REGEX_PHONE_NUMBER =  /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
export const REGEX_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const REGEX_EMAIL_OR_PHONE = /^(?:\d{10,12}|\w+@\w+\.\w{2,3})$/;
