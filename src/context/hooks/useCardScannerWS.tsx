import { processEnv } from '@lib';
import { useEffect, useRef, useState } from 'react';

type CardDisplayMessage = {
    type: 'card-display';
    cardId: string;
    timestamp?: string;
};

export const useCardScannerWS = (onCardScanned: (cardId: string) => void) => {
    const [lastMessage, setLastMessage] = useState<CardDisplayMessage | null>(null);
    const wsRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket(processEnv.getWebSocketUrl());
        wsRef.current = ws;

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data) as CardDisplayMessage;
                if (data.type === 'card-display' && data.cardId) {
                    setLastMessage(data);
                    onCardScanned(data.cardId);
                }
            } catch {
                console.error('Error parsing message:', event.data);
            }
        };

        return () => {
            ws.close(1000, 'Component unmounted');
        };
    }, [onCardScanned]);

    return {
        lastMessage,
        sendMessage: (msg: unknown) => {
            if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
                wsRef.current.send(JSON.stringify(msg));
            }
        },
    };
};
