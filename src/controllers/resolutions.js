import User from "../database/schema.js";

export default async function addResolution(req, res) {
  try {
    const userId = req.user.userId;
    const { items, letter } = req.body;

    const year = new Date().getFullYear();

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        message: "At least one Resolution is required",
      });
    }

    if (items.length > 7) {
      return res.status(400).json({
        message: "You can have a maximum of 7 Resolutions",
      });
    }

    if (items.some((item) => typeof item !== "string" || !item.trim())) {
      return res.status(400).json({
        message: "Each Resolution must be a non-empty string",
      });
    }

    if (!letter || !letter.trim()) {
      return res.status(400).json({
        message: "You need a letter to seal your Resolutions",
      });
    }

    const existingUser = await User.findOne({
      _id: userId,
      "resolutions.year": year,
    });

    if (existingUser) {
      return res.status(409).json({
        message: `You already have Resolutions for ${year}`,
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          resolutions: {
            year,
            items: items.map((item) => item.trim()),
            letter: letter.trim(),
          },
        },
      },
      { returnDocument: "after" }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(201).json({
      message: "Resolutions added successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
