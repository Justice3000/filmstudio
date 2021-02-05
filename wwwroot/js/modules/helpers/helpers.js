import * as var_strg from "../helpers/var_storage.js";

export function check_if_same(first, second) {
  if (first == second) {
    return true;
  } else {
    return false;
  }
}

export function delete_all_context_in_page(divID) {
  document.getElementById(divID).innerHTML = "";
}

export function take_login_pain_away(email, password) {
  document.getElementById("myModal").style.display = "none";
  var_strg.email_login_input.value = email;
  var_strg.password_login_input.value = password;
}

export function clear_info_window() {
  document.getElementById("info_window").innerHTML = "";
}

export function log_out() {
  document.getElementById("log_me_out").onclick = function () {
    localStorage.clear();
    location.reload();
    return alert("Logged out!");
  };
}
