import LandingPage from "../pages/land.js";

export default class Studio_Actions {
  constructor() {
    this.URL = "/api/v1/FilmStudios";
  }

  async ListAllFilmStudios() {
    let lp = new LandingPage();

    document.getElementById("modal_all_filmstudios").style.display = "block";

    lp.ModalRegister(
      "admin_list_all_filmstudios_button",
      "modal_all_filmstudios"
    );

    let token = localStorage.getItem("SFF_token");
    let url = this.URL;

    GetAllFilmStudiosList(token, url);

    async function GetAllFilmStudiosList(token, url) {
      return fetch(url, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then(function (data) {
          let list_goes_here = document.getElementById(
            "filmstudio_list_modal_body"
          );

          if (list_goes_here != null) {
            list_goes_here.innerHTML = "";
          }
          if (data.length == 0) {
            return alert("no studios found");
          }

          for (let i = 0; i < data.length; i++) {
            list_goes_here.insertAdjacentHTML(
              "beforeend",

              '<button class="accordion">(・' +
                data[i].filmsInPossesion.length +
                "・) " +
                data[i].name +
                "</button>" +
                '<div class="panel">' +
                "<p>Studio Moderator: " +
                data[i].moderator +
                "</p>" +
                "<p>Studio Moderator's E-mail: <a href = \"mailto:" +
                data[i].moderatorEmail +
                '">Send Email</a></p>' +
                "<p>Studio Moderator's Phone Number: " +
                data[i].moderatorPhoneNumber +
                "</p>" +
                "<p>Studio Location: " +
                data[i].place +
                "</p>" +
                "<p>Films in Possesion: " +
                data[i].filmsInPossesion.length +
                "</p>" +
                '<ul id="' +
                i +
                '"> </ul>' +
                "</div>"
            );

            for (let x = 0; x < data[i].filmsInPossesion.length; x++) {
              document.getElementById(i).innerHTML +=
                "<li>" + data[i].filmsInPossesion[x].name + "</li>";
            }
          }

          let lp = new LandingPage();
          lp.Accordion();
        })
        .catch((error) => console.log(error));
    }
  }

  async SearchForFilmStudio() {
    let lp = new LandingPage();

    document.getElementById("admin_modal_search_studio").style.display =
      "block";
    lp.ModalRegister(
      "admin_search_for_filmstudio_button",
      "admin_modal_search_studio"
    );

    let button = document.getElementById("admin_studio_search_input_button");
    let url = this.URL;

    button.onclick = function () {
      SendFindStudioRequest(url);
    };

    async function SendFindStudioRequest(url) {
      let input = document.getElementById("admin_studio_search_input");
      if (!input.value) {
        return null;
      }

      return fetch(url + "/" + input.value, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + localStorage.getItem("SFF_token"),
        },
      })
        .then((res) => res.json())
        .then(function (data) {
          let studioresult = document.getElementById(
            "admin_studio_search_results"
          );
          if (studioresult != null) {
            studioresult.innerHTML = "";
          }

          if (data.status == 404) {
            return alert("Studio was not found");
          }
          if (data.name == undefined) {
            return null;
          }

          document
            .getElementById("admin_studio_search_results")
            .insertAdjacentHTML(
              "beforeend",

              '<button class="accordion">(・' +
                data.filmsInPossesion.length +
                "・) " +
                data.name +
                "</button>" +
                '<div style="display:block" class="panel">' +
                "<p>Studio Moderator: " +
                data.moderator +
                "</p>" +
                "<p>Studio Moderator's E-mail: <a href = \"mailto:" +
                data.moderatorEmail +
                '">Send Email</a></p>' +
                "<p>Studio Moderator's Phone Number: " +
                data.moderatorPhoneNumber +
                "</p>" +
                "<p>Studio Location: " +
                data.place +
                "</p>" +
                "<p>Films in Possesion: " +
                data.filmsInPossesion.length +
                "</p>" +
                '<ul id="found_studio_possesion_list"> </ul>' +
                "</div>"
            );

          for (let x = 0; x < data.filmsInPossesion.length; x++) {
            document.getElementById("found_studio_possesion_list").innerHTML +=
              "<li>" + data.filmsInPossesion[x].name + "</li>";
          }

          //
        })
        .catch((error) => console.log(error));
    }
  }
}
