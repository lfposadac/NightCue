"use client";

import jwtDecode from "jwt-decode";

export default function Validation() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const decode = jwtDecode(token);
  const { roelId } = decode;

  if (!roelId) {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  if (roelId !== "6427415c4aadf86e34b2cba8") { // cambiar para el rol id de owner
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return <></>;
}