export let button_login = document.getElementById("button_login");
export let button_reg_user = document.getElementById("button_reg_user");
export let button_reg_admin = document.getElementById("button_reg_admin");

export let email_reg_input = document.getElementById("email_reg");
export let firstname_reg_input = document.getElementById("firstname_reg");
export let lastname_reg_input = document.getElementById("lastname_reg");
export let username_reg_input = document.getElementById("username_reg");
export let password_reg_input = document.getElementById("password_reg");
export let password_reg_input_repeat = document.getElementById(
  "password_reg_repeat"
);

export let email_login_input = document.getElementById("email_login");
export let password_login_input = document.getElementById("password_login");

export let logged_in_basic_admin_view =
  '<div id="info_window"><p>Your options for today: </p>' +
  '<div class="col" id="col1"><p>Films</p>' +
  '<p><button onclick="" id="admin_create_film_button" class="button">Create new film</button></p>' +
  '<p><button id="admin_search_film_button" class="button">Search for film</button></p>' +
  '<p><button id="admin_list_all_film_button" class="button">List all films</button></p>' +
  "</div>" +
  '<div class="col" id="col2"><p>Studios<p>' +
  '<p><button id="admin_list_all_filmstudios_button" class="button">List all film studios</button></p>' +
  '<p><button id="admin_search_for_filmstudio_button" class="button">Search for film studio</button></p>' +
  "</div>" +
  "</div>";

export let film_modal_HTML =
  '<div id="myModal" class="modal">' +
  '<div class="modal-content">' +
  '<span id="myModal_close" class="close">&times;</span>' +
  '<span class="myModal_close"></span>' +
  '<fieldset id="regField">' +
  "<legend>New Film Creation Form SFF</legend>" +
  " <div>" +
  '<form id="film_creation_form">' +
  '<label for="film_create_name">Film Name </label>' +
  '<input id="film_create_name" placeholder="Shrek" required><br>' +
  '<label for="film_create_director">Director </label>' +
  '<input id="film_create_director" placeholder="Mr. Shrek" required><br>' +
  '<label for="film_create_country">Country </label>' +
  '<input id="film_create_country" placeholder="Swamp" required><br>' +
  '<label for="film_create_language">Language </label>' +
  '<input id="film_create_language" placeholder="Shrek English" required><br>' +
  '<label for="film_create_release_date">Release Date </label>' +
  '<input id="film_create_release_date" type="date" placeholder="2021-01-20" required><br>' +
  '<label for="film_create_runtime">Runtime </label>' +
  '<input id="film_create_runtime" placeholder="ex. 120 (minutes)" type="number" required><br>' +
  '<label for="film_create_infolink">Info Link </label>' +
  '<input id="film_create_infolink" placeholder="https://www.shrek.shrek" type="url" required><br>' +
  '<label for="film_create_qt">Quantity Allowed </label>' +
  '<input id="film_create_qt" placeholder="10" type="number" required><br>' +
  "</form>" +
  "</div>" +
  "</fieldset>" +
  '<button class="button" id="button_admin_create_film">Create Film</button>' +
  "</div>" +
  "</div>";

export let search_film_modal =
  '<div id="modal_search" class="modal">' +
  '<div class="modal-content">' +
  '<span id="modal_search_close" class="close">&times;</span>' +
  '<div class="modal-header">' +
  '<h2 style="text-align: center">Film Search on SFF</h2>' +
  "</div>" +
  '<div class="modal-body">' +
  '<input id="film_search_input" placeholder="Your Film Name here">' +
  "</div>" +
  '<div class="modal-footer">' +
  '<h3><button id="film_search_input_button" class="button">Search</button></h3>' +
  "</div>" +
  "</div>" +
  "</div>";

export let list_all_films_modal =
  '<div id="modal_all_films" class="modal">' +
  '<div class="modal-content">' +
  '<span id="modal_all_films_close" class="close">&times;</span>' +
  '<div class="modal-header">' +
  '<h2 style="text-align: center">Film List</h2>' +
  "<details>" +
  "<summary>options</summary>" +
  '<label class="container_checkbox">Show only available' +
  '<input id="checkbox_filter_available" type="checkbox" checked="checked" value="true">' +
  '<span class="checkmark"></span>' +
  "</label>" +
  "</details>" +
  '<div class="modal-body" id="film_list_modal_body">' +
  "</div>" +
  '<div class="modal-footer">' +
  "</div>" +
  "</div>" +
  "</div>";

export let list_all_filmstudios_modal =
  '<div id="modal_all_filmstudios" class="modal">' +
  '<div class="modal-content">' +
  '<span id="modal_all_filmstudios_close" class="close">&times;</span>' +
  '<div class="modal-header">' +
  '<h2 style="text-align: center">Film Studios List</h2>' +
  '<div class="modal-body" id="filmstudio_list_modal_body">' +
  "</div>" +
  '<div class="modal-footer">' +
  "</div>" +
  "</div>" +
  "</div>";

export let search_filmstudio_modal =
  '<div id="admin_modal_search_studio" class="modal">' +
  '<div class="modal-content">' +
  '<span id="admin_modal_search_studio_close" class="close">&times;</span>' +
  '<div class="modal-header">' +
  '<h2 style="text-align: center">Studio Search on SFF</h2>' +
  "</div>" +
  '<div class="modal-body">' +
  '<input id="admin_studio_search_input" placeholder="Your Film Name here">' +
  '<div id="admin_studio_search_results"></div>' +
  "</div>" +
  '<div class="modal-footer">' +
  '<h3><button id="admin_studio_search_input_button" class="button">Search</button></h3>' +
  "</div>" +
  "</div>" +
  "</div>";

export let create_studio_HTML =
  '<fieldset id="create_studio_html">' +
  "<legend>New Studio Creation Form SFF</legend>" +
  "<div>" +
  '<form id="studio_creation_form">' +
  '<label for="studio_create_name">Studio Name </label>' +
  '<input id="studio_create_name" placeholder="Wondertainment inc." required><br>' +
  '<label for="studio_create_place">Studio Location </label>' +
  '<input id="studio_create_place" placeholder="Karlstad" required><br>' +
  '<label for="studio_create_number">Phonenumber </label>' +
  '<input type="number" id="studio_create_number" placeholder="0723080000" required><br>' +
  '<button class="button" id="button_user_create_studio">Create Studio</button>' +
  "</form>" +
  "</div>" +
  "</fieldset>";

export let logged_in_basic_user_view =
  '<div id="info_window_user"><p>Your options for today: </p>' +
  '<div class="col" id="user_col1"><p>Films</p>' +
  '<p><button id="studio_all_films_button" class="button">List all films</button></p>' +
  '<p><button id="studio_all_taken_button" class="button">List all taken films</button></p>' +
  '<p><button id="studio_all_for_take_away_button" class="button">Films for Take away</button></p>' +
  "</div>" +
  '<div class="col" id="user_col2"><p>Studio<p>' +
  '<p><button id="button_my_studio" class="button">My Studio</button></p>' +
  "</div>" +
  "</div>";

export let info_user_studio_modal =
  '<div id="info_user_studio_modal" class="modal">' +
  '<div class="modal-content">' +
  '<span id="info_user_studio_modal_close" class="close">&times;</span>' +
  '<div class="modal-header">' +
  '<h2 style="text-align: center">Your studio on SFF</h2>' +
  "</div>" +
  '<div class="modal-body">' +
  '<div id="user_studio_info_result"></div>' +
  "</div>" +
  '<div class="modal-footer">' +
  "</div>" +
  "</div>" +
  "</div>";

export let user_studio_list_taken_films_modal =
  '<div id="user_studio_list_taken_films_modal" class="modal">' +
  '<div class="modal-content">' +
  '<span id="user_studio_list_taken_films_modal_close" class="close">&times;</span>' +
  '<div class="modal-header">' +
  '<h2 style="text-align: center">Taken films from SFF</h2>' +
  "</div>" +
  '<div class="modal-body">' +
  '<div id="user_studio_taken_films_info_result"></div>' +
  "</div>" +
  '<div class="modal-footer">' +
  "</div>" +
  "</div>" +
  "</div>";

export let user_studio_list_films_for_take_away_modal =
  '<div id="user_studio_list_films_for_take_away_modal" class="modal">' +
  '<div class="modal-content">' +
  '<span id="user_studio_list_films_for_take_away_modal_close" class="close">&times;</span>' +
  '<div class="modal-header">' +
  '<h2 style="text-align: center">Films for take away from SFF</h2>' +
  "</div>" +
  '<div class="modal-body">' +
  '<div id="user_studio_list_films_for_take_away_result"></div>' +
  "</div>" +
  '<div class="modal-footer">' +
  "</div>" +
  "</div>" +
  "</div>";
