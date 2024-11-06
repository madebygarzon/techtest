import { useSession } from "next-auth/react";

const SessionStatus = () => {
  const { data: session, status } = useSession();

  if (status === "loading") return <p>Loading...</p>;
  if (!session) return <p>No active session</p>;

  return (
    <div>
      <p>Logged in as: {session.user?.name}</p>
      <p>Role: {session.user?.role}</p>
    </div>
  );
};

export default SessionStatus;