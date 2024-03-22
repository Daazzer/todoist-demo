import { createElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Select, Form, Input } from 'antd';
import * as BsIcons from 'react-icons/bs';
import { currentActiveSetAction } from '@/store/reducers/currentActiveSlice';
import './index.scss';

const { BsSnapchat, BsPlusLg } = BsIcons;

const icons = Object.entries(BsIcons).map(([key, value]) => ({
  value: key,
  label: createElement(value)
}));

export default function Header() {
  const dispatch = useDispatch(currentActiveSetAction);
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);

  const onAddMenu = () => {
    setOpen(true);
    form.resetFields();
  };

  const onOk = async () => {
    try {
      await form.validateFields();
    } catch {
      return
    }
    const data = form.getFieldsValue(true);
    console.log(data);
    setOpen(false);
  };

  return (
    <header className="header">
      <Link to="/" onClick={() => dispatch(currentActiveSetAction(''))}>
        <img className="logo" src="/images/logo.png" alt="logo" />
      </Link>
      <div className="header__right">
        <BsPlusLg className="icon add" onClick={onAddMenu} />
        <BsSnapchat className="icon ghost" />
      </div>
      <Modal
        title="Add Menu"
        width={350}
        open={open}
        onCancel={() => setOpen(false)}
        onOk={onOk}
        maskClosable={false}
      >
        <Form
          autoComplete="off"
          form={form}
          labelCol={{ span: 4 }}
        >
          <Form.Item
            label="icon"
            name="icon"
            wrapperCol={{ span: 5 }}
            initialValue={icons[0].value}
          >
            <Select options={icons} />
          </Form.Item>
          <Form.Item
            label="label"
            name="label"
            initialValue=""
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </header>
  );
}
