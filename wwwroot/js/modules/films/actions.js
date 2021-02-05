import FilmStudio_Actions from "../filmstudios/actions.js";
import LandingPage from "../pages/land.js";

export default class Film_Actions {
  constructor() {
    this.URL = "/api/v1/Films";
  }

  async CreateFilm() {
    let lp = new LandingPage();
    document.getElementById("myModal").style.display = "block";
    lp.ModalRegister("admin_create_film_button", "myModal");

    let button = document.getElementById("button_admin_create_film");
    let token = localStorage.getItem("SFF_token");
    let url = this.URL;

    button.onclick = function () {
      SendCreateRequest(token, url);
    };

    async function SendCreateRequest(token, url) {
      let form = document.getElementById("film_creation_form").elements;

      let formbody = {
        name: form[0].value,
        director: form[1].value,
        country: form[2].value,
        language: form[3].value,
        releaseDate: form[4].value,
        runtime: parseFloat(form[5].value),
        infoLink: form[6].value,
        quantityAllowed: parseFloat(form[7].value),
      };

      return fetch(url, {
        method: "POST",
        body: JSON.stringify(formbody),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then(function (data) {
          if (data.message != null) {
            return alert(data.message);
          }
          if (data.errors) {
            return alert("Please fill all the fields");
          }

          console.log("Film Creation suceeded");

          alert("Film Creation suceeded");
          document.getElementById("myModal").style.display = "none";

          let form = document.getElementById("film_creation_form").elements;
          for (let i = 0; i < form.length; i++) {
            form[i].value = "";
          }
        })
        .catch((er) => console.log(er));
    }
  }

  async SearchFilm() {
    let lp = new LandingPage();
    document.getElementById("modal_search").style.display = "block";

    lp.ModalRegister("admin_search_film_button", "modal_search");

    let button = document.getElementById("film_search_input_button");
    let token = localStorage.getItem("SFF_token");
    let url = this.URL;

    button.onclick = function () {
      SendFindFilmRequest(token, url);
    };

    async function SendFindFilmRequest(token, url) {
      let filmName = document.getElementById("film_search_input");

      if (!filmName.value) {
        return null;
      }

      return fetch(url + "/" + filmName.value, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then(function (data) {
          let filmresult = document.getElementById("film_found_result");
          if (filmresult != null) {
            filmresult.innerHTML = "";
          }

          if (data.status == 404) {
            return alert(" Film is not Found");
          }
          if (data.name == undefined) {
            return null;
          }

          document
            .getElementById("film_search_input")
            .insertAdjacentHTML(
              "afterend",
              '<div id="film_found_result">' +
                '<button id="edit_found_film" class="button special">Edit</button>' +
                "<p>Title: " +
                data.name +
                "</p>" +
                "<p>Directed by: " +
                data.director +
                "</p>" +
                "<p>Country of orgin: " +
                data.country +
                "</p>" +
                "<p>Language: " +
                data.language +
                "</p>" +
                "<p>Release Date: " +
                data.releaseDate +
                "</p>" +
                "<p>Runtime: " +
                data.runtime +
                "</p>" +
                '<p>Link: <a href="' +
                data.infoLink +
                '" target="_blank">here</a></p>' +
                "<p>Quantity permitted: " +
                data.quantityAllowed +
                "</p>" +
                "<p>Currently used: " +
                data.quantityInUse +
                "</p>" +
                "<p>Currently left: " +
                data.quantityLeft +
                "</p>" +
                "</div>"
            );

          let film_name = data.name;

          document.getElementById("edit_found_film").onclick = function () {
            let film = new Film_Actions();
            film.EditFilm(film_name);
          };
        })
        .catch((er) => console.log(er));
    }
  }

  async ListAllFilms() {
    let lp = new LandingPage();
    document.getElementById("modal_all_films").style.display = "block";
    lp.ModalRegister("admin_list_all_film_button", "modal_all_films");

    document.getElementById("film_list_modal_body").innerHTML = "";

    let token = localStorage.getItem("SFF_token");
    let url = this.URL;

    let checkbox = document.getElementById("checkbox_filter_available");

    let chk_bool = true;

    GetAllFilmsList(token, url, chk_bool);

    async function GetAllFilmsList(token, url, chk_bool) {
      let query;
      if (chk_bool) {
        query = "?showInStock=true";
      } else {
        query = "";
      }

      return fetch(url + query, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      })
        .then((res) => res.json())
        .then(function (data) {
          let dataGoesHere = document.getElementById("data_goes_here");
          if (dataGoesHere != null) {
            dataGoesHere.innerHTML = "";
          }

          if (data == null) {
            return alert("No data found");
          }

          for (let i = 0; i < data.length; i++) {
            document.getElementById("film_list_modal_body").insertAdjacentHTML(
              "beforeend",

              '<button class="accordion">' +
                data[i].name +
                "</button>" +
                '<div class="panel">' +
                "<p>Directed by: " +
                data[i].director +
                "</p>" +
                "<p>Country of orgin: " +
                data[i].country +
                "</p>" +
                "<p>Language: " +
                data[i].language +
                "</p>" +
                "<p>Release Date: " +
                data[i].releaseDate +
                "</p>" +
                "<p>Runtime: " +
                data[i].runtime +
                "</p>" +
                '<p>Link: <a href="' +
                data[i].infoLink +
                '" target="_blank">here</a></p>' +
                "<p>Quantity permitted: " +
                data[i].quantityAllowed +
                "</p>" +
                "<p>Currently used: " +
                data[i].quantityInUse +
                "</p>" +
                "<p>Currently left: " +
                data[i].quantityLeft +
                "</p>" +
                "</div>"
            );
          }
          let lp = new LandingPage();
          lp.Accordion();
        })
        .catch((er) => console.log(er));
    }

    checkbox.onchange = function () {
      if (chk_bool) {
        chk_bool = false;
      } else {
        chk_bool = true;
      }

      document.getElementById("film_list_modal_body").innerHTML = "";
      GetAllFilmsList(token, url, chk_bool);
    };
  }

  async FilmListForStudio() {
    let url = this.URL;
    let token = localStorage.getItem("SFF_token");

    return fetch(url + "?showInStock=true", {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then(function (data) {
        return data;
      })
      .catch((error) => console.log(error));
  }

  async EditFilm(film_name) {
    let token = localStorage.getItem("SFF_token");
    let url = this.URL;

    fetch(url + "/" + film_name, {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then(function (data) {
        let filmresult = document.getElementById("film_found_result");
        if (filmresult != null) {
          filmresult.innerHTML = "";
        }

        if (data.status == 404) {
          return alert(" Film is not Found");
        }

        if (data.name == undefined) {
          return null;
        }

        document.getElementById("film_found_result").insertAdjacentHTML(
          "beforeend",

          '<form id="edit_film_form">' +
            '<label for="name_edit_film_admin">Film Name</label><br>' +
            '<input id="name_edit_film_admin" value="' +
            data.name +
            '"> ' +
            '<label for="director_edit_film_admin">Director</label><br>' +
            '<input id="director_edit_film_admin" value="' +
            data.director +
            '"> ' +
            '<label for="country_edit_film_admin">Country</label><br>' +
            '<input id="country_edit_film_admin" value="' +
            data.country +
            '"> ' +
            '<label for="language_edit_film_admin">Language</label><br>' +
            '<input id="language_edit_film_admin" value="' +
            data.language +
            '"> ' +
            '<label for="releaseDate_edit_film_admin">Release Date</label><br>' +
            '<input id="releaseDate_edit_film_admin" value="' +
            data.releaseDate +
            '"> ' +
            '<label for="runtime_edit_film_admin">Runtime</label><br>' +
            '<input id="runtime_edit_film_admin" value="' +
            data.runtime +
            '"> ' +
            '<label for="infolink_edit_film_admin">URL link</label><br>' +
            '<input id="infolink_edit_film_admin" value="' +
            data.infoLink +
            '"> ' +
            '<label for="qt_edit_film_admin">Quantity allowed</label><br>' +
            '<input id="qt_edit_film_admin" value="' +
            data.quantityAllowed +
            '">' +
            "</form>" +
            '<button class="button special" id="submit_edit_film_admin">Update</button>'
        );

        document.getElementById(
          "submit_edit_film_admin"
        ).onclick = function () {
          PUT_updated_form(url);
        };

        async function PUT_updated_form(url) {
          let update_form = document.getElementById("edit_film_form").elements;

          let form_body = {
            name: update_form[0].value,
            director: update_form[1].value,
            country: update_form[2].value,
            language: update_form[3].value,
            releaseDate: update_form[4].value,
            runtime: parseFloat(update_form[5].value),
            infoLink: update_form[6].value,
            quantityAllowed: parseFloat(update_form[7].value),
          };
          return fetch(url + "/" + update_form[0].value, {
            method: "PUT",
            body: JSON.stringify(form_body),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
              Authorization: "Bearer " + localStorage.getItem("SFF_token"),
            },
          })
            .then((responsio) => responsio.json())
            .then(function (data) {
              if (data.status == 400) {
                return alert(
                  "Please fill all the fields and send only updated object"
                );
              }
              return alert("UPDATED!");
            })
            .catch((error) => console.log(error));
        }
      });
  }

  async LeaveFilm(name) {
    let token = localStorage.getItem("SFF_token");
    let url = this.URL;
    let studio = new FilmStudio_Actions();
    studio.getUserStudios().then(function (data) {
      let body = {
        movieName: name,
        studio: data[0].name,
      };

      fetch(url + "/LeaveMovie", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      })
        .then(function (res) {
          if (res.status == 200) {
            document.getElementById(
              "user_studio_list_taken_films_modal"
            ).style.display = "none";
            return alert("The film is no longer in your possesion");
          }
          return res.json();
        })
        .then(function (data) {
          if (data == undefined) {
            return null;
          }
        })
        .catch((error) => console.log(error));
    });
  }

  async TakeFilm(name) {
    let token = localStorage.getItem("SFF_token");
    let url = this.URL;
    let studio = new FilmStudio_Actions();
    studio.getUserStudios().then(function (data) {
      let body = {
        movieName: name,
        studio: data[0].name,
      };

      fetch(url + "/TakeMovie", {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: "Bearer " + token,
        },
      })
        .then(function (res) {
          if (res.status == 200) {
            //document.getElementById('user_studio_list_taken_films_modal').style.display = "none";
            return alert("The film is now in your possesion");
          }

          if (res.status >= 400) {
            return alert("already in your possesion");
          }
          return res.json();
        })
        .then(function (data) {
          if (data == undefined) {
            return null;
          }
        })
        .catch((error) => console.log(error));
    });
  }
}
