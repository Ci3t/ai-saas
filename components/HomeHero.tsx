"use client";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import TypewriterComponent from "typewriter-effect";
import { Button } from "./ui/button";

export const HomeHero = () => {
  const { isSignedIn } = useAuth();
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold bg-gradient-to-r from-slate-300 to-slate-500 bg-clip-text text-transparent">
        <h1>ZeroTwo AI</h1>
        <div className=" bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent">
          <TypewriterComponent
            options={{
              strings: [
                "Very Friendly Chatbot",
                "Amazing Image Generation",
                "Cool Music Generation",
                "Great Video Generation",
                "Code Generation",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create Amazing content with ZeroTwo
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
          <Button
            variant="glow"
            className="md:text-lg p-4 md:p-6 rounded-md font-semibold"
          >
            Start For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        Free Prompts Available
      </div>
    </div>
  );
};
