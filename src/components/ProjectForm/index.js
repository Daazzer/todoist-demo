import { useEffect, useState } from 'react';
import { uuid } from '@/utils';
import './index.scss';

/** @type {Array<{ value: string; label: string }>} */
const emojis = [
  {
    value: 'handsUp',
    label: '🙌'
  },
  {
    value: 'rocket',
    label: '🚀'
  },
  {
    value: 'target',
    label: '🎯'
  },
  {
    value: 'books',
    label: '📚'
  },
  {
    value: 'music',
    label: '🎵'
  }
];

const defaultEmoji = emojis[0].value;

export default function ProjectForm({ type, label, isShow = false, onConfirm, onClose }) {
  const [color, setColor] = useState('#000000');
  const [emoji, setEmoji] = useState(defaultEmoji);
  const [title, setTitle] = useState('');

  const onConfirmClick = () => {
    if (!title) return;
    onConfirm({
      id: uuid(),
      type,
      color,
      emoji,
      title
    });
    onClose();
  };

  useEffect(() => {
    if (isShow) {
      setColor('#000000');
      setEmoji(defaultEmoji);
      setTitle('');
    }
  }, [isShow]);

  return (
    isShow && <div className="project-form-wrapper">
      <form className="project-form">
        <h2 className="project-form__title">
          Add Project For {label}
          <button className="close-btn" type="button" onClick={onClose}>×</button>
        </h2>
        <div className="project-form__field">
          <label className="project-form__label" htmlFor="color">Color</label>
          <input
            className="project-form__content color"
            id="color"
            name="color"
            type="color"
            value={color}
            onChange={e => setColor(e.target.value)}
          />
        </div>
        <div className="project-form__field">
          <label
            className="project-form__label"
            htmlFor="emoji"
          >Emoji</label>
          <select
            className="project-form__content emoji"
            id="emoji"
            name="emoji"
            value={emoji}
            onChange={e => setEmoji(e.target.value)}
          >
            {emojis.map(emoji => <option key={emoji.value} {...emoji} />)}
          </select>
        </div>
        <div className="project-form__field">
          <label className="project-form__label" htmlFor="title">Title</label>
          <input
            maxLength={300}
            className="project-form__content"
            id="title"
            name="title"
            value={title}
            onInput={e => setTitle(e.target.value)}
          />
        </div>
        <footer className="project-form__footer">
          <button
            className="project-form__footer__button project-form__footer__button--confirm"
            type="button"
            onClick={onConfirmClick}
          >Confirm</button>
          <button
            className="project-form__footer__button"
            type="button"
            onClick={onClose}
          >Cancel</button>
        </footer>
      </form>
    </div>
  );
}