// @flow
import { NotificationManager } from 'react-notifications';

type Config = {
    title: string,
    message: string,
}

export default class Notification {
    static info({ message, title }: Config) {
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
