import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication - ProManage',
  description: 'Login or Register to access your workspace',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-muted/40">
      <div className="w-full max-w-md p-4">{children}</div>
    </div>
  );
}
