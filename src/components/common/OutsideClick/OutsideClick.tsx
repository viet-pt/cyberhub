import React, { ReactNode, useEffect, useRef } from 'react';

interface IOutsideClick {
  children: ReactNode;
  onClickOutSide: Function;
}

function useOutsideAlerter(ref, onClickOutSide) {
  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);
    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [ref]);

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      onClickOutSide();
    }
  }
}

function OutsideClick({ children, onClickOutSide }: IOutsideClick) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClickOutSide);

  return <div className="h-full" ref={wrapperRef}>{children}</div>;
}

export default React.memo(OutsideClick);