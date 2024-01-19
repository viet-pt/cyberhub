import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';

interface IProps {
  visible: boolean;
  title: string;
  content?: any;
  closeButton?: any;
  confirmButton?: string;
  size?: 'md' | 'lg' | 'xl';
  closeModal: any;
  confirmAction?: any;
};

const KCSModal = ({ visible, title, content, closeButton, closeModal, confirmButton, confirmAction, size }: IProps) => {
  let btn = [
    <Button type="primary" key="ok" onClick={confirmAction || closeModal}>{confirmButton || 'Xác nhận'}</Button>
  ]

  if (closeButton) {
    btn = [<Button key="cancel" onClick={closeModal} className='mr-5'>{closeButton === true ? 'Hủy' : closeButton}</Button>, ...btn];
  }

  return (
    <Modal
      className="modal-wrapper"
      title={title || 'Thông báo'}
      open={visible}
      onCancel={closeModal}
      footer={btn}
      width={size === "xl" ? 1150 : size === "lg" ? 800 : 520}
    >
      {content}
    </Modal>
  );
};

KCSModal.propTypes = {
  title: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  confirmButton: PropTypes.string,
  confirmAction: PropTypes.func,
};

KCSModal.defaultProps = {
  visible: false,
  closeModal: () => { },
};

export default React.memo(KCSModal);
