import Link from 'next/link';

export default async function HomePage() {
  return (
    <main>
      <div>
        <Link href="/polls">View polls</Link>
      </div>
      <div>
        <Link href="/polls/new">Add poll</Link>
      </div>
    </main>
  );
}
