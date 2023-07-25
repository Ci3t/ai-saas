import Image from "next/image";

interface LoaderProps {
  title: string;
}

export const Loader = ({ title }: LoaderProps) => {
  return (
    <div className="h-full flex flex-col gap-y-4 items-center justify-center">
      <div className="w-10 h-10 relative animate-bounce">
        <Image alt="logo" fill src="/logo2.png" />
      </div>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
};
