import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import Groq from 'groq-sdk';

const configuration = new Configuration({
  apiKey: process.env.GROQ_API_KEY,
});

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});
export async function POST(
  req: Request
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages  } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!configuration.apiKey) {

      return new NextResponse("OpenAI API Key not configured.", { status: 500 });
    }

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }
    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();
     if (!freeTrial && !isPro) {
      return new NextResponse("Free Trial has expired :/", { status: 403});
     }
    
    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages
    });
    await increaseApiLimit();
    return NextResponse.json(response.choices[0].message);
} catch (error: any) {
    console.log('[CONVERSATION_ERROR]', error);

    // Log the specific error details
    if (error.response && error.response.data) {
        console.error('[CONVERSATION_ERROR_DETAILS]', error.response.data);
    }

    return new NextResponse("Internal Error ", { status: 500 });
}
};