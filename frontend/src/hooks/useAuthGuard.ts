"use client";

import { LogoutStore } from "@/stores/logout-store";
import { useEffect, useState } from "react";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export function useAuthGuard() {
  const [checked, setChecked] = useState(false);
  const [checking, setChecking] = useState(true);
  const logout = LogoutStore((s) => s.logout);
  const setLogout = LogoutStore((s) => s.setLogout);

  useEffect(() => {
    console.log("invoked Auth Guard");

    const token = localStorage.getItem("token");
    console.log("token", token);

    if (!token) {
      setChecking(false);
      setChecked(false);
      return;
    }

    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE}/check_auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.ok) {
          console.log("authentication successful");
          setChecked(true);
        } else {
          setChecked(false);
        }
      } catch {
        setChecked(false);
      } finally {
        setChecking(false);
      }
    }

    fetchProfile();
  }, [ logout ]);

  return { checking, checked };
}

