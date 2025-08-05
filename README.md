# Coin Tracker

A comprehensive cryptocurrency tracking application with both web and Android components. Track real-time cryptocurrency prices, view detailed charts, manage your watchlist, and stay updated with market trends.

## 🚀 Features

### Web Application
- **Real-time Market Data**: Live cryptocurrency prices and market statistics
- **Interactive Charts**: Detailed price charts using Chart.js
- **Dashboard**: Overview of trending coins and market performance
- **Coin Details**: Comprehensive information for each cryptocurrency
- **Watchlist**: Personal collection of favorite cryptocurrencies
- **Search**: Find and explore different cryptocurrencies
- **Responsive Design**: Modern UI built with Tailwind CSS and Framer Motion

### Android Application
- **Native Android App**: Built with Jetpack Compose
- **Offline Support**: Local data storage with Room database
- **Real-time Updates**: Live cryptocurrency data
- **Interactive Charts**: MPAndroidChart integration
- **Material Design 3**: Modern Android UI components

## 🛠️ Tech Stack

### Web Application
- **Frontend**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Charts**: Chart.js with react-chartjs-2
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **Routing**: React Router DOM

### Android Application
- **Language**: Kotlin
- **UI Framework**: Jetpack Compose
- **Architecture**: MVVM with Hilt dependency injection
- **Networking**: Retrofit with OkHttp
- **Database**: Room
- **Charts**: MPAndroidChart
- **Async Programming**: Coroutines

## 📱 Screenshots

<a href="https://drive.google.com/file/d/1eeW5uiE9drpdpA7xVr8cexYpA1URjNTP/view?usp=drive_link"></a>
<a href="https://drive.google.com/file/d/1poptREb9SQjYywSMuT6kVoBDCKtLxbCt/view?usp=sharing"></a>

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Android Studio (for Android development)
- JDK 17 (for Android development)

### Web Application Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd coin-tracker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Android Application Setup

1. **Open in Android Studio**
   - Open Android Studio
   - Select "Open an existing project"
   - Navigate to the project directory

2. **Sync Gradle files**
   - Wait for Gradle sync to complete
   - Resolve any dependency issues if needed

3. **Run the application**
   - Connect an Android device or start an emulator
   - Click the "Run" button in Android Studio

## 📁 Project Structure

```
coin-tracker/
├── src/                    # Web application source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom React hooks
│   ├── context/           # React context providers
│   ├── types/             # TypeScript type definitions
│   ├── utils/             # Utility functions
│   └── api/               # API integration
├── app/                   # Android application
│   └── src/               # Android source code
├── public/                # Static assets
├── package.json           # Web dependencies
├── build.gradle           # Android dependencies
└── README.md             # This file
```

## 🔧 Available Scripts

### Web Application
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📊 API Integration

The application integrates with cryptocurrency APIs to provide real-time data:
- Market prices and statistics
- Historical price data for charts
- Coin information and metadata
- Trending cryptocurrencies

## 🎨 UI/UX Features

- **Dark/Light Mode**: Automatic theme detection
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion for delightful interactions
- **Loading States**: Proper loading indicators
- **Error Handling**: User-friendly error messages

## 🔒 Security

- API keys are stored securely
- HTTPS for all API communications
- Input validation and sanitization
- XSS protection

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [CoinGecko API](https://www.coingecko.com/en/api) for cryptocurrency data
- [Chart.js](https://www.chartjs.org/) for beautiful charts
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Framer Motion](https://www.framer.com/motion/) for animations

## 📞 Support

If you have any questions or need support, please open an issue in the GitHub repository.

---

**Made with ❤️ by the Coin Tracker team** 
