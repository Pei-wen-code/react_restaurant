<p align="center">
<img alt="favicon" src="https://res.cloudinary.com/pei7pei8luobo/image/upload/v1630420930/vegetarian_gzpvzo.svg" width="200" height="200" >
</p>

# Restaurant project - frontend
This is an SPA website for booking a table in an imagined vegan restanrant, using React as frontend and Node.js as backend. Foodies can simply browse the menu without login and they need to register as members if they want to make a reservation. On the other hand, admin can manage not only bookings from the customers but also content of the menu.

If you are interested in how I build backend, please check [here](https://github.com/Pei-wen-code/react_restaurant_backN)

<img width="1440" alt="retauranthome" src="https://user-images.githubusercontent.com/58638019/132412312-c88f1312-0122-471f-b370-a98a5c31d09a.png">

# Demo
[Demo](https://reactrestaurantfn.herokuapp.com/#/).

You may use the admin's login. Username: admin, password: admin12345678.

:bangbang: I would be really appreciate if you just delete the picture you uploaded when you want to edit menu. This is due to the fact that I need those already-exist pictures to be displayed in the menu page. Thank you in advance. :smiley:


<img width="1417" alt="login" src="https://user-images.githubusercontent.com/58638019/131512764-b8afc0b4-489c-4c28-a6f1-3dd85c34b7f1.png">

Or simply create a new account by registration.

<img width="1419" alt="register" src="https://user-images.githubusercontent.com/58638019/131512782-56af10b9-534e-49fd-bb34-488ae5102bf0.png">

# About this project
This project is inspired by [one of my assignment](https://github.com/Lidemy/mentor-program-4th-Pei-wen-code/tree/master/homeworks/week6) when I was learning in a [coding mentorship programme](https://github.com/Lidemy/mentor-program-4th-Pei-wen-code) with Lidemy. That is a simple homepage of an imagined restaurant where only HTML and CSS are used. Having been learning React and Node.js, I decide to create a SPA website where customers can make reservation without spending time to call restaurants. On the other hand, restaurant owners can save time to look for the availability when customers phone in, meaning they will have more time to be creative in their cuisine.

# Fatures
* Customers can
  - browse menu
  - register, login and logout
  - check availability of a specific time and date
  - make reservation accordingly
  - pay table reservation fee once the reservation is made
  - manage their email
* Restaurant owners
  - also have the above features
  - can edit or delete existing bookings
  - can create, edit and delete items in the menu

# Technology used
* Create React APP // Creating a React app and its environment
* React hooks // Management of UI components
* React Router // Management of router
* React Boostrap // Creating navigation bar with RWD easily
* styled-components // Style with CSS-in-JS components
* react-calendar // An UI component that manage dates for booking a table
* fetch // Communicating with back-end server (Node.js) via API
* LocalStorage // Saving JWT token for authentication
* react-stripe-checkout // Stripe API which manages payment
* swiper // An UI component creating carousel effect for customers' review
* react-router-hash-link // Same-page-navigation that is used when admin is editing the menu
* Heroku // Deployed to heroku

# Content
* Customers
<img width="1421" alt="menu" src="https://user-images.githubusercontent.com/58638019/131515265-f0af285f-d9be-46a0-bd29-c9f507e2920d.png">

<img width="1421" alt="reserve1" src="https://user-images.githubusercontent.com/58638019/131515418-0c9a4ffa-c037-417c-a2f7-e21e8e9c1aae.png">

<img width="1418" alt="reserve2" src="https://user-images.githubusercontent.com/58638019/131515478-0a150988-643d-4806-a9b1-59ca052c2d48.png">

<img width="1413" alt="reserve3" src="https://user-images.githubusercontent.com/58638019/131515517-beb66d88-0821-4716-a60a-9a09ac25923e.png">

<img width="1420" alt="reserve4" src="https://user-images.githubusercontent.com/58638019/131515704-7c63b7cd-f3ac-4f45-b5d0-3cc6c96daff0.png">

<img width="1420" alt="myreserve1" src="https://user-images.githubusercontent.com/58638019/131515588-aa05c266-23e3-4d02-afd5-4e27559a4c60.png">

<img width="1418" alt="myreserve2" src="https://user-images.githubusercontent.com/58638019/131515640-b6d9e408-0c7c-4010-b405-209e612c78d4.png">

<img width="1417" alt="stripepay" src="https://user-images.githubusercontent.com/58638019/131515820-5e193fde-5aa9-47b1-8ffd-da9321f5b3d0.png">

* Restaurant owners 

<img width="1418" alt="adminmenu1" src="https://user-images.githubusercontent.com/58638019/131515884-718bfe15-c80b-464e-8a3c-18cfe0e74346.png">

<img width="1417" alt="adminmenu2" src="https://user-images.githubusercontent.com/58638019/131515940-c84092ff-20b9-43f4-81d9-32e44ad3623f.png">

<img width="1418" alt="adminreserve" src="https://user-images.githubusercontent.com/58638019/131515995-ba6292c6-fab4-421e-b5f4-bfd166daef6b.png">

# Resources
[Unsplash](https://unsplash.com)

[Flaticon](https://www.flaticon.com)

# Declaration
This website is only for prectice and learning, not for any business use.

# Installing
1. Clone this repository
```javascript
git clone https://github.com/Pei-wen-code/react_restaurant
```

2.Install packages
```javascript
npm install
```

3.Run this project locally
```javascript
yarn start
```
