# ⚡️ Custify Frontend

<div align="center">

![Custify Logo](https://img.shields.io/badge/Custify-Frontend-blue?style=for-the-badge&logo=react)

**Simple, modern CRM platform focused on real-time customer interactions**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

[![GitHub stars](https://img.shields.io/github/stars/RoelCrabbe/Custify-React?style=social)](https://github.com/RoelCrabbe/Custify-React/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/RoelCrabbe/Custify-React?style=social)](https://github.com/RoelCrabbe/Custify-React/network/members)
[![GitHub issues](https://img.shields.io/github/issues/RoelCrabbe/Custify-React)](https://github.com/RoelCrabbe/Custify-React/issues)

</div>

---

## 🚀 About Custify Frontend

Custify is a modern customer relationship management (CRM) platform designed with simplicity and efficiency in mind. Unlike traditional, bloated CRM systems, Custify focuses on providing essential customer management features with real-time interactions and a clean, intuitive interface.

This frontend works seamlessly with the [Custify TypeScript Backend](https://github.com/RoelCrabbe/Custify-TypeScript) to deliver a complete CRM solution.

### ✨ Key Features

- **📱 Modern UI/UX** - Clean, responsive design built with Tailwind CSS
- **⚡ Real-time Updates** - WebSocket integration for live data synchronization
- **🔄 Customer Management** - Comprehensive contact and lead tracking
- **📊 Dashboard Analytics** - Visual insights into your customer data
- **🚀 Fast Performance** - Built with Next.js for optimal loading speeds
- **🔒 Secure** - Industry-standard security practices
- **📱 Mobile Responsive** - Works seamlessly across all devices

## 🛠️ Tech Stack

- **Frontend**: React 18, Next.js 14
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Real-time**: WebSocket connections
- **State Management**: React Context/Hooks
- **HTTP Client**: Fetch API

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Backend API server running

### Quick Start

1. **Clone the repository**

    ```bash
    git clone https://github.com/RoelCrabbe/Custify-React.git
    cd Custify-React
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Environment Setup**

    Create a `.env` file in the root directory:

    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3000
    NEXT_BASE_API_URL=http://localhost:8080
    NEXT_WEBSOCKET_API_URL=ws://localhost:8765
    ```

4. **Start the development server**

    ```bash
    npm run dev
    # or
    yarn dev
    ```

5. **Open your browser**

    Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🔧 Configuration

### Environment Variables

| Variable                 | Description              | Required | Default                 |
| ------------------------ | ------------------------ | -------- | ----------------------- |
| `NEXT_PUBLIC_API_URL`    | Frontend API endpoint    | ✅       | `http://localhost:3000` |
| `NEXT_BASE_API_URL`      | Backend API base URL     | ✅       | `http://localhost:8080` |
| `NEXT_WEBSOCKET_API_URL` | WebSocket connection URL | ✅       | `ws://localhost:8765`   |

### Frontend Configuration

```typescript
// Example API configuration
const apiConfig = {
    baseURL: process.env.NEXT_BASE_API_URL,
    websocketURL: process.env.NEXT_WEBSOCKET_API_URL,
    timeout: 10000,
};
```

## 🤝 Contributing

We welcome contributions to the Custify Frontend! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Development Guidelines

- Follow React and TypeScript best practices
- Maintain consistent UI/UX patterns
- Write comprehensive tests
- Use conventional commit messages
- Ensure responsive design principles

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Roel Crabbe**

- GitHub: [@RoelCrabbe](https://github.com/RoelCrabbe)

## 🔗 Related Projects

- **Backend**: [Custify-TypeScript](https://github.com/RoelCrabbe/Custify-TypeScript) - TypeScript backend for Custify CRM
- **Mobile**: Coming soon - React Native mobile app

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- TypeScript for type safety

## 📊 Project Status

**🚧 In Progress** - This project is actively being developed. Features and documentation may change frequently.

---

<div align="center">

**Star ⭐ this repository if you found it helpful!**

[Report Bug](https://github.com/RoelCrabbe/Custify-React/issues) · [Request Feature](https://github.com/RoelCrabbe/Custify-React/issues) · [Documentation](https://github.com/RoelCrabbe/Custify-React/wiki)

</div>
