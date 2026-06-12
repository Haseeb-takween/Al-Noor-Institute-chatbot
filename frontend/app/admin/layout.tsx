"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AdminRequestError, checkAdminSession } from "@/lib/admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const isLoginPage = pathname === "/admin/login";
  const [isAuthorized, setIsAuthorized] = useState(isLoginPage);

  useEffect(() => {
    let cancelled = false;

    void checkAdminSession()
      .then(() => {
        if (cancelled) return;
        if (isLoginPage) {
          router.replace("/admin");
          return;
        }
        setIsAuthorized(true);
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        if (err instanceof AdminRequestError && err.unauthorized) {
          if (!isLoginPage) {
            router.replace("/admin/login");
          }
          return;
        }
        if (!isLoginPage) {
          setIsAuthorized(true);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [isLoginPage, pathname, router]);

  if (isLoginPage) {
    return children;
  }

  if (!isAuthorized) {
    return null;
  }

  return children;
}
