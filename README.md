# filmstudion-Justice3000
Unfortunately I've could not get rid of one bug.
THIS HAPPENS ONLY WITHIN FIRST REGISTRATION AS USER
When new user registers (not admin), he is required to register a studio. 
After clicking register user is met with Failed to fetch error, despite the fact that call was completed.
User then is required to login again. 
After that everything works as expected, even with new user registrations.

IF YOU CAN EXPLAIN ME WHERE IS THE PROBLEM I'LL SWISH YOU MONEY. // 
my suspect is that it is because of getting values from form.
>The very first basic paths for API

**authorized includes admin and studio

**anon stands for anonymous

How to use?

| method | path | action |  authorization level |
| -------|------|--------|----------------------|
| GET    | api/v1/films| gets all films | authorized|



## Films 

+ GET `api/v1/Films` -get all films  :white_check_mark: as **authorized** 

+ GET `api/v1/Films?showInStock=true`  -get all films avaiable for take away  :white_check_mark: as **authorized** 

+ GET `api/v1/Films/{name}` -get specific film  :white_check_mark: as **authorized**

<br>

+ POST `api/v1/Films` - Create Film - :white_check_mark: as **admin**


```
body example:
{
        "name": "Matrix",
        "director": "The Wachowskis",
        "country": "USA",
        "language": "English",
        "releaseDate": "1999-07-01",
        "runtime": 150,
        "infoLink": "https://www.google.com/search?q=matrix",
        "quantityAllowed": 909
}

```
<br>

+ PUT `api/v1/Films/{filmName}` - Update Film :white_check_mark: as **admin** 
```
body example:
{
        "name": "Matrix",
        "director": "The Wachowskis",
        "country": "USA",
        "language": "English",
        "releaseDate": "1999-07-01",
        "runtime": 120,
        "infoLink": "https://www.google.com/search?q=matrix",
        "quantityAllowed": 999
}
```
<br>

+ POST `api/v1/Films/TakeMovie` - Take Movie :white_check_mark: as **studio**
```
body example:
{
    "movieName": "Shrek",
    "studio" : "Studio Name"
}
```
<br>

+ POST `api/v1/Films/LeaveMovie` - Take Movie :white_check_mark: as **studio**
```
body example:
{
    "movieName": "Shrek",
    "studio" : "Studio Name"
}
```
<br>

---


## Film Studios 

+ GET `api/v1/FilmStudios` -lists all filmstudios :white_check_mark: as **authorized** 


+ GET `api/v1/FilmStudios/{studio_name}` - lists specific film studio :white_check_mark: as **authorized** 


+ GET `api/v1/FilmStudios/myStudios` - lists studios that belongs tu user :white_check_mark: as **studio** 

<br>

+ POST `api/v1/FilmStudios` - registers a studio for an user :white_check_mark: as **studio** 
```
body example:
{
    "Name": "StudioName",
    "Place": "Edsvalla",
    "ModeratorPhoneNumber": "0720000404"
}
```



---

<br>

## Users 

<br>

+ POST `api/v1/Users/register` -registration form for user :white_check_mark: as **anon** 
```
body example:
{
    "Email" : "email@email.com",
    "FirstName" : "Rowan",
    "LastName": "Atkinson",
    "UserName": "MrBean",
    "Password":"Password@123"
}
```

<br>

+ POST `api/v1/Users/register?asAdmin=true` -registration form for admin :white_check_mark: as **anon** 
```
body example:
{
    "Email" : "email@email.com",
    "FirstName" : "Rowan",
    "LastName": "Atkinson",
    "UserName": "MrBean",
    "Password":"Password@123"
}
```

<br>

+ POST `api/v1/Users/authenticate` -JWT token provider :white_check_mark: as **anon** 
```
body example:
{
    "Email" : "email@email.com",
    "Password":"Password@123"
}
```



---