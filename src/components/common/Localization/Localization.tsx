import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Dropdown from '@common/Dropdown/Dropdown';
import useTrans from 'utils/useTrans';
import { storageKey } from 'utils/storageKey';

const LANGUAGES: any = [
  { value: 'vi', label: 'IDS_LANGUAGE_VN', icon: '/imgs/flag-vn.png' },
  { value: 'en', label: 'IDS_LANGUAGE_US', icon: '/imgs/flag-uk.png' },
]

const Localization = () => {
  const [lang, setLang] = useState(LANGUAGES[0]);
  const router = useRouter();

  useEffect(() => {
    const lang = localStorage.getItem(storageKey.LANGUAGE);
    if (lang) {
      const lngCurrent: any = LANGUAGES.find(item => item.value === lang);
      setLang(lngCurrent);
    }
  }, [])

  const changeLanguage = (item) => {
    if (item.value === lang.value) return;
    localStorage.setItem(storageKey.LANGUAGE, item.value);
    router.push('/', '/', { locale: item.value });
  }

  return (
    <Dropdown
      list={LANGUAGES}
      onChange={changeLanguage}
      value={lang.value}
      label=''
      className="whitespace-nowrap"
    />
  )
}

export default React.memo(Localization);
