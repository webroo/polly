import Link from 'next/link';

export default function NotFound() {
  return (
    <div>
      <h1 className="mb-4">Not Found</h1>
      <p className="mb-4">Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  );
}
