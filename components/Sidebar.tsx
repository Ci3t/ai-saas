"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Lobster } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  Code2,
  ImagePlus,
  LayoutDashboard,
  MessagesSquare,
  Music,
  Settings2,
  Youtube,
} from "lucide-react";
import { FreeTierCount } from "./FreeTierCount";

const montserrat = Lobster({ weight: "400", subsets: ["latin"] });

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Chat",
    icon: MessagesSquare,
    href: "/chat",
    color: "text-violet-500",
  },
  {
    label: "Image Generation",
    icon: ImagePlus,
    href: "/image",
    color: "text-yellow-500",
  },
  {
    label: "Music",
    icon: Music,
    href: "/music",
    color: "text-pink-700",
  },
  {
    label: "Video",
    icon: Youtube,
    href: "/video",
    color: "text-orange-700",
  },
  {
    label: "Code",
    icon: Code2,
    href: "/code",
    color: "text-emerald-700",
  },
  {
    label: "Settings",
    icon: Settings2,
    href: "/settings",
  },
];

interface SidebarProp {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount, isPro = false }: SidebarProp) => {
  const pathname = usePathname();
  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-[#111827] text-white">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <div className="relative w-10 h-9 mr-4">
            <Image fill alt="Logo" src="/logo2.png" />
          </div>
          <h1 className={cn("text-2xl font-bold", montserrat.className)}>
            ZeroTwo
          </h1>
        </Link>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                pathname === route.href
                  ? "text-white bg-white/10"
                  : "text-zinc-400",
              )}
            >
              <div className="flex items-center flex-1">
                <route.icon className={cn("h-5 w-5 m-3", route.color)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeTierCount isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
