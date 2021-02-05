import Film_Actions from "../films/actions.js";
import { log_out } from "../helpers/helpers.js";
import * as var_strg from "../helpers/var_storage.js";
import Studio_Actions from "../studios/actions.js";
import FilmStudio_Actions from "../filmstudios/actions.js";

export default class LandingPage {
  ModalRegister(button_id, modal_id) {
    // Get the modal
    let modal = document.getElementById(modal_id),
      span_id = modal_id + "_close";
    let span = document.getElementById(span_id);

    //console.log(button_id);

    // Did break other events on same button, on click is a 0 sum game.
    // btn.onclick = function() {
    //   modal.style.display = "block";
    // }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function () {
      modal.style.display = "none";
    };

    // When the user clicks anywhere outside of the modal, close it. Breaks after a while.
    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  }

  LoggedInView(username, role) {
    document.body.insertAdjacentHTML(
      "afterbegin",
      '<div id=div_logout"><h1 class="logout">Welcome ' +
        username +
        '</h1><h3 class="logout"><a id="log_me_out" href="#">Log Out</a></h3></div><p>Your role here is described as:  ' +
        role +
        "</p>"
    );

    log_out();

    this.ViewPicker();
  }

  ViewPicker() {
    if (localStorage.getItem("SFF_role") == "admin") {
      this.LoggedInViewAdmin();
    }
    if (localStorage.getItem("SFF_role") == "studio") {
      this.LoggedInViewUser();
    }
  }

  LoggedInViewUser() {
    document
      .getElementsByTagName("p")[0]
      .insertAdjacentHTML("beforeend", var_strg.logged_in_basic_user_view);

    let land_content = document.getElementById("land_content");
    let film = new Film_Actions();
    let filmstudio = new FilmStudio_Actions();

    document.getElementById("button_my_studio").onclick = function () {
      filmstudio.getUserStudios().then(function (data) {
        let lp = new LandingPage();
        document.getElementById("user_studio_info_result").innerHTML = "";
        document.getElementById("info_user_studio_modal").style.display =
          "block";
        lp.ModalRegister("button_my_studio", "info_user_studio_modal");

        document
          .getElementById("user_studio_info_result")
          .insertAdjacentHTML(
            "beforeend",
            "<p>Name: " +
              data[0].name +
              "</p>" +
              "<p>Moderator: " +
              data[0].moderator +
              "</p>" +
              "<p>E-mail: " +
              data[0].moderatorEmail +
              "</p>" +
              "<p>Phone Number: " +
              data[0].moderatorPhoneNumber +
              "</p>" +
              "<p>Located in: " +
              data[0].place +
              "</p>" +
              "<p>Films in possesion: " +
              data[0].filmsInPossesion.length +
              "</p>"
          );
      });
    };

    document.getElementById("studio_all_taken_button").onclick = function () {
      filmstudio.getUserStudios().then(function (data) {
        let lp = new LandingPage();
        document.getElementById(
          "user_studio_taken_films_info_result"
        ).innerHTML = "";
        document.getElementById(
          "user_studio_list_taken_films_modal"
        ).style.display = "block";
        lp.ModalRegister(
          "studio_all_taken_button",
          "user_studio_list_taken_films_modal"
        );

        if (data[0].filmsInPossesion.length == 0) {
          return document
            .getElementById("user_studio_taken_films_info_result")
            .insertAdjacentHTML("beforeend", "<p>Nothing is taken</p>");
        }

        document
          .getElementById("user_studio_taken_films_info_result")
          .insertAdjacentHTML(
            "beforeend",
            "<p>" +
              data[0].filmsInPossesion.length +
              " films are in your possesion</p>"
          );

        for (let i = 0; i < data[0].filmsInPossesion.length; i++) {
          document
            .getElementById("user_studio_taken_films_info_result")
            .insertAdjacentHTML(
              "beforeend",
              "<p>" +
                data[0].filmsInPossesion[i].name +
                '<button class="leaveflm"  value="' +
                data[0].filmsInPossesion[i].name +
                '">Leave back</button></p>'
            );

          window.onclick = (e) => {
            if (e.target.innerText == "Leave back") {
              let film = new Film_Actions();
              film.LeaveFilm(e.target.value);
            }
          };
        }
      });
    };

    document.getElementById(
      "studio_all_for_take_away_button"
    ).onclick = function () {
      let lp = new LandingPage();
      document.getElementById(
        "user_studio_list_films_for_take_away_result"
      ).innerHTML = "";
      document.getElementById(
        "user_studio_list_films_for_take_away_modal"
      ).style.display = "block";

      lp.ModalRegister(
        "studio_all_for_take_away_button",
        "user_studio_list_films_for_take_away_modal"
      );

      film.FilmListForStudio().then(function (data) {
        for (let i = 0; i < data.length; i++) {
          document
            .getElementById("user_studio_list_films_for_take_away_result")
            .insertAdjacentHTML(
              "beforeend",
              '<button class="button special" value="' +
                data[i].name +
                '">Take: ' +
                data[i].name +
                "</button>"
            );

          window.onclick = (x) => {
            let buttonName = x.target.innerText.substring(0, 5);
            if (buttonName == "Take:") {
              film.TakeFilm(x.target.value);
            }
          };
        }
      });
    };

    document.getElementById("studio_all_films_button").onclick = function () {
      film.ListAllFilms();
    };

    land_content.insertAdjacentHTML("beforeend", var_strg.list_all_films_modal);

    land_content.insertAdjacentHTML(
      "beforeend",
      var_strg.info_user_studio_modal
    );

    land_content.insertAdjacentHTML(
      "beforeend",
      var_strg.user_studio_list_taken_films_modal
    );

    land_content.insertAdjacentHTML(
      "beforeend",
      var_strg.user_studio_list_films_for_take_away_modal
    );
  }

  LoggedInViewAdmin() {
    document
      .getElementsByTagName("p")[0]
      .insertAdjacentHTML("beforeend", var_strg.logged_in_basic_admin_view);

    let film = new Film_Actions();
    let studio = new Studio_Actions();
    let land_content = document.getElementById("land_content");

    document.getElementById("admin_create_film_button").onclick = function () {
      film.CreateFilm();
    };

    document.getElementById("admin_search_film_button").onclick = function () {
      film.SearchFilm();
    };

    document.getElementById(
      "admin_list_all_film_button"
    ).onclick = function () {
      film.ListAllFilms();
    };

    document.getElementById(
      "admin_list_all_filmstudios_button"
    ).onclick = function () {
      studio.ListAllFilmStudios();
    };

    document.getElementById(
      "admin_search_for_filmstudio_button"
    ).onclick = function () {
      studio.SearchForFilmStudio();
    };

    land_content.insertAdjacentHTML("beforeend", var_strg.film_modal_HTML);
    land_content.insertAdjacentHTML("beforeend", var_strg.search_film_modal);
    land_content.insertAdjacentHTML("beforeend", var_strg.list_all_films_modal);

    land_content.insertAdjacentHTML(
      "beforeend",
      var_strg.list_all_filmstudios_modal
    );

    land_content.insertAdjacentHTML(
      "beforeend",
      var_strg.search_filmstudio_modal
    );
  }

  Accordion() {
    let acc = document.getElementsByClassName("accordion");
    let i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function () {
        this.classList.toggle("active");

        /* Toggle between hiding and showing the active panel */
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
          panel.style.display = "none";
        } else {
          panel.style.display = "block";
        }
      });
    }
  }
}
