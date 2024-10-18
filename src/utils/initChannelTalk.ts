declare global {
    interface Window {
      ChannelIO?: any;
      ChannelIOInitialized?: boolean;
    }
  }
  
  export const initChannelTalk = () => {
    (function() {
      const w = window;
      if (w.ChannelIO) {
        return console.error('ChannelIO script included twice.');
      }
      const ch: any = function() {
        ch.c(arguments);
      };
      ch.q = [];
      ch.c = function(args: any) {
        ch.q.push(args);
      };
      w.ChannelIO = ch;
      function l() {
        if (w.ChannelIOInitialized) {
          return;
        }
        w.ChannelIOInitialized = true;
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
        const x = document.getElementsByTagName('script')[0];
        x.parentNode?.insertBefore(s, x);
      }
      if (document.readyState === 'complete') {
        l();
      } else {
        window.addEventListener('DOMContentLoaded', l, false);
        window.addEventListener('load', l, false);
      }
    })();
  
    window.ChannelIO('boot', {
      pluginKey: '9473976e-d87c-468b-a64d-07f2813a7b82',
    });
  };
  