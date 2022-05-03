import { RecoilRoot } from 'recoil';
import type { AppProps, NextWebVitalsMetric } from 'next/app';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import '../styles/globals.css';

export function reportWebVitals(metric: NextWebVitalsMetric) {
  switch (metric.name) {
    case 'FCP':
      const fcp = Math.round(metric.value * 10) / 10;
      console.log(`FCP: ${fcp}`);
      break;
    case 'LCP':
      const lcp = Math.round(metric.value * 10) / 10;
      console.log(`LCP: ${lcp}`);
      break;
    case 'TTFB':
      const ttfb = Math.round(metric.value * 10) / 10;
      console.log(`TTFB: ${ttfb}`);
      break;
    case 'Next.js-hydration':
      const hydration1 = Math.round(metric.startTime * 10) / 10;
      const hydration2 = Math.round((metric.startTime + metric.value) * 10) / 10;
      console.log(`Hydration: ${hydration1} -> ${hydration2}`);
      break;
    default:
      break;
  }
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <Toaster position='top-center' />
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
