import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal, Select, Form, Input } from 'antd';
import { BsSnapchat, BsPlusLg, BsInboxFill, BsCalendar, BsCalendar3 } from 'react-icons/bs';
import { currentActiveSetAction } from '@/store/reducers/currentActiveSlice';
import './index.scss';

const icons = [
  {
    value: 'inbox',
    label: <BsInboxFill />
  },
  {
    value: 'today',
    label: <BsCalendar />
  },
  {
    value: 'next7days',
    label: <BsCalendar3 />
  }
];

const defaultIcon = icons[0].value

export default function Header() {
  const dispatch = useDispatch(currentActiveSetAction);
  const [open, setOpen] = useState(false);
  const [icon, setIcon] = useState(defaultIcon);

  const onAddMenu = () => {
    setOpen(true);
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
        open={open}
        onCancel={() => setOpen(false)}
        width={350}
      >
        <Form className="menu-form" labelCol={{ span: 4 }}>
          <Form.Item label="icon" name="icon" wrapperCol={{ span: 5 }}>
            <Select
              value={icon}
              onChange={value => setIcon(value)}
              options={icons}
            />
          </Form.Item>
          <Form.Item className="menu-form__field" label="label" name="label">
            <Input name="label" id="label" />
          </Form.Item>
        </Form>
      </Modal>
    </header>
  )
}
