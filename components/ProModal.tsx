"use client";

import { useProModal } from "@/hooks/useProModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Badge } from "./ui/badge";
import { ModalCategory } from "@/lib/constants";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Check, Rocket } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ProModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const proModal = useProModal();

  const onSub = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");
      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1 text-[#e7e7e7]">
              Upgrade to ZeroTwo
              <Badge variant="prem" className="uppercase text-sm py-1">
                Pro
              </Badge>
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2  text-zinc-500 font-medium">
            {ModalCategory.map((cat) => (
              <Card
                key={cat.label}
                className="p-3 border-black/5 flex bg-[#1d1d1d] text-[#e7e7e7] items-center justify-between"
              >
                <div className="flex items-center gap-x-4">
                  <div className={cn("p-2 w-fit rounded-md", cat.bgColor)}>
                    <cat.icon className={cn("w-6 h-6", cat.color)} />
                  </div>
                  <div className="font-semibold text-sm">{cat.label}</div>
                </div>
                <Check className="text-primary w-5 h-5 text-cyan-600" />
              </Card>
            ))}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            disabled={loading}
            onClick={onSub}
            size="lg"
            variant="prem"
            className="w-full "
          >
            {loading ? "Please wait..." : "Upgrade"}
            <Rocket className="w-4 h-4 wl-2 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
