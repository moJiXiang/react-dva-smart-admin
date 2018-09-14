// @flow
import { NotificationManager } from 'react-notifications';

type Config = {
    title: string,
    message: string,
}

// export default function Notification(props: Props) {
//     const { config: { type, title, message } } = props;
//     return (
//         switch (type) {
//             case 'info':
//                 NotificationManager.info(message)
//                 break;
//             case 'success':
//                 NotificationManager.success(message, title)
//             case 'warning':
//                 NotificationManager.warning(message, title)
//             case 'error':
//                 NotificationManager.error(message, title)
//                 break;
//         }
//     )
// }

export default class Notification {
    static info({ message, title }: Config) {
        console.log('show info');
        NotificationManager.info(message, title);
    }

    static success({ message, title }: Config) {
        NotificationManager.success(message, title);
    }

    static warning({ message, title }: Config) {
        NotificationManager.success(message, title);
    }

    static error({ message, title }: Config) {
        NotificationManager.error(message, title);
    }
}
