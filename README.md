<p align="center">
  <img src="./public/git-strava primary logo.png" alt="Git-Strava Logo" width="400"/>
</p>

<h1 align="center">Git-Strava</h1>

<p align="center">
  Strava Overlay Trends, but for Developers. Get your monthly GitHub activity summary in a shareable image format.
  <br />
  <br />
  <a href="https://github.com/zumaku/git-strava/issues">Report a Bug</a>
  ·
  <a href="https://github.com/zumaku/git-strava/issues">Request New Features</a>
</p>

<p align="center">
  <a href="https://saweria.co/your-username">
    <img src="https://img.shields.io/badge/Sponsor%20on-Saweria-brightgreen?style=for-the-badge&logo=saweria" alt="Sponsor on Saweria">
  </a>
</p>

## About The Project

**Git-Strava** is a web application that allows developers to log in with their GitHub account and automatically generate a monthly activity summary. Inspired by the activity summaries that runners often share on Strava, the project aims to provide a similar “overlay” for developers to showcase their productivity and contributions on GitHub.

The final result of the summary can be downloaded as a 9:16 PNG image, perfect for sharing on social media like Instagram Stories.

### Main Features

* Secure login using GitHub account (OAuth 2.0).
* Shows total monthly statistics:
  * LOC (Lines of Code) Additions
  * LOC (Lines of Code) Deletions
  * Average lines of code changed per day
* Authentic monthly contribution calendar visualization.
* Download summary as PNG image with 9:16 ratio.

### Built With

List of key technologies used in this project:

* [Next.js](https://nextjs.org/)
* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [NextAuth.js](https://next-auth.js.org/)
* [html2canvas](https://html2canvas.hertzen.com/)
* [Lucide React](https://lucide.dev/)

## Getting Started

To run this project in your local environment, follow these simple steps.

### Prerequisites

Make sure you have Node.js and npm (or yarn/pnpm) installed on your machine.

### Local Installation

1.  **Clone this repository:**
    ```sh
    git clone [https://github.com/zumaku/git-strava.git](https://github.com/zumaku/git-strava.git)
    ```
2.  **Enter the project directory:**
    ```sh
    cd git-strava
    ```
3.  **Install all dependencies:**
    ```sh
    npm install
    ```
4.  **Configure Environment Variables:**
    * Create a `.env.local` file in the project root.
    * Register a new OAuth application in your GitHub [Developer settings](https://github.com/settings/developers).
    * Set the **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github`.
    * Fill the `.env.local` file with your credentials:
        ```env
        GITHUB_ID=YOUR_CLIENT_ID
        GITHUB_SECRET=YOUR_CLIENT_SECRET
        AUTH_SECRET=A_VERY_SECRET_RANDOM_STRING
        ```
5.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) in your browser.

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Don't forget to give the project a star! Thanks!

Steps to contribute:
1.  **Fork** the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.