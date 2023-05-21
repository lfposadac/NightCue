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

  if (roelId !== "64652ddab532c1635f84cec3") {
    localStorage.removeItem("token");
    window.location.href = "/login";
  }

  return <></>;
}
