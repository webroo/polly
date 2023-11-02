export default async function HomePage() {
  return (
    <form action="/polls/new" method="GET">
      <div className="flex flex-col items-center text-center">
        <label htmlFor="title" className="block mb-6 text-4xl">
          What do you want to organise?
        </label>
        <div className="mb-6">
          <p className="font-serif italic mb-2">
            For example: &quot;Team lunch&quot; or &quot;Dinner with
            friends&quot;
          </p>
          <input name="title" required className="w-full" />
        </div>
        <button className="btn-primary whitespace-nowrap px-8">
          Next Step
        </button>
      </div>
    </form>
  );
}
