import { NextResponse } from "next/server";
import axios from "axios";

// External server URL (configure in environment variables)
const externalServerUrl = process.env.SERVER_URL;

export async function POST(req: Request) {
  try {
    if (!externalServerUrl) {
      return NextResponse.json(
        { error: "External server URL not configured" },
        { status: 500 }
      );
    }

    // Parse the request body from the client
    const body = await req.json();
    const { items } = body;

    // Forward the request to the external server
    const response = await axios.post(`${externalServerUrl}/recipes`, {
      items,
    });

    // Return the response from the external server
    return NextResponse.json(response.data, { status: response.status });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("Error in API route:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch recipes", details: error.message },
      { status: 500 }
    );
  }
}
