"use client";
import axios from "axios";
import Header from "@/components/Header";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { MessagesSquare } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

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

const Chat = () => {
  const router = useRouter();
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

      const response = await axios.post("/api/chat", {
        messages: newMsgs,
      });
      setMsgs((curr) => [...curr, userMsg, response.data]);
      form.reset();
    } catch (error: any) {
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Header
        title="Chat"
        description="ZeroTwo would love to Chat with you"
        Icon={MessagesSquare}
        iconColor="text-violet-500"
        bgColor="bg-violet-500/10"
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
                        placeholder="How are you today?"
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
                <p className="text-sm">{msg.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
