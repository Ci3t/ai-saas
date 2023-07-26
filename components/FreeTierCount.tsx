"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MAX_FREE_COUNTS } from "@/lib/constants";
import { Progress } from "./ui/progress";
import { Button } from "./ui/button";
import { Rocket } from "lucide-react";
import { useProModal } from "@/hooks/useProModal";

interface FreeTierProps {
  apiLimitCount: number;
}

export const FreeTierCount = ({ apiLimitCount = 0 }: FreeTierProps) => {
  const proModal = useProModal();
  const [isMounted, setIsMounter] = useState(false);

  useEffect(() => {
    setIsMounter(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {apiLimitCount} / {MAX_FREE_COUNTS} Free Prompts
            </p>
            <Progress
              className="h-3"
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
            />
          </div>
          <Button onClick={proModal.onOpen} className="w-full" variant={"prem"}>
            Upgrade
            <Rocket className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
