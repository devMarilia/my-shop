import Stripe from 'stripe';

interface AppInfo {
  name: string;
}

export const stripe = new Stripe( process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-11-15',
    appInfo: {
      name: 'My Shop'
    } as AppInfo
  }
);