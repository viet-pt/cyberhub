import { IconClose } from '@common/Icons';
import { Dialog, Transition } from '@headlessui/react';
import cn from 'clsx';
import React, { Fragment } from 'react';
import useTrans from 'utils/useTrans';

interface IProps {
  visible: boolean;
  title: string;
  content?: any;
  closeButton?: string;
  confirmButton?: string;
  size?: 'md' | 'lg' | 'xl';
  className?: string;
  closeModal: any;
  confirmAction?: any;
};

const Modal = ({ visible, title, content, closeButton,
  confirmButton, closeModal, confirmAction, size, className }: IProps) => {
  const i18n = useTrans();

  return (
    <Transition appear show={visible} as={Fragment}>
      <Dialog as="div" className={cn("relative z-[1000]", className)} onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className={cn(`w-full relative transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all font-sans`,
                size === "xl" ? 'max-w-6xl' : size === "lg" ? 'max-w-3xl' : 'max-w-lg')}>
                <Dialog.Title as="h3" className="text-lg medium leading-6 text-gray-900 text-center">
                  {title}
                </Dialog.Title>

                <IconClose
                  className="text-gray-500 w-3.5 absolute top-4 right-4 cursor-pointer hover-scale"
                  onClick={closeModal}
                />

                <div className="mt-4">{content}</div>

                <div className="mt-5 flex items-center justify-center space-x-6 text-sm">
                  {closeButton &&
                    <button
                      type="button"
                      className="rounded-md border border-solid border-gray-300 text-primary-black
                        px-6 py-1.5 hover:border-primary-orange hover:text-primary-orange"
                      onClick={closeModal}
                    >
                      {i18n[closeButton] || closeButton}
                    </button>
                  }

                  {confirmButton &&
                    <button
                      type="button"
                      className="rounded-md border border-solid border-primary-orange bg-primary-orange text-white
                        px-6 py-1.5 hover:opacity-70"
                      onClick={confirmAction}
                    >
                      {i18n[confirmButton] || confirmButton}
                    </button>
                  }
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default React.memo(Modal);