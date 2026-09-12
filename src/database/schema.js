import mongoose, { Schema } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      minLength: 5,
      required: true,
      trim: true,
      unique: true,
    },

    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      trim: true,
      required: true,
      minLength: 8,
    },

    gender: {
      type: String,
      enum: ["male", "female"],
      required: true,
    },

    image: {
      type: String,
      default: null,
    },

    resolutions: [
      {
        year: {
          type: Number,
          required: true,
        },

        items: {
          type: [String],
          required: true,
        },

        letter: {
          type: String,
          required: true,
          trim: true,
        },

        deadline: {
          type: Date,
        },
      },
    ],

    Tasks: [
      {
        year: {
          type: Number,
          required: true,
        },

        week: {
          type: Number,
          required: true,
        },

        tasks: [
          {
            title: {
              type: String,
              trim: true,
            },

            description: {
              type: String,
              trim: true,
            },

            resolutionIndex: {
              type: Number,
              required: true,
            },

            completed: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],

    thoughts: [
      {
        content: {
          type: String,
          required: true,
          trim: true,
        },

        dateCreated: {
          type: Date,
          default: Date.now,
        },

        updatedAt: {
          type: Date,
        },

        pinned: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", UserSchema);

export default User;
