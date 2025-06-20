import { processEnv } from '@lib';
import { useEffect, useRef, useState } from 'react';

interface NotificationMessage {
    type: 'notification-new';
    content: string;
    timestamp?: string;
}

export const useNotificationWS = (onNotificationReceived?: (content: string) => void) => {
    const [lastNotification, setLastNotification] = useState<NotificationMessage | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(processEnv.getWebSocketUrl());
        wsRef.current = ws;

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.type === 'notification-new' && typeof data.content === 'string') {
                    const notificationMsg = data as NotificationMessage;
                    setLastNotification(notificationMsg);
                    onNotificationReceived?.(notificationMsg.content);
                }
            } catch (err) {
                console.error('Error parsing notification message:', event.data, err);
            }
        };

        return () => {
            ws.close(1000, 'Component unmounted');
        };
    }, [onNotificationReceived]);

    return {
        lastNotification,
        sendMessage: (msg: unknown) => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify(msg));
            }
        },
    };
};
