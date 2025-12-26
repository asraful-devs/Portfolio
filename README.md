# Portfolio Website

A modern, full-stack portfolio website built with Next.js, React, and a robust backend infrastructure.

## Live Link

Client Side: [https://portfolio-client-site.vercel.app/](https://portfolio-client-site.vercel.app/)
Backend Server Side: [https://portfolio-backend-server-side.vercel.app/](https://portfolio-backend-server-side.vercel.app/)

## 🚀 Tech Stack

### Frontend

-   **Next.js** - React framework for production
-   **React** - UI library
-   **Tailwind CSS** - Utility-first CSS framework
-   **TypeScript** - Type-safe development

### Backend

-   **Node.js** - JavaScript runtime
-   **Express** - Web application framework
-   **Prisma** - Next-generation ORM
-   **PostgreSQL** - Relational database

## ✨ Features

-   📱 Responsive design
-   🎨 Modern UI/UX with Tailwind CSS
-   🔐 Secure authentication
-   📊 Database integration with Prisma
-   ⚡ Server-side rendering with Next.js
-   🌐 RESTful API with Express
-   💾 PostgreSQL database

### Production Build

bash
npm run build
npm start

# or

yarn build
yarn start

## 📁 Project Structure

portfolio/

├── portfolio-backend-server-side
├── portfolio-frontend-client-side
├── package-lock.json
├── package.json
├── README.md

## 🔧 Configuration

### Tailwind CSS

Customize your design in `tailwind.config.js`:
javascript
module.exports = {
theme: {
extend: {
colors: {
primary: '#your-color',
},
},
},
}

### Prisma Schema

Define your database models in `prisma/schema.prisma`:
prisma
model Project {
id String @id @default(cuid())
title String
description String
createdAt DateTime @default(now())
}

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Md Asraful**

-   GitHub: [@MdAsraful56](https://github.com/MdAsraful56)
-   LinkedIn: [Md Asraful](https://linkedin.com/in/asraful4)
-   Email: work.mdasraful56@gmail.com

## 🙏 Acknowledgments

-   Next.js Documentation
-   Prisma Guides
-   Tailwind CSS
-   PostgreSQL Community

## 📞 Support

For support, email your.email@example.com or open an issue in the repository.

---

Made with ❤ using Next.js and React
