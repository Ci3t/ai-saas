"use client";
import { Rocket } from "lucide-react";
import { Button } from "./ui/button";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

interface SubscriptionBtnProps {
  isPro: boolean;
}

const SubscriptionBtn = ({ isPro = false }: SubscriptionBtnProps) => {
  const [loading, setLoading] = useState(false);

  const onClick = async () => {
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
    <Button
      disabled={loading}
      variant={isPro ? "secondary" : "prem"}
      onClick={onClick}
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Rocket className="w-4 h-4 ml-2 fill-white" />}
    </Button>
  );
};

export default SubscriptionBtn;
