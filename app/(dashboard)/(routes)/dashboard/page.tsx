"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ArrowRightToLine,
  Code2,
  ImagePlus,
  MessagesSquare,
  Music,
  Settings2,
  Youtube,
} from "lucide-react";

import { useRouter } from "next/navigation";

const Categories = [
  {
    label: "Chat with ZeroTwo",
    icon: MessagesSquare,
    href: "/chat",
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Generate an Image",
    icon: ImagePlus,
    href: "/image",
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Produce a Song",
    icon: Music,
    href: "/music",
    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Make an awesome Video",
    icon: Youtube,
    href: "/video",
    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Let's Code",
    icon: Code2,
    href: "/code",
    color: "text-emerald-700",
    bgColor: "bg-emerald-500/10",
  },
  {
    label: "Settings",
    icon: Settings2,
    href: "/settings",
    bgColor: "bg-gray-600",
  },
];

const Dashboard = () => {
  const router = useRouter();
  return (
    <div>
      <div className="mb-8 space-y-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-muted-foreground">
          Explore Zero Two Capability & Knowledge{" "}
        </h2>
        <p className="text-muted-foreground font-light text-sm md:text-lg text-center">
          Zero Two at your Service
        </p>
      </div>
      <div className="px-4 md:px-20 lg:px-32 space-y-4">
        {Categories.map((cat) => (
          <Card
            onClick={() => router.push(cat.href)}
            key={cat.href}
            className="p-4 bg-[#1d1d1d] hover:bg-[#111] text-[#e7e7e7] border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center gap-x-4">
              <div className={cn("p-2 w-fit rounded-md", cat.bgColor)}>
                <cat.icon className={cn("w-8 h-8", cat.color)} />
              </div>
              <div className="font-semibold">{cat.label}</div>
            </div>
            <ArrowRightToLine className="w-5 h-5" />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
