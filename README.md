# DevConnector

DevConnector is a social network application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and ES6+. The app allows developers to share their thoughts, interact with other developers, and showcase their skills and experiences.

## Features

- User authentication with JSON Web Tokens (JWT)
- Ability to create, edit, and delete posts
- Like and comment on posts
- User profile pages with information about their skills, experience, and education
- Search functionality to find other developers and their posts

## Installation

To run the application locally, please follow these instructions:

1. Clone the repository: `git clone https://github.com/shahariartushar/mern-SocialNertworkApp-devConnector.git`
2. Install the dependencies: `npm install`
3. Set up your environment variables by creating a `.env` file in the root directory and adding the following variables:

```
mongoURI=your_mongodb_uri
jwtSecret=your_secret_key
githubClientID=your_githubclient_id
githubClientSecret=your_githubclient_secret_key
```

4. Start the server: `npm run server`
5. Start the client: `npm run client`
6. Open your web browser and navigate to [http://localhost:3000](http://localhost:3000)

## Technologies Used

- MongoDB - NoSQL database
- Express.js - Node.js web application framework
- React.js - JavaScript library for building user interfaces
- Node.js - JavaScript runtime environment
- Redux - State management library
- JSON Web Tokens (JWT) - Secure token-based authentication system
- bcrypt - Password-hashing library
- Axios - Promise-based HTTP client
- Bootstrap - Front-end component library

## Contributing

Contributions are welcome! If you'd like to contribute to the project, please follow these steps:

1. Fork the project
2. Create a new branch (`git checkout -b new-feature`)
3. Commit your changes (`git commit -am 'Add a new feature'`)
4. Push to the branch (`git push origin new-feature`)
5. Create a new Pull Request

## License

This project is currently not licensed.

## Acknowledgments

This project was inspired by Brad Traversy's "MERN Stack Front To Back" Udemy course.
