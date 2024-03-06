"use client";
export function getTokenFromLocalStorage() {
  if (typeof window !== "undefined") {
    const storedToken = localStorage.getItem("login-token");
    if (storedToken) {
      return storedToken;
    }
  }
  return "";
}
