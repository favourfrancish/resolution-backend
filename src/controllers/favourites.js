import User from "../database/schema.js";

export default async function addToFavourites(req, res) {
  try {
    const userId = req.user.userId;

    const { title, description, author, image, type } = req.body;

    if (!title || !description || !author || !image || !type) {
      return res.status(400).json({
        message: "Complete book information is required",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const existingBook = user.favouriteBooks.some(
      (book) => book.title === title && book.author === author,
    );

    if (existingBook) {
      return res.status(409).json({
        message: "Book is already in favourites",
      });
    }

    user.favouriteBooks.push({
      title,
      description,
      author,
      image,
      type
    });

    await user.save();

    return res.status(201).json({
      message: "Favourite book added successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
