import Link from "next/link";

const NotAuthenticated = () => {
  return (
    <main className="p-24 flex min-h-screen flex-col items-center justify-center text-[#fcfcfa] z-0">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-semibold text-[#fcfcfa]">
          You're not authorized to perform this task!
        </h1>
        <div className="mt-4 flex gap-4 justify-center text-2xl">
          <Link
            href="/signIn"
            className="px-2 py-1 bg-[#7bc6a2] hover:bg-[#fcfcfa] text-[#fcfcfa] hover:text-[#262c35] rounded transform duration-500 ease-in-out"
          >
            SignIn
          </Link>
          <Link
            href="/signUp"
            className="px-2 py-1 bg-[#7bc6a2] hover:bg-[#fcfcfa] text-[#fcfcfa] hover:text-[#262c35] rounded transform duration-500 ease-in-out"
          >
            SignUp
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotAuthenticated;
