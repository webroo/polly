import Image from 'next/image';

export default async function HomePage() {
  return (
    <form
      action="/polls/new"
      method="GET"
      className="flex flex-col items-center text-center"
    >
      <Image
        src="/parrot.png"
        alt="Cartoon character of a happy-looking green parrot smiling and waving a wing."
        width={128}
        height={128}
        className="mb-5"
      />
      <label htmlFor="title" className="block mb-5 text-4xl">
        What do you want to organise?
      </label>
      <div className="mb-6">
        <p className="font-serif italic mb-2">
          For example: &quot;Team lunch&quot; or &quot;Dinner with friends&quot;
        </p>
        <input name="title" required className="w-full" />
      </div>
      <button className="btn-primary whitespace-nowrap px-8">Next Step</button>
      <h2 className="mt-14">How does it work?</h2>
      <div className="mt-2 w-1/2 text-sm">
        Polly helps you schedule events with your friends. Decide what you want
        to organise, suggest some dates, then let your friends vote on the
        options that work best for them. The results are displayed in any easy
        to use table.
      </div>
    </form>
  );
}
