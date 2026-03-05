import Replicate from "replicate";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!prompt) {
      return new NextResponse("Prompt is required", { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial && !isPro) {
      return new NextResponse("Free Trial has expired :/", { status: 403 });
    }

    const output: any = await replicate.run(
      "google/imagen-3-fast",
      {
        input: {
          prompt: prompt,
          aspect_ratio: "1:1",
          safety_filter_level: "block_medium_and_above"
        },
      }
    );

    if (!isPro) {
      await increaseApiLimit();
    }

    /**
     * FIX STARTS HERE
     * Replicate's output is an object. We need to convert it to the 
     * array format the Genius frontend expects: [{ url: "..." }]
     */
    const imageUrl = typeof output === "string" ? output : output.url();
    
    return NextResponse.json([{ url: imageUrl }]);

  } catch (error) {
    console.log("[IMAGE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}