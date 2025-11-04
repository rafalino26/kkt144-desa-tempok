'use client';

import { useSession, getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SessionExpiredModal from "../ui/SessionExpiredModal";

export default function SessionWatcher() {
  const { status } = useSession();
  const [showExpired, setShowExpired] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (session) {
        localStorage.setItem("wasLoggedIn", "true");
        setShowExpired(false); 
      } else {
        const prevLogin = localStorage.getItem("wasLoggedIn");
        console.log("Prev Login after session check:", prevLogin); 
        if (prevLogin === "true") {
          setShowExpired(true);
          localStorage.removeItem("wasLoggedIn");
        }
      }
    };


    checkSession();


    const interval = setInterval(() => {
      checkSession();  
    }, 5000); 


    return () => clearInterval(interval);

  }, [status]); 


  if (!showExpired) return null;

  return <SessionExpiredModal />;
}
