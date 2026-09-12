import User from "../database/schema.js";

export async function addThought(req, res) {
    try {
        const userId = req.user.userId;

        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: "Content is required" });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            {
                $push: {
                    thoughts: {
                        content
                    }
                }
            },
            { returnDocument: "after" });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        return res.status(201).json({
            message: "Thought added successfully"
        })

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Something went wrong"
        })
    }
}

export async function pinThought(req, res) {
  try {
    const { thoughtId } = req.params;
    const { pinned } = req.body;

    const user = await User.findOneAndUpdate(
      {
        _id: req.user.userId,
        "thoughts._id": thoughtId,
      },
      {
        $set: {
          "thoughts.$.pinned": pinned,
          "thoughts.$.updatedAt": new Date(),
        },
      },
      {
        returnDocument: "after",
      }
    );

    if (!user) {
      return res.status(404).json({
        message: "Thought not found",
      });
    }

    return res.status(200).json({
      message: pinned
        ? "Thought pinned successfully"
        : "Thought unpinned successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};
