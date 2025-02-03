import { NextRequest, NextResponse } from "next/server";
import { plaidClient } from "@/lib/plaid";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const { public_token } = await request.json();

    if (!public_token ) {
      return NextResponse.json(
        { error: "Missing public_token " },
        { status: 400 }
      );
    }

    // Exchange the public token for an access token
    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    //const itemId = exchangeResponse.data.item_id;

    // Store accessToken and itemId in your database

    return NextResponse.json({
      message: "Public token exchange complete",
      accessToken, // Normally, you should not return this in production
      //itemId,
    });
  } catch (error) {
    console.error("Error exchanging public token:", error);
    return NextResponse.json(
      { error: "Failed to exchange public token" },
      { status: 500 }
    );
  }
}

// app.post('/api/exchange_public_token', async function (
//   request,
//   response,
//   next,
// ) {
//   const publicToken = request.body.public_token;
//   try {
//     const response = await client.itemPublicTokenExchange({
//       public_token: publicToken,
//     });

//     // These values should be saved to a persistent database and
//     // associated with the currently signed-in user
//     const accessToken = response.data.access_token;
//     const itemID = response.data.item_id;

//     res.json({ public_token_exchange: 'complete' });
//   } catch (error) {
//     // handle error
//   }
// });