import { ButtonLink } from "@@/common/components/ButtonLink";
import { Meta } from "@@/common/components/Meta";
import { paths } from "@@/common/libs/contants";

export default function HomePage() {
  return (
    <>
      <Meta isHome description="Real-time insights about your APIs" />
      <main className="h-screen w-screen flex items-center">
        <div className="ml-10">
          <h1 className="font-bold text-2xl">Welcome to Dobermann!</h1>
          <p className="text-sm">Endpoint monitoring at scale</p>
          <div className="flex gap-2 mt-4">
            <ButtonLink href={paths.login} className="btn-primary btn-sm">
              Login
            </ButtonLink>
            <ButtonLink href={paths.createAccount} className="btn-outline btn-sm">
              Create an account
            </ButtonLink>
          </div>
        </div>
      </main>
    </>
  );
}
