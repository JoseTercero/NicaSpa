import { Router } from "express";
import {
  renderSignUpForm,
  renderSignInForm,
  signup,
  signin,
  logout,
  renderOtpAuth,
  activateAccount,
} from "../controllers/auth.controllers";
import { renderAllOrdersForUser } from "../controllers/user.controllers";
import { isAuthenticated } from "../helpers/auth";
import { isUser } from "../helpers/auth";

const router = Router();

//Routes
router.get("/auth/signup", renderSignUpForm);

router.get("/auth/signin", renderSignInForm);

router.get("/auth/otpAuth", renderOtpAuth);

router.post("/auth/activateAccount", activateAccount);

router.post("/auth/signup", signup);

router.post("/auth/signin", signin);

router.get("/auth/logout", logout);

router.get("/client/orders", isUser, renderAllOrdersForUser);

// router.get("/auth/logout", (req, res) => {
//   req.logOut(() => {
//     res.redirect("/");
//     req.flash("success_msg", "You are logged out");
//   });
// });

export default router;
