import Modal2PC from './Modal2PC';
import Modal2Mobile from './Modal2Mobile';
import useResponsiveWidth from '../../hooks/useResponsiveWidth';

export default function Modal2(props) {
  const size = useResponsiveWidth();
  return (
    <>
      {size === 'mobile' ? (
        <Modal2Mobile {...props} />
      ) : (
        <Modal2PC {...props} />
      )}
    </>
  );
}
