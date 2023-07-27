"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";

interface MobileSidebarProp {
  apiLimitCount: number;
  isPro: boolean;
}
const MobileSidebar = ({
  apiLimitCount = 0,
  isPro = false,
}: MobileSidebarProp) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;
  return (
    <Sheet>
      <SheetTrigger>
        <Button
          variant={"ghost"}
          size={"icon"}
          className="md:hidden text-white"
        >
          <Menu className="text-muted-foreground" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 text-white">
        <Sidebar isPro={isPro} apiLimitCount={apiLimitCount} />
      </SheetContent>
    </Sheet>
  );
};

export default MobileSidebar;
