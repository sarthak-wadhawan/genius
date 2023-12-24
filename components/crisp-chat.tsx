"use client"
import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("d47b0b2c-d5a8-4d97-af3d-05761c2dc8aa");
  }, []);

  return null;
};