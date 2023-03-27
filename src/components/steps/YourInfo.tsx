import { SubmitHandler, useForm } from "react-hook-form";
import { infoType, useUser } from "../../store";

export default function YourInfo() {
  const { mutateData, mutateStep } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<infoType>();
  const onSubmit: SubmitHandler<infoType> = (info) => {
    console.log(info);

    mutateData({ info: info });
    mutateStep(2);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-blue-900 lg:text-5xl">
        Personal info
      </h1>
      <p className="text-gray-500">
        Please provide your name, email address, and phone number
      </p>

      <form
        className="flex flex-col space-y-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label className="text-blue-900 ">Name</label>
        <input
          {...register("name", { required: true })}
          className="rounded-lg border-2 p-3 focus:outline-blue-900/50"
          type="text"
          placeholder="e.g Stephen King"
        />
        {errors.name && <p className="text-red-500">This field is required</p>}

        <label className="pt-3 text-blue-900">Email address</label>
        <input
          {...register("email", { required: true })}
          className="rounded-lg border-2 p-3 focus:outline-blue-900/50"
          type="email"
          placeholder="e.g Stephen King"
        />
        {errors.email && <p className="text-red-500">This field is required</p>}

        <label className="pt-3 text-blue-900">Phone number</label>
        <input
          {...register("tel", { required: true })}
          className="rounded-lg border-2 p-3 focus:outline-blue-900/50"
          type="tel"
          placeholder="e.g Stephen King"
        />
        {errors.tel && <p className="text-red-500">This field is required</p>}

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
