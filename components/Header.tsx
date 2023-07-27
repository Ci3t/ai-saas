import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import React from "react";

interface HeaderProps {
  title: string;
  subTitle?: string;
  description: string;
  Icon: LucideIcon;
  iconColor?: string;
  bgColor?: string;
}

const Header = ({
  title,
  subTitle,
  description,
  Icon,
  iconColor,
  bgColor,
}: HeaderProps) => {
  return (
    <div className="px-4 lg:px-8 flex items-center gap-x-3 mb-8">
      <div className={cn("p-2 w-fit rounded-md", bgColor)}>
        <Icon className={cn("w-10 h-10", iconColor)} />
      </div>
      <div>
        <h2 className="text-3xl font-bold text-[#e7e7e7]">{title}</h2>
        <h4 className="text-1xl font-bold text-muted-foreground">{subTitle}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default Header;
