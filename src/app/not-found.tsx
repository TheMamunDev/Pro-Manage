import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-6 bg-background p-4 text-foreground">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="rounded-full bg-muted p-4 mb-2">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight">Page not found</h2>
        <p className="text-muted-foreground max-w-[500px]">
          Sorry, we couldn't find the page you're looking for. It might have
          been removed, renamed, or doesn't exist.
        </p>
      </div>
      <Link href="/">
        <Button>Go back home</Button>
      </Link>
    </div>
  );
}
