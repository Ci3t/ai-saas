"use client";
import axios from "axios";
import Header from "@/components/Header";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Code2, MessagesSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { formSchema } from "@/lib/constants";
import { Empty } from "@/components/Empty";
import { Loader } from "@/components/Loader";
import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/UserAvatar";
import { ZeroTwoAvatar } from "@/components/ZeroTwoAvatar";
import { useProModal } from "@/hooks/useProModal";
import toast from "react-hot-toast";

const Code = () => {
  const router = useRouter();
  const proModal = useProModal();
  const [msgs, setMsgs] = useState<ChatCompletionRequestMessage[]>([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userMsg: ChatCompletionRequestMessage = {
        role: "user",
        content: values.prompt,
      };

      const newMsgs = [...msgs, userMsg];

      const response = await axios.post("/api/code", {
        messages: newMsgs,
      });
      setMsgs((curr) => [...curr, userMsg, response.data]);
      form.reset();
    } catch (error: any) {
      if (error?.response?.status === 403) {
        proModal.onOpen();
      } else {
        toast.error("Something went wrong!");
      }
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Header
        title="Code"
        description="ZeroTwo will help you generate code by typing descriptive text"
        Icon={Code2}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Example: how to make simple toggle button"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Send
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
              <Loader title="ZeroTwo Typing..." />
            </div>
          )}
          {msgs.length === 0 && !isLoading && (
            <div>
              <Empty label="No Chat started yet " />
            </div>
          )}

          <div className="flex flex-col-reverse gap-y-4">
            {[...msgs].reverse().map((msg) => (
              <div
                className={cn(
                  "p-8 w-full flex items-start gap-x-8 rounded-lg",
                  msg.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted",
                )}
                key={msg.content}
              >
                {msg.role === "user" ? <UserAvatar /> : <ZeroTwoAvatar />}
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {msg.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Code;
