import { check_if_same } from "./modules/helpers/helpers.js";
import * as var_strg from "./modules/helpers/var_storage.js";
import Actions from "./modules/users/actions.js";
import UserModel from "./modules/users/user_model.js";
import AuthModel from "./modules/users/auth_model.js";
import LandingPage from "./modules/pages/land.js";
import Film_Actions from "./modules/filmstudios/actions.js";

// first registration modal
let lp = new LandingPage();
lp.ModalRegister("register", "myModal");
document.getElementById("register").onclick = function () {
  document.getElementById("myModal").style.display = "block";
};

var_strg.button_reg_user.onclick = function () {
  if (
    check_if_same(
      var_strg.password_reg_input.value,
      var_strg.password_reg_input_repeat.value
    )
  ) {
    let model = new UserModel(
      var_strg.email_reg_input.value,
      var_strg.firstname_reg_input.value,
      var_strg.lastname_reg_input.value,
      var_strg.username_reg_input.value,
      var_strg.password_reg_input.value
    );

    let user = new Actions();
    user.registerUser(model);
  } else {
    {
      alert("Passwords don't match");
    }
  }
};

var_strg.button_reg_admin.onclick = function () {
  if (
    check_if_same(
      var_strg.password_reg_input.value,
      var_strg.password_reg_input_repeat.value
    )
  ) {
    let model = new UserModel(
      var_strg.email_reg_input.value,
      var_strg.firstname_reg_input.value,
      var_strg.lastname_reg_input.value,
      var_strg.username_reg_input.value,
      var_strg.password_reg_input.value
    );

    let admin = new Actions();
    admin.registerAdmin(model);
  } else {
    alert("Passwords don't match");
  }
};

var_strg.button_login.onclick = function () {
  localStorage.clear();

  if (
    var_strg.email_login_input.value !== "" &&
    var_strg.password_login_input.value !== ""
  ) {
    let sign_in_model = new AuthModel(
      var_strg.email_login_input.value,
      var_strg.password_login_input.value
    );

    let user = new Actions();
    user.authenticate(sign_in_model);
  }
};
