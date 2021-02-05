import Film_Actions from "../films/actions.js";
import * as var_strg from "../helpers/var_storage.js";
import StudioRegModel from "../studios/studio_reg_model.js";
import LandingPage from "../pages/land.js";

export default class FilmStudio_Actions {
  constructor() {
    this.URL = "/api/v1/FilmStudios";
  }

  async getUserStudios() {
    return fetch(this.URL + "/" + "myStudios", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("SFF_token"),
      },
    })
      .then((response) => response.json())
      .then(function (data) {
        return data;
      })
      .catch((error) => console.log(error));
  }

  async RegisterStudioRequest(studio_reg_model, username, role) {
    return fetch(this.URL, {
      method: "POST",
      body: JSON.stringify(studio_reg_model),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + localStorage.getItem("SFF_token"),
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        if (data.errors) {
          return alert("PLease check if your entered data is valid");
        }

        if (data.status == 400) {
          return alert("This studio already exists");
        }

        console.log("Studio creation succeed");
        alert("Studio created!");
        document.getElementById("land_content").innerHTML = "";
        let lp = new LandingPage();
        return lp.LoggedInView(username, role);
      })
      .catch((er) => console.log(er));
  }

  async CreateStudio(username, role) {
    let container = document.getElementById("land_content");
    container.insertAdjacentHTML("beforeend", var_strg.create_studio_HTML);

    document.getElementById("button_user_create_studio").onclick = function () {
      let form = document.getElementById("studio_creation_form").elements;

      let model = new StudioRegModel(
        form[0].value,
        form[1].value,
        form[2].value
      );

      let run = new FilmStudio_Actions();

      run.RegisterStudioRequest(model, username, role);
    };
  }

  async LeaveFilm(value) {
    let filmAction = new Film_Actions();
    filmAction.LeaveFilm(value);
  }
}
