export default function YourInfo() {
  return (
    <>
      <h1 className="text-3xl font-bold text-blue-900 lg:text-5xl">
        Personal info
      </h1>
      <p className="text-gray-500">
        Please provide your name, email address, and phone number
      </p>

      <form className="flex flex-col space-y-2">
        <label className="text-blue-900 ">Name</label>
        <input
          className="rounded-lg border-2 p-3 focus:outline-blue-900/50"
          type="text"
          placeholder="e.g Stephen King"
        />

        <label className="pt-3 text-blue-900">Email address</label>
        <input
          className="rounded-lg border-2 p-3 focus:outline-blue-900/50"
          type="email"
          placeholder="e.g Stephen King"
        />

        <label className="pt-3 text-blue-900">Phone number</label>
        <input
          className="rounded-lg border-2 p-3 focus:outline-blue-900/50"
          type="tel"
          placeholder="e.g Stephen King"
        />

        <br />

        <button
          className="ml-auto w-fit rounded-lg bg-blue-900 px-2 py-3 text-white focus:outline-blue-400"
          type="submit"
        >
          Next step
        </button>
      </form>
    </>
  );
}
