export default async function () {
  try {
    const logoutReq = await fetch(
      import.meta.env.VITE_BACKENDSERVER.concat("/auth/logout"),
      {
        method: "POST",
      }
    );

    console.log({ logoutReq });
    if (logoutReq.ok) {
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    throw new Error(`failed to logout please try again later`);
  } catch (err) {
    return err.message;
  }
}
