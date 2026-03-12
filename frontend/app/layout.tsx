import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Strong Tower Mock JAMB CBT',
  description: 'Simulating success, one mock at a time.',
  icons: {
    icon: '/icon.png', // Using the generated image
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('error', (event) => {
                if (event.message && (
                  event.message.includes('ethereum') || 
                  event.message.includes('chrome-extension') ||
                  event.message.includes('Object.defineProperty')
                )) {
                  event.stopImmediatePropagation();
                }
              }, true);

              window.addEventListener('unhandledrejection', (event) => {
                if (event.reason && event.reason.stack && event.reason.stack.includes('chrome-extension')) {
                  event.stopImmediatePropagation();
                }
              }, true);
            `,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
