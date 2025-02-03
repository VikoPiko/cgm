import prisma from "@/lib/prisma"

interface Bank
{
    accountId: string,
    bankId: string,
    accessToken: string,
    fundingSourceUrl: string,
    shareableId: string,
    userId: string
}

export async function createBank(data: Bank)
{
    try {
        const response = await fetch("/api/banks", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        if(!response.ok){
            throw new Error("Failed to create Bank")
        }

        const bank = await response.json()
        return bank
    } catch (error) {
        console.error("Error creating a bank: ", error);
        throw error;
    }
}

