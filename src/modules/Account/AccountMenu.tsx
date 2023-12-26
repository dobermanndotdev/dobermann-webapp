import { Icon } from "@@/common/components/Icon";
import { apiClients } from "@@/common/libs/api";
import { User } from "@@/common/libs/apiClient";
import { LOCALSTORAGE_AUTH_TOKEN, SESSION_STORAGE_USER_DETAILS } from "@@/common/libs/contants";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function AccountMenu() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const loadProfileDetails = useCallback(async () => {
    const userInSessionStorage = window.sessionStorage.getItem(SESSION_STORAGE_USER_DETAILS);

    if (!userInSessionStorage) {
      const { data } = await apiClients().AccountsApiFactory.getProfileDetails();
      window.sessionStorage.setItem(SESSION_STORAGE_USER_DETAILS, JSON.stringify(data.data));
      setUser(data.data);
    } else {
      setUser(JSON.parse(userInSessionStorage));
    }
  }, []);

  useEffect(() => {
    loadProfileDetails();
  }, [loadProfileDetails]);

  const logoutHandler = async () => {
    await fetch("/api/auth/logout", { method: "DELETE" });
    localStorage.removeItem(LOCALSTORAGE_AUTH_TOKEN);
    sessionStorage.removeItem(SESSION_STORAGE_USER_DETAILS);
    router.push("/login");
  };

  return (
    <details className="dropdown dropdown-bottom dropdown-end h-full w-full">
      <summary role="button" className="list-none h-full flex gap-1 items-center justify-center px-2 cursor-pointer">
        <Icon name="ri-user-fill" />
        <Icon name="ri-arrow-down-s-fill" />
      </summary>
      <div className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <div className="border-b flex flex-col gap-1 pb-3 px-4">
          <span className="py-0">
            {user?.first_name} {user?.last_name}
          </span>
          <span className="text-xs py-0">{user?.email}</span>
          <span className="badge badge-ghost text-xs py-0 capitalize">{user?.role}</span>
        </div>

        <ul className="mt-1">
          {/* <li>
            <a>Account</a>
          </li> */}
          <li>
            <button onClick={logoutHandler}>Log out</button>
          </li>
        </ul>
      </div>
    </details>
  );
}
