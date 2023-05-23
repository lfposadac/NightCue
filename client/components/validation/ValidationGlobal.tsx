"use client";

import jwtDecode from "jwt-decode";

export default function ValidationGlobal() {
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

  if (roelId !== "6427409b4aadf86e34b2cba6") {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return <></>;
}
