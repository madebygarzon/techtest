import { useSession } from "next-auth/react";

const SessionStatus = () => {
  const { data: session, status } = useSession();

  // Depuración adicional para validar `status` y `session`
  console.log("Session status:", status);
  console.log("Session data:", session);

  if (status === "loading") return <p>Loading...</p>;
  
  if (status === "unauthenticated") {
    return <p>No active session</p>;
  }

  if (!session) {
    return <p>No active session (session data is null)</p>;
  }

  return (
    <div>
      <p>Logged in as: {session.user?.name || "Unknown"}</p>
      <p>Role: {session.user?.role || "Unknown"}</p>
    </div>
  );
};

export default SessionStatus;
