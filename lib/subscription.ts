import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSubscription = async()=>{
    const { userId } = auth()
    if (!userId) {
        return false;
      }
      const userSubscription = await prismadb.userSubscription.findUnique({
        where: {
            userId: userId,
          },
          select: {
            StripeSubscriptionId: true,
            StripeCurrentPeriodEnd: true,
            StripeCustomerId: true,
            StripePriceId: true,
          },
        })
        if (!userSubscription) {
            return false;
          }
          const isValid =
          userSubscription.StripePriceId &&
          userSubscription.StripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now()
        
          return !!isValid;   
        //   !! for boolean
};