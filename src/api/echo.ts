// src/api/echo.ts
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';

// RN necesita estos polyfills para que Pusher funcione correctamente
// @ts-ignore
Pusher.Runtime.createXHR = () => new XMLHttpRequest();
// @ts-ignore
Pusher.Runtime.createWebSocket = (url: string) => new WebSocket(url);
global.Pusher = Pusher;

export const createEcho = (token: string) => {
  return new Echo({
    broadcaster: 'reverb',
    key: 'tntcjczy96x1pwwstrgt',
    wsHost: '192.168.1.17',
    wsPort: 8080,
    forceTLS: false,
    disableStats: true,
    enabledTransports: ['ws', 'wss'],
    authorizer: (channel: any, options: any) => ({
      authorize: async (socketId: string, callback: any) => {
        try {
          console.log('🔐 Intentando autenticar canal:', channel.name);
          console.log('🔑 Socket ID:', socketId);

          const response = await fetch('http://192.168.1.17:8000/api/broadcasting/auth', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json', // ← IMPORTANTE
            },
            body: JSON.stringify({
              socket_id: socketId,
              channel_name: channel.name,
            }),
          });

          console.log('📡 Status:', response.status);
          
          // Leer la respuesta como texto primero para debuggear
          const text = await response.text();
          console.log('📄 Respuesta raw:', text.substring(0, 200));

          // Verificar si es realmente JSON
          if (!response.ok) {
            console.error('❌ Error HTTP:', response.status, text);
            callback(true, new Error(`HTTP ${response.status}: ${text.substring(0, 100)}`));
            return;
          }

          // Parsear el JSON
          const data = JSON.parse(text);
          console.log('✅ Auth exitosa:', data);
          callback(false, data);

        } catch (error) {
          console.error('❌ Auth error:', error);
          callback(true, error);
        }
      },
    }),
  });
};