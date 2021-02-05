import { delete_all_context_in_page } from "../helpers/helpers.js";
import { take_login_pain_away } from "../helpers/helpers.js";
import LandingPage from "../pages/land.js";
import FilmStudio_Actions from "../filmstudios/actions.js";

export default class Actions {
  constructor() {
    this.URL = "/api/v1/Users/";
  }

  async registerUser(model) {
    return fetch(this.URL + "register", {
      method: "POST",
      body: JSON.stringify(model),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then(function (data) {
        if (data.errors) {
          return alert("Please fill all the fields");
        }
        alert(data.message);

        return take_login_pain_away(model.Email, model.Password);
      })
      .catch((er) => console.log(er));
  }

  async registerAdmin(model) {
    return fetch(this.URL + "register?asAdmin=true", {
      method: "POST",
      body: JSON.stringify(model),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then(function (data) {
        if (data.errors) {
          return alert("Please fill all the fields");
        }

        alert(data.message);
        return take_login_pain_away(model.Email, model.Password);
      })
      .catch((error) => console.log(error));
  }

  async authenticate(model) {
    return fetch(this.URL + "authenticate", {
      method: "POST",
      body: JSON.stringify(model),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then((response) => response.json())
      .then(function (data) {
        
        if (data.message) {return alert(data.message);}

        window.localStorage.clear();
        window.localStorage.setItem("SFF_token", data.token);
        window.localStorage.setItem("SFF_username", data.username);
        window.localStorage.setItem("SFF_role", data.role);

        if (data.firsname) 
        {
          console.log("Welcome " + data.firsname);
          delete_all_context_in_page("land_content");
        }
        let username = data.username;
        let role = data.role;

        if(localStorage.getItem("SFF_role") == "studio")
        {
          let fa = new FilmStudio_Actions();
          fa.getUserStudios().then((data)=>{
            if(data.length == 0)
            {
              return fa.CreateStudio(username, role);
            }
            if(data.length > 0)
            {
              let lp = new LandingPage();
              return lp.LoggedInView(username, role);
            }
          })
        }

        if(localStorage.getItem("SFF_role") == "admin")
        {
          let lp = new LandingPage();
          return lp.LoggedInView(data.username, data.role);
        }
       
   
        
      }).catch((error) => console.log(error));
  }
}
