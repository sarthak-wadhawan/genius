"use client"

import { useProModal } from "@/hooks/use-pro-modal"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge";
import { ArrowRight, BrushIcon, Check, CodepenIcon, ImageIcon, MessageSquare, Music, VideoIcon, Zap } from "lucide-react"
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const tools = [
    {
    label: "Conversation",
    icon : MessageSquare,
    color:"text-violet-500",
    bgColor: "bg-violet-500/10",
    href: "/conversation"
    },
    {
      label: "Music Generation",
      icon : Music,
      color:"text-emerald-500",
      bgColor: "bg-emerald-500/10",
      href: "/music"
      },
      {
        label: "Image Generation",
        icon : ImageIcon,
        color:"text-violet-500",
        bgColor: "bg-violet-500/10",
        href: "/image"
        },
        {
          label: "Video Generation",
          icon : VideoIcon,
          color:"text-orange-500",
          bgColor: "bg-orange-500/10",
          href: "/video"
          },
          {
            label: "Code Generation",
            icon : CodepenIcon,
            color:"text-green-500",
            bgColor: "bg-green-500/10",
            href: "/code"
            }
  ]

export const ProModal = () => {
    const proModal = useProModal();
    const [loading, setLoading] = useState(false);
    const onSubscribe = async () => {
        try {
          setLoading(true);
          const response = await axios.get("/api/stripe");
    
          window.location.href = response.data.url;
        } catch (error) {
          toast.error("Something went wrong");
            } finally {
          setLoading(false);
        }
      }
    return(
        <Dialog open = {proModal.isOpen} onOpenChange={proModal.onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
                        <div className="flex items-center gap-x-2 font-bold py-1">

                        Upgrade to Genius
                        <Badge variant = "premium" className="uppercase text-sm py-1">
                            pro
                        </Badge>
                        </div>
                    </DialogTitle>
                    <DialogDescription className="rext-center pt-2 font-medium space-y-2 text-zinc-900">
                        {tools.map((tool)=>(
                            <Card 
                            key={tool.label}
                            className="p-3 border-black/5 flex itmes-center justify-between">
                                <div className="flex items-center gap-x-4">
                                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                                        <tool.icon className={cn("w-6 h-6", tool.color)} />
                                    </div>
                                    <div className="font-semibold text-sm">
                                        {tool.label}
                                    </div>
                                </div>
                                <Check className="text-primary w-5 h-5"/>
                            </Card>
                        ))}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                    disabled = {loading}
                    size="lg"
                    variant="premium"
                    className = "w-full"
                    onClick={onSubscribe}
                    >
                        Upgrade
                        <Zap className="w-4 h-4 ml-2 fill-white"/>
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}