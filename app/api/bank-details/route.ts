// src/pages/api/bank-details.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { plaidClient } from '@/lib/plaid'; // Assuming you have Plaid client setup

export default async function POST(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { accessToken } = req.body;

  try {
    const response = await plaidClient.accountsGet({ access_token: accessToken });
    const accounts = response.data.accounts.map((account) => ({
      name: account.name,
      official_name: account.official_name,
      subtype: account.subtype,
    }));

    res.status(200).json({ accounts });
  } catch (error) {
    console.error('Error fetching account details:', error);
    res.status(500).json({ error: 'Failed to fetch account details' });
  }
}
