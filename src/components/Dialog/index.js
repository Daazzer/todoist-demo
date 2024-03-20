import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { BsX } from 'react-icons/bs';
import style from './index.module.scss';

/**
 * @typedef Props
 * @property {boolean} [className]
 * @property {boolean} [open] 模态框开关
 * @property {Function} onCancel 取消事件
 * @property {string} title 模态框标题
 * @param {import('react').PropsWithChildren<Props>} props
 */
export default function Dialog({ className, title, open, children, onCancel }) {
  const display = open ? undefined : 'none';

  return createPortal(
    <div className={style.wrapper} style={{ display }}>
      <div className={classNames(className, style.dialog)}>
        <h2 className={style.dialogTitle}>{title}</h2>
        <button
          className={classNames(style.dialogButton, style.dialogButtonClose)}
          onClick={() => onCancel()}
        ><BsX /></button>
        <div className={style.dialogBody}>{children}</div>
        <footer className={style.dialogFooter}>
          <button
            className={classNames(style.dialogButton, style.dialogButtonCancel)}
            onClick={() => onCancel()}
          >Cancel</button>
          <button className={classNames(style.dialogButton, style.dialogButtonOk)}>OK</button>
        </footer>
      </div>
    </div>,
    document.body
  );
}
