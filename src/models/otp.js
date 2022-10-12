import { model, Schema } from "mongoose";

const OtpSchema = Schema({
  otp: { type: Number },
  otpEmail: { type: String, required: true, trim: true },
});

// OtpSchema.methods.generateOtp = async (email) => {
//   return await Auth(email, "NicaSpa");
// };

export default model("Otp", OtpSchema);
