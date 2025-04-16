import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
const Navbar = async function () {
  const session = await auth();
  // console.log(session);
  return (
    <>
      <header className="px-10 py-8 bg-white">
        <nav className="flex justify-between items-center">
          <Link href="/">
            <Image src="/logo.jpg" alt="logo" width={70} height={8} />
          </Link>
          {/* Render the part when the user is logged in */}
          <div className="flex items-center gap-5 text-black font-semibold">
            {session?.user ? (
              <>
                <Link href="/startup/create">
                  <span>Create</span>
                </Link>
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <button type="submit">Logout</button>
                </form>
                <Link href={`/user/${session?.user?.id}`}>
                  <span>{session?.user?.name}</span>
                </Link>
              </>
            ) : (
              <form
                action={async () => {
                  "use server";
                  await signIn("github", { redirectTo: "/" });
                }}
              >
                <button type="submit">Login</button>
              </form>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};
export default Navbar;
