"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { retrieveUser } from "@/redux/user/user";
import Loading from "@/components/loading/loading.component";

export function UserAuth({ children }: { children: React.ReactNode }) {
  const userStatus = useSelector((state: RootState) => state.user.status);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(retrieveUser());
    }
  }, [userStatus]);

  if (userStatus === "trying to retrieve user info") {
    return <Loading />;
  }
  return <>{children}</>;
}
