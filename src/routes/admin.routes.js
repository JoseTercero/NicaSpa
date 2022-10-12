import { Router } from "express";
import { isAdmin } from "../helpers/auth";
import {
  addTreatment,
  addUser,
  deleteTreatment,
  deleteUser,
  renderTreatmentEdit,
  renderTreatmentForm,
  renderTreatmentsList,
  renderUserEdit,
  renderUserForm,
  renderUserList,
  updateTreatent,
  updateUser,
} from "../controllers/admin.controllers";

const router = Router();

router.get("/admin/usersList", isAdmin, renderUserList);

router.get("/admin/users/addForm", isAdmin, renderUserForm);

router.post("/admin/user/add", isAdmin, addUser);

router.get("/admin/users/:id/edit", isAdmin, renderUserEdit);

router.put("/admin/user-edit/:id", isAdmin, updateUser);

//Otra Opcion para actualizar
// router.put(
//   "/admin/user-edit/:id",
//   body("name").isLength({ min: 5 }),
//   body("email").isEmail,
//   isAdmin,
//   updateUser
// );

router.get("/admin/users/:id/delete", isAdmin, deleteUser);

router.get("/admin/treatmentsList", isAdmin, renderTreatmentsList);

router.get("/admin/treatment/addForm", isAdmin, renderTreatmentForm);

router.post("/admin/treatment/add", isAdmin, addTreatment);

router.get("/admin/treatments/:id/edit", isAdmin, renderTreatmentEdit);

router.put("/admin/treatment-edit/:id", isAdmin, updateTreatent);

router.get("/admin/treatments/:id/delete", isAdmin, deleteTreatment);

export default router;
