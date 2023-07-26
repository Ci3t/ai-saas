import {
  Code2,
  ImagePlus,
  MessagesSquare,
  Music,
  Settings2,
  Youtube,
} from "lucide-react";
import * as z from "zod";

export const MAX_FREE_COUNTS = 5;

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Prompt is required.",
  }),
});
export const formImageSchema = z.object({
  prompt: z.string().min(1, {
    message: "Image is required.",
  }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

export const amounts = [
  {
    value: "1",
    label: "1 Photo",
  },
  {
    value: "2",
    label: "2 Photos",
  },
  {
    value: "3",
    label: "3 Photos",
  },
  {
    value: "4",
    label: "4 Photos",
  },
  {
    value: "5",
    label: "5 Photos",
  },
];

export const resolutions = [
  {
    value: "256x256",
    label: "256x256",
  },
  {
    value: "512x512",
    label: "512x512",
  },
  {
    value: "1024x1024",
    label: "1024x1024",
  },
];

export const ModalCategory = [
  {
    label: "Chat with ZeroTwo",
    icon: MessagesSquare,

    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Generate an Image",
    icon: ImagePlus,

    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    label: "Produce a Song",
    icon: Music,

    color: "text-pink-700",
    bgColor: "bg-pink-500/10",
  },
  {
    label: "Make an awesome Video",
    icon: Youtube,

    color: "text-orange-700",
    bgColor: "bg-orange-500/10",
  },
  {
    label: "Let's Code",
    icon: Code2,

    color: "text-emerald-700",
    bgColor: "bg-emerald-500/10",
  },
];
