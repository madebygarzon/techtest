import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Home from "@/components/home";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/loader";

const HomePage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader outerWidth="100" outerHeight="100" innerScale={0.7} />
      </div>
    );
  }

  if (!session) {
    return null;
  }
  return (
    <div className="">
      <div className="absolute right-2 top-2 text-2xl"></div>
      <Home />
    </div>
  );
};

export default HomePage;
