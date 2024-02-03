# This Project is Mern

# Technology use

- React.js (Frontend)
- Node.js with Express.js (Backend Server)
- MongoDB database for storing data
- Taliwind CSS framework for styling the application

## Getting Started

1. Clone this repository using git clone command in your terminal or download it
2. Your Local System should have **NodeJS** and **NPM** installed in it to run this project.
3. Clone or download the repository from GitHub onto your local system.
4. Navigate into the directory of downloaded folder using command prompt(CMD)/Terminal
5. Run `npm install` on terminal/command prompt to install all dependencies required by the project
6. After successful installation, start both server and client side by running following commands:

- For starting server:
  #npm run dev
- For starting client:
  #npm run dev
  Note: Both commands must be run simultaneously to make the application work properly.

7. The Application will open at "http://localhost:8000/" in your default

## User Interfecence

The user interface has been designed keeping simplicity as a priority. It includes features like:

1. Login / Signup Page - Users can create their own account if they don't already have one. They also have an option to login with Google or Github accounts.
2. Home page - Displays list of House available for rent or sale search bar which filters out results.
3. Search Page - Shows detailed information about each house including images, price, location etc.
4. Profile Page - Contains personal details such as name, email id, phone number etc.

## Features Implemented

1. Real Time Data Base Connection - Whenever any change occurs in the database i.e., addition or deletion of an item, it reflects instantly on UI without needing to
2. Authentication - Users can register themselves if they are new users or login if they already registered. Password is hashed before saving in the database.
3. Sorting feature based on different parameters like Price, Location, Type of property.
4. Filtering feature that allows users to filter houses according to their preferences like Furnished / Not furnished, Number of bedrooms, bathrooms etc.
5. Proper validation checks are implemented while filling up the form fields.If any field is left empty an error message would appear below that field indicating the same.
6. Profile page where users can view their profile and update if needed.Users can also add more properties to their watchlist.
