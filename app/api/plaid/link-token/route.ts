// File: /pages/api/plaid/link-token.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { plaidClient } from '@/lib/plaid';
import { Products, CountryCode } from 'plaid';

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await plaidClient.linkTokenCreate({
      user: { client_user_id: 'unique-user-id' },
      client_name: 'Your App Name',
      products: ["auth"] as Products[],
      country_codes: ["US"] as CountryCode[],
      language: 'en',
    });

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Unable to create link token' });
  }
}