import userModel from '../models/userModel.js';
import FormData from 'form-data';
import axios from 'axios';

export const generateImage = async (req, res) => {
  try {
  const { prompt } = req.body;
const userId = req.user?.id; // from middleware

if (!userId || !prompt) {
  return res.json({ success: false, message: "Missing Details" });
}

// 🔥 Fetch fresh user from DB
const user = await userModel.findById(userId);
if (!user) {
  return res.json({ success: false, message: "User not found" });
}

if (user.creditBalance <= 0) {
  return res.json({
    success: false,
    message: "Low on credits - Please buy credit",
    creditBalance: user.creditBalance,
  });
}


    // Prepare form data
    const formData = new FormData();
    formData.append("prompt", prompt);

    // Send request to ClipDrop API
    const { data } = await axios.post(
      'https://clipdrop-api.co/text-to-image/v1',
      formData,
      {
        headers: {
          'x-api-key': process.env.CLIPDROP_APIKEY,
          ...formData.getHeaders(), // Important for multipart/form-data
        },
        responseType: "arraybuffer",
      }
    );

    // Convert image to base64
    const base64Image = Buffer.from(data, "binary").toString('base64');
    const resultImage = `data:image/png;base64,${base64Image}`;

    // Deduct credit and update user
   const currentCredits = Number(user.creditBalance);
const updatedCredits = isNaN(currentCredits) ? 0 : currentCredits - 1;

const updatedUser = await userModel.findByIdAndUpdate(
  user._id,
  { creditBalance: updatedCredits },
  { new: true } // ✅ returns the updated document
);



    // Send response
    res.json({
      success: true,
      message: "Image generated",
      creditBalance: updatedCredits,
      resultImage,
    });

  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
    res.status(500).json({
      success: false,
      message: "Something went wrong while generating the image",
      error: error.response?.data || error.message,
    });
  }
};
