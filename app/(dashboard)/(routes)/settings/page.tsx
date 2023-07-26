import Header from "@/components/Header";
import SubscriptionBtn from "@/components/SubscriptionBtn";
import { checkSub } from "@/lib/subscription";
import { Settings2 } from "lucide-react";

const SettingsPage = async () => {
  const isPro = await checkSub();
  return (
    <div>
      <Header
        title="Settings"
        description="Manage account settings."
        Icon={Settings2}
        iconColor="text-gray-700"
        bgColor="bg-gray-700/10"
      />
      <div className="px-4 lg:px-8 space-y-4">
        <div className="text-mute-foreground text-sm">
          {isPro ? "You currently on Pro plan." : "You currently on Free Plan"}
        </div>
        <SubscriptionBtn isPro={isPro} />
      </div>
    </div>
  );
};
export default SettingsPage;
