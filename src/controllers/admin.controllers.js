import User from "../models/User";
import Treatment from "../models/treatment";
import cloudinary from "cloudinary";
import fs from "fs-extra";
import { CLOUD_NAME, API_KEY, API_SECRET } from "../config";

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: API_KEY,
  api_secret: API_SECRET,
});

export const renderUserList = async (req, res) => {
  const users = await User.find().lean();
  res.render("admin/usersList", { users: users });
};

export const renderUserForm = (req, res) => res.render("admin/userForm");

export const addUser = async (req, res) => {
  const errors = [];

  const { name, email, role, password, confirm_password } = req.body;

  if (name.length <= 0) {
    errors.push({ text: "A name Is Required" });
  }
  if (email.length <= 0) {
    errors.push({ text: "An Email Is Required" });
  }
  if (role.length <= 0) {
    errors.push({ text: "A Role Is Required" });
  }
  if (password.length <= 0) {
    errors.push({ text: "A Password Is Required" });
  }
  if (confirm_password.length <= 0) {
    errors.push({ text: "You Must Confirm The Password" });
  }
  if (errors.length > 0) {
    res.render("admin/userForm", {
      errors,
      name,
      email,
      role,
      password,
      confirm_password,
    });
  } else {
    const newUser = new User({ name, email, role, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_msg", "User added");
    res.redirect("/admin/usersList");
  }
};

export const renderUserEdit = async (req, res) => {
  try {
    const users = await User.findById(req.params.id).lean();
    res.render("admin/userEdit", users);
  } catch (error) {
    console.log(error);
  }
};

export const updateUser = async (req, res) => {
  const errors = [];
  const { name, email, role } = req.body;
  const users = await User.findById(req.params.id).lean();

  if (name.length <= 0) {
    errors.push(1);
  }
  if (email.length <= 0) {
    errors.push(1);
  }
  if (role.length <= 0) {
    errors.push(1);
  }
  if (errors.length > 0) {
    req.flash("error_msg", "Some Fields Were Empty");
    res.redirect("/admin/usersList");
  } else {
    await User.findByIdAndUpdate(req.params.id, { name, email, role });
    req.flash("success_msg", "User Updated");
    res.redirect("/admin/usersList");
  }
};

//Otra Opcion para actualizar
// export const updateUser = async (req, res) => {
//   const { name, email, role } = req.body;
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   await User.findByIdAndUpdate(req.params.id, { name, email, role });
//   req.flash("success_msg", "User Updated");
//   res.redirect("/admin/usersList");
// };

export const deleteUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "User Deleted");
  res.redirect("/admin/usersList");
};

export const renderTreatmentsList = async (req, res) => {
  const treatments = await Treatment.find().lean();
  res.render("admin/treatmentsList", { treatments: treatments });
};

export const renderTreatmentForm = (req, res) =>
  res.render("admin/treatmentForm");

export const addTreatment = async (req, res) => {
  const { name, description, price } = req.body;
  const result = await cloudinary.v2.uploader.upload(req.file.path);
  const newTreatment = new Treatment({
    name,
    description,
    price,
    image: result.url,
    imagepublic_id: result.public_id,
  });
  console.log(req.file);
  await fs.unlink(req.file.path);
  await newTreatment.save();
  req.flash("success_msg", "Treatment added");
  res.redirect("/admin/treatmentsList");
};

export const renderTreatmentEdit = async (req, res) => {
  const treatments = await Treatment.findById(req.params.id).lean();
  res.render("admin/treatmentEdit", treatments);
};

export const updateTreatent = async (req, res) => {
  const { name, description, price } = req.body;

  await Treatment.findByIdAndUpdate(req.params.id, {
    name,
    description,
    price,
  });
  req.flash("success_msg", "Treatment Update");
  res.redirect("/admin/treatmentsList");
};

export const deleteTreatment = async (req, res) => {
  await Treatment.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Treatment Deleted");
  res.redirect("/admin/treatmentsList");
};
