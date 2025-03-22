# Mobile Movie App

The Mobile Movie App is a cutting-edge mobile application developed using Expo, React Native, TypeScript, and Tailwind CSS. It integrates with Appwrite to fetch and manage real-time movie data, leveraging a popularity algorithm to enhance user engagement by ranking movies based on various metrics. Designed with modern UI/UX principles, the app offers a responsive and visually appealing interface that ensures scalability and top-notch performance.

## Features

- **Real-time Data**: Fetch and display up-to-date movie information.
- **Home Page**: Showcases featured movies and allows users to discover new favorites.
- **Search Page**: Enables users to search for movies by titles or actors.
- **Popularity Algorithm**: Tracks user interactions to highlight trending movies based on popularity.
- **Responsive Design**: Utilizes Tailwind CSS for a flexible and adaptive user interface.
- **User Engagement**: Analyzes user behavior to improve movie recommendations.

## Technology Stack

- **[Expo](https://expo.dev/)**: An open-source platform for making universal native apps for Android, iOS, and the web with JavaScript and React.
- **[React Native](https://reactnative.dev/)**: A framework for building native apps using React.
- **[Appwrite](https://appwrite.io/)**: An open-source backend server that simplifies the coding process by providing a set of easy-to-use APIs.
- **[TypeScript](https://www.typescriptlang.org/)**: A typed superset of JavaScript that compiles to plain JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapidly building custom user interfaces.

## Installation

To get started with the Mobile Movie App, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone git@github.com:JHDEZ1108/mobile-movie-app.git
   cd mobile-movie-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**:
   ```bash
   expo start
   ```

4. **Open the project**:
   - Scan the QR code with the Expo Go app (Android) or the Camera app (iOS).
   - Use Android Emulator or iOS Simulator.

5. **Environment Setup**:
   - Ensure that Appwrite is set up and running as the backend. Follow the [Appwrite installation guide](https://appwrite.io/docs) for setup instructions.

## Architecture and Reusability

The codebase is designed to promote reusability and maintain a clean architecture:
- **Components**: Reusable components for UI elements.
- **Services**: Modular services for handling API calls and business logic.
- **Utilities**: Utility functions to support common tasks across the app.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

## License

Distributed under the MIT License. See `LICENSE` for more information.

Happy Coding! 🚀
