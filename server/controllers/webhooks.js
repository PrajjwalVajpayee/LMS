import { Webhook } from "svix";
import User from "../models/user.js";

export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET_KEY);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address, // ✅ Fixed
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.profile_image_url, // ✅ Use higher quality image
        };
        await User.create(userData);
        res.json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address, // ✅ Fixed
          name: `${data.first_name} ${data.last_name}`,
          imageUrl: data.profile_image_url, // ✅ Use higher quality image
        };
        await User.findByIdAndUpdate(data.id, userData);
        res.json({});
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.json({});
        break;
      }

      default:
        res.status(400).json({ success: false, message: "Unknown event type" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
