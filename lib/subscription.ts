// import { auth } from "@clerk/nextjs";
// import prismadb from "./prismadb";

// const DAY_IN_MS = 86_400_000;

// export const checkSub = async () => {
//   const { userId } = auth();

//   if (!userId) return false;

//   const userSub = await prismadb.userSubscription.findUnique({
//     where: {
//       userId,
//     },
//     select: {
//       stripeCustomerId: true,
//       stripeCurrentPeriodEnd: true,
//       stripeSubscriptionId: true,
//       stripePriceId: true,
//     },
//   });

//   if (!userSub) return false;

//   const isValid =
//     userSub.stripePriceId &&
//     userSub.stripeCurrentPeriodEnd?.getTime()! + DAY_IN_MS > Date.now();

//   return !!isValid;
// };

import { auth } from "@clerk/nextjs";
import prismadb from "./prismadb";

const DAY_IN_MS = 86_400_000;

export const checkSub = async (): Promise<boolean> => {
  try {
    const { userId } = auth();

    if (!userId) return false;

    const userSub = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
      select: {
        stripeCustomerId: true,
        stripeCurrentPeriodEnd: true,
        stripeSubscriptionId: true,
        stripePriceId: true,
      },
    });

    if (!userSub) return false;

    const { stripePriceId, stripeCurrentPeriodEnd } = userSub;

    if (!stripePriceId || !stripeCurrentPeriodEnd) return false;

    const isValid =
      stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now();

    return isValid;
  } catch (error) {
    console.error("Error checking subscription:", error);
    return false;
  }
};
