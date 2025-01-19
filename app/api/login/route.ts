import { NextApiRequest, NextApiResponse } from "next";
import { login } from "@/lib/actions/actions";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const formData = req.body;
      const result = await login({}, formData); // Assuming login function will handle user validation and session creation.

      if (result.errors) {
        return res.status(400).json(result.errors);
      }

      return res.status(200).json({ message: "Login successful" }); // Send success response.
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}

