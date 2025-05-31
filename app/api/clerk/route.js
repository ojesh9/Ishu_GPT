// app/api/webhook/route.ts or similar
import { Webhook } from "svix";
import connectDB from "@/config/b"; // Ensure this connects to your MongoDB Atlas
import User from "@/models/user";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // ✅ Securely pull secret
  const wh = new Webhook(process.env.SIGNING_SECRET as string);

  // ✅ Get headers
  const headerPayload = headers();
  const svixHeaders = {
    "svix-id": headerPayload.get("svix-id") || "",
    "svix-timestamp": headerPayload.get("svix-timestamp") || "",
    "svix-signature": headerPayload.get("svix-signature") || "",
  };

  try {
    // ✅ Parse payload
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // ✅ Verify webhook signature
    const { data, type } = wh.verify(body, svixHeaders) as any;

    // ✅ Prepare user data
    const userData = {
      _id: data.id,
      email: data.email_addresses?.[0]?.email_address,
      name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
      image: data.image_url || "",
    };

    // ✅ Connect to MongoDB
    await connectDB();

    // ✅ Handle events
    switch (type) {
      case "user.created":
        await User.create(userData);
        break;

      case "user.updated":
        await User.findByIdAndUpdate(data.id, userData);
        break;

      case "user.deleted":
        await User.findByIdAndDelete(data.id);
        break;

      default:
        console.warn("Unhandled event type:", type);
        break;
    }

    return NextResponse.json({ message: "Webhook handled successfully" });
  } catch (err: any) {
    console.error("Webhook error:", err.message || err);
    return new NextResponse("Webhook handler failed", { status: 400 });
  }
}
