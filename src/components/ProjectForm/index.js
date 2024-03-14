import './index.scss';

/** @type {Array<{ value: string; label: string }>} */
const emojis = [
  {
    value: 'hands up',
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


export default function ProjectForm({ isShow = false, onClose }) {
  return (
    isShow && <div className="project-form-wrapper">
      <form className="project-form">
        <h2 className="project-form__title">
          Add Project
          <button className="close-btn" type="button" onClick={onClose}>×</button>
        </h2>
        <div className="project-form__field">
          <label className="project-form__label" htmlFor="color">Color</label>
          <input
            className="project-form__content color"
            id="color"
            name="color"
            type="color"
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
          />
        </div>
      </form>
    </div>
  );
}