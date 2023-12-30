import { AccountMenu } from "@@/modules/Account/AccountMenu";

export function Header() {
  return (
    <header className="px-6 py-4 flex justify-between border-b border-zinc-800">
      <div></div>
      <div>
        <AccountMenu />
      </div>
    </header>
  );
}
