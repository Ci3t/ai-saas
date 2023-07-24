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
      console.log("trigger try");
      const newMsgs = [...msgs, userMsg];

      const response = await axios.post("/api/chat", {
        messages: newMsgs,
      });
      setMsgs((curr) => [...curr, userMsg, response.data]);
      form.reset();
    } catch (error: any) {
      console.log("trigger catch");
      console.log(error);
    } finally {
      router.refresh();
      console.log("trigger final");
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
          <div className="flex flex-col-reverse gap-y-4">
            {msgs.map((msg) => (
              <div key={msg.content}>{msg.content}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
