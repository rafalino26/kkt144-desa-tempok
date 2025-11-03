'use client';

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SessionExpiredModal from "../ui/SessionExpiredModal";

export default function SessionWatcher() {
  const { data: session, status } = useSession();
  const [showExpired, setShowExpired] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      localStorage.setItem("wasLoggedIn", "true");
      setShowExpired(false);
    }

    // kalau session hilang tapi sebelumnya pernah login → tampilkan modal
    if (status === "unauthenticated") {
      const prevLogin = localStorage.getItem("wasLoggedIn");
      if (prevLogin === "true") {
        setShowExpired(true);
        // hapus tanda biar gak muncul terus menerus
        localStorage.removeItem("wasLoggedIn");
      }
    }
  }, [status]);

  if (!showExpired) return null;
  return <SessionExpiredModal />;
}
