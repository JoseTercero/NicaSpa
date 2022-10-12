import User from "../models/User.js";
import passport from "passport";
import Otp from "../models/otp.js";
import { Auth } from "two-step-auth";

// We render the signup form
export const renderSignUpForm = (req, res) => res.render("auth/signup");

// We validate and register an user into the data base
export const signup = async (req, res) => {
  // We are setting this array to put in the different errors
  const errors = [];

  // We are retriving the data coming through the signuo for
  const { name, email, password, confirm_password } = req.body;

  // We are just validating the data and pushing text into errors array to render it later
  if (name.length <= 0) {
    errors.push({ text: "A name is required" });
  }
  if (email.length <= 0) {
    errors.push({ text: "An email is required" });
  }
  if (password != confirm_password) {
    errors.push({ text: "Password does not match" });
  }
  if (password.length <= 4) {
    errors.push({ text: "Password must be greater than 4 characters" });
  }

  //if errors, we render them
  if (errors.length > 0) {
    res.render("auth/signup", {
      errors,
      name,
      email,
      password,
      password,
      confirm_password,
    });

    //if not, we try to save the user
  } else {
    // Looking for an existing email in database
    const emailUser = await User.findOne({ email: email });

    //If exists, we return an error
    if (emailUser) {
      req.flash("error_msg", "The email is being used for another user");
      res.redirect("/auth/signup");
      return;
    }

    // If not, we save the user into the database

    // // OTP generator
    const otpResult = await Auth(email, "NicaSpa");

    // Saving User
    const newUser = new User({ name, email, password });

    // inicialatien Otp
    const newUserOtp = new Otp({ otp: otpResult.OTP, otpEmail: email });

    // Encrypting Password
    newUser.password = await newUser.encryptPassword(password);

    // Saving OTP
    await newUserOtp.save();

    // Saving USer
    await newUser.save();

    // We use the erros array jut to not create a new one
    errors.push({
      text: "We have sent you a code verification, enter it to activate your account",
    });
    res.render("auth/otpAuth", { errors, email });
  }
};

// We render the signIn Form
export const renderSignInForm = (req, res) => res.render("auth/signin");

// We render the OtpAuth Form
export const renderOtpAuth = (req, res) => {
  req.flash("success_msg", "Enter your email and the code you got");
  res.render("auth/otpAuth");
};

// We activate the account
export const activateAccount = async (req, res) => {
  // We got the data from the OtpAuth form
  const { email, verificationCode } = req.body;

  // We go into the database to see if any equals to the data provided
  const otps = await Otp.findOne({ otpEmail: email });

  // We get the user from the collectin so update the virified field from false to true
  const user = await User.findOne({ email: email });

  // If opt exists
  if (otps) {
    // We validate they are equal
    if (otps.otpEmail === email && otps.otp == verificationCode) {
      // If so, we activate user's accunt
      await User.findByIdAndUpdate(user, { verified: true });

      //  We delete the used otps
      await Otp.findByIdAndDelete(otps);

      req.flash("success_msg", "Account Activated");

      res.redirect("/auth/signin");

      return;
    }
  }

  // If not, we render an error
  req.flash(
    "error_msg",
    "Sorry, we could not find this code our email. Try again, or register"
  );

  res.redirect("/auth/otpAuth");
};

// We signIn user validating its data with passport method
export const signin = passport.authenticate("local", {
  failureFlash: true,
  successFlash: true,
  successFlash: "Success",
  successRedirect: "/",
  failureRedirect: "/auth/signin",
});

// We log out user
export const logout = async (req, res) => {
  await req.logout((err) => {
    if (err) return next(err);
    req.flash("success_msg", "You are logged out");
    res.redirect("/");
  });
};
