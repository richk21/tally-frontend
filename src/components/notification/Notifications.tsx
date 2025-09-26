import { Notification } from '@progress/kendo-react-notification';
import { useEffect, useState } from 'react';

interface INotificationsProps {
  type:
    | 'none'
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'base'
    | 'secondary'
    | 'light'
    | 'inverse'
    | 'primary'
    | 'tertiary'
    | 'dark'
    | undefined;
  notificationText: string;
}
export const Notifications = ({
  type,
  notificationText,
}: INotificationsProps) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(true);

    const timeout = setTimeout(() => {
      setIsOpen(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, [type]);

  if (!isOpen) return null;

  return (
    <Notification
      type={{ style: type, icon: true }}
      closable={true}
      onClose={() => setIsOpen(false)}
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '320px',
        alignItems: 'flex-start',
        flexWrap: 'nowrap',
        zIndex: 1300,
        fontSize: '15px',
        padding: '10px 20px',
        WebkitAlignItems: 'center',
      }}
    >
      {notificationText}
    </Notification>
  );
};
