import mongoose, { Schema } from "mongoose";

const birdSchema = new Schema(
  {
    commonName: {
      type: String,
      required: true,
    },
    scientificName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    habitat: {
      type: [String], // Array of strings
      required: true,
    },
    appearance: {
      size: {
        type: String,
        enum: ["Small", "Medium", "Large"], // Enum for predefined size options
        required: false, // Make size optional
      },
      color: {
        type: [String], // Array of strings
        required: false, // Make color optional
        validate: {
          validator: function (value: string[]) {
            return value.length > 0; // Ensure there's at least one color if provided
          },
          message: "At least one color must be specified.",
        },
      },
    },
    photos: {
      type: [String], // Array of strings for photo URLs
      required: false,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Bird = mongoose.model("Bird", birdSchema);

// const bird = {
//   commonName: "American Robin", // Make sure commonName is included
//   scientificName: "Turdus migratorius", // Make sure scientificName is included
//   description: "A migratory songbird of the thrush family.", // Make sure description is included
//   habitat: ["Forests", "Gardens", "Parks"], // Habitat is an array of strings
//   appearance: {
//     size: "Medium", // Make sure size is included
//     color: ["Brown", "Orange", "White"], // Make sure color array has at least one value
//   },
//   photos: ["https://example.com/robin1.jpg", "https://example.com/robin2.jpg"], // Optional photos array
// };

// Bird.create(bird)
//   .then((createdBird) => {
//     console.log("Bird created successfully:", createdBird);
//   })
//   .catch((error) => {
//     console.error("Error creating bird:", error);
//   });

export default Bird;
