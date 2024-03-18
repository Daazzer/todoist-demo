import classNames from 'classnames';
import { GrDocumentMissing } from 'react-icons/gr';
import './index.scss';

export default function NoData({ className, text = 'NoData' }) {
  return (
    <div className={classNames('no-data', className)}>
      <GrDocumentMissing className="no-data__icon" />
      <p className="no-data__text">{text}</p>
    </div>
  );
}
