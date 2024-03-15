import { useParams } from 'react-router-dom';

export default function Project() {
  const { type, id } = useParams();

  return (
    <div>{type}-{id}</div>
  );
}
