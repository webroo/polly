import { ParrotIcon } from '@/components/Icons';

export default async function HomePage() {
  return (
    <main>
      <form
        action="/polls/new"
        method="GET"
        className="flex flex-col items-center text-center mb-14"
      >
        <div className="relative mt-2 mb-7">
          <ParrotIcon size={128} />
          <div className="absolute whitespace-nowrap left-32 top-4">
            <div className="font-serif italic text-md text-gray-700 bg-gray-100 rounded-md px-2 py-1 rounded-bl-none">
              Hello!
            </div>
            <div className="absolute bottom-0 -left-3 w-3 h-3 bg-[radial-gradient(circle_at_top_left,transparent_0.75rem,rgb(243,244,246)_0.8rem)]"></div>
          </div>
        </div>
        <label htmlFor="title" className="block mb-5 text-4xl">
          What do you want to organise?
        </label>
        <div className="mb-6 w-fit">
          <p className="font-serif italic mb-2">
            For example: &quot;Team lunch&quot; or &quot;Dinner with
            friends&quot;
          </p>
          <input name="title" required className="w-full" />
        </div>
        <button type="submit" className="btn-primary whitespace-nowrap px-8">
          Next Step
        </button>
        <h2 className="mt-16">How does it work?</h2>
        <div className="mt-2 w-1/2 text-sm">
          Polly helps you schedule events with your friends. Decide what you
          want to organise, suggest some dates, then let your friends vote on
          the options that work best for them. The results are displayed in any
          easy to use table.
        </div>
      </form>
    </main>
  );
}
