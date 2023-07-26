"use client";

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("4c5471e1-106b-4634-a4a1-1ea3ebe3043b");
  }, []);

  return null;
};
