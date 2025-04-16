import StartupForm from "@/app/component/StartupForm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();

  if (!session) redirect("/");

  return (
    <>
      <section className="pink_container !min-h[230px] pattern">
        <h1 className=" heading">Submit Your Startup Pitch</h1>
      </section>
      <StartupForm></StartupForm>
    </>
  );
};

export default Page;
