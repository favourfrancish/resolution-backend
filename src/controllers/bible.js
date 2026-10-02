export async function getBibleBooks(req, res) {
  try {
    const { version } = req.params;

    let bibleId;

    if (version === "KJV") {
      bibleId = process.env.KJV_BIBLE_ID;
    }

    if (version === "NIV") {
      bibleId = process.env.NIV_BIBLE_ID;
    }

    if (!bibleId) {
      return res.status(400).json({
        message: "Invalid Bible version",
      });
    }

    const response = await fetch(
      `https://rest.api.bible/v1/bibles/${bibleId}/books`,
      {
        headers: {
          "api-key": process.env.BIBLE_API_KEY,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching Bible books",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

export async function getBookChapters(req, res) {
  try {
    const { version, bookId } = req.params;

    let bibleId;

    if (version === "KJV") {
      bibleId = process.env.KJV_BIBLE_ID;
    }

    if (version === "NIV") {
      bibleId = process.env.NIV_BIBLE_ID;
    }

    if (!bibleId) {
      return res.status(400).json({
        message: "Invalid Bible version",
      });
    }

    const response = await fetch(
      `https://rest.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`,
      {
        headers: {
          "api-key": process.env.BIBLE_API_KEY,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching Bible chapters",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}


export async function getBookVerses(req, res) {
  try {
    const { version, bookId, chapterId } = req.params;

    let bibleId;

    if (version === "KJV") {
      bibleId = process.env.KJV_BIBLE_ID;
    }

    if (version === "NIV") {
      bibleId = process.env.NIV_BIBLE_ID;
    }

    if (!bibleId) {
      return res.status(400).json({
        message: "Invalid Bible version",
      });
    }

    if (!chapterId) {
      return res.status(400).json({
        message: "Invalid Bible chapter",
      });
    }

    const response = await fetch(
      `https://rest.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters/{chapterId}/verses`,
      {
        headers: {
          "api-key": process.env.BIBLE_API_KEY,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching Bible chapters",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}

export async function getVerse(req, res) {
  try {
    const { version, bookId, chapterId, verseId } = req.params;

    let bibleId;

    if (version === "KJV") {
      bibleId = process.env.KJV_BIBLE_ID;
    }

    if (version === "NIV") {
      bibleId = process.env.NIV_BIBLE_ID;
    }

    if (!bibleId) {
      return res.status(400).json({
        message: "Invalid Bible version",
      });
    }

    if (!chapterId) {
      return res.status(400).json({
        message: "Invalid Bible chapter",
      });
    }

    if (!verseId) {
      return res.status(400).json({
        message: "Invalid Bible verse"
      });
    }

    const response = await fetch(
      `https://rest.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters/{chapterId}/verses/{verseId}`,
      {
        headers: {
          "api-key": process.env.BIBLE_API_KEY,
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json(data);
    }

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({
      message: "Error fetching Bible chapters",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
}





