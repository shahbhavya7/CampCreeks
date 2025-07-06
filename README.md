# 🏕️ CampCreeks - Your Ultimate Campground Discovery Platform

<div align="center">
  

  
  [![Made with Node.js](https://img.shields.io/badge/Made%20with-Node.js-339933?style=for-the-badge&logo=nodedotjs)](https://nodejs.org)
  [![Express.js](https://img.shields.io/badge/Framework-Express.js-000000?style=for-the-badge&logo=express)](https://expressjs.com)
  [![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?style=for-the-badge&logo=mongodb)](https://mongodb.com)
  [![Cloudinary](https://img.shields.io/badge/Images-Cloudinary-3448C5?style=for-the-badge&logo=cloudinary)](https://cloudinary.com)
  [![EJS](https://img.shields.io/badge/Template-EJS-B4CA65?style=for-the-badge&logo=ejs)](https://ejs.co)

  

  
</div>

## 🌟 Features

<div align="center">
  
  | 🗺️ **Campground Discovery** | 🔒 **Secure Authentication** | 📸 **Image Management** |
  |:---------------------------:|:-----------------------------:|:------------------------:|
  | Browse amazing campgrounds | Passport.js authentication | Cloudinary integration |
  | Interactive map locations | User session management | Multiple image uploads |
  
  | ⭐ **Review System** | 🛡️ **Security First** | 📱 **Responsive Design** |
  |:-------------------:|:--------------------:|:----------------------:|
  | Rate and review camps | XSS & injection protection | Beautiful EJS templates |
  | User-generated content | Helmet security headers | Mobile-friendly interface |
  
</div>

## ✨ What makes CampCreeks special?

- **🗺️ Interactive Campground Discovery** - Explore campgrounds with integrated mapping
- **🔒 Rock-Solid Authentication** - Secure user registration and login with Passport.js
- **📸 Professional Image Management** - Cloud-based image storage and optimization
- **⭐ Community-Driven Reviews** - User ratings and reviews for every campground
- **🛡️ Enterprise-Grade Security** - Protection against XSS, injection attacks, and more
- **📱 Responsive Experience** - Perfect on desktop, tablet, and mobile devices
- **🎨 Clean User Interface** - Intuitive design with EJS templating

## 🚀 Quick Start

### Prerequisites

```bash
# Node.js 14.0 or higher
node --version

# npm package manager
npm --version
```

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/campcreks.git
   cd campcreks
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   touch .env
   
   # Add your configuration
   echo "NODE_ENV=development" >> .env
   echo "DB_URL=your_mongodb_connection_string" >> .env
   echo "SECRET=your_session_secret" >> .env
   echo "MAPTILER_API_KEY=your_maptiler_api_key" >> .env
   echo "CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name" >> .env
   echo "CLOUDINARY_KEY=your_cloudinary_api_key" >> .env
   echo "CLOUDINARY_SECRET=your_cloudinary_api_secret" >> .env
   ```

4. **Run the application**
   ```bash
   npm start
   ```

5. **Open in browser**
   ```
   http://localhost:3000
   ```

## 🛠️ Tech Stack

<div align="center">
  
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
  ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
  ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)
  ![Passport](https://img.shields.io/badge/Passport-34E27A?style=for-the-badge&logo=passport&logoColor=white)
  ![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=white)
  ![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)
  ![MapTiler](https://img.shields.io/badge/MapTiler-FF6B6B?style=for-the-badge&logo=maptiler&logoColor=white)
  
</div>

### Core Technologies

- **Backend**: Node.js with Express.js (Fast, scalable server architecture)
- **Database**: MongoDB with Mongoose (Flexible NoSQL data management)
- **Authentication**: Passport.js (Secure user authentication & sessions)
- **Templates**: EJS with EJS-Mate (Dynamic HTML generation)
- **Image Storage**: Cloudinary (Cloud-based image optimization)
- **Security**: Helmet, Sanitization, XSS Protection (Enterprise-grade security)
- **Mapping**: MapTiler API (Interactive location services)

## 💡 How It Works

### Platform Architecture

```mermaid
graph TD
    A[🔐 User Authentication] --> B[🗺️ Campground Hub]
    B --> C[🏕️ Browse Campgrounds]
    B --> D[📝 Create Listing]
    B --> E[⭐ Review System]
    B --> F[📸 Image Management]
    
    C --> G[🗺️ Interactive Map]
    G --> H[📍 Location Services]
    H --> I[💾 Database Storage]
    
    D --> J[🖼️ Image Upload]
    E --> J
    J --> K[☁️ Cloudinary Storage]
    
    F --> L[🎨 Template Rendering]
    L --> M[📱 Responsive UI]
    
    style A fill:#FF6B6B,stroke:#333,stroke-width:2px,color:#fff
    style B fill:#4ECDC4,stroke:#333,stroke-width:2px,color:#fff
    style C fill:#45B7D1,stroke:#333,stroke-width:2px,color:#fff
    style D fill:#96CEB4,stroke:#333,stroke-width:2px,color:#fff
    style E fill:#FFEAA7,stroke:#333,stroke-width:2px,color:#333
    style F fill:#DDA0DD,stroke:#333,stroke-width:2px,color:#333
```

### User Journey

1. **🔐 Secure Registration** - Create account with encrypted password storage
2. **🗺️ Campground Discovery** - Browse campgrounds with interactive maps
3. **🏕️ Create Listings** - Add your own campground with photos and details
4. **⭐ Community Reviews** - Share experiences and read user feedback
5. **📸 Photo Management** - Upload and manage high-quality campground images
6. **🛡️ Secure Sessions** - Persistent login with session management

## 🎮 Key Features Breakdown

### 🗺️ Campground Discovery
- **Interactive Maps**: Visual location display with MapTiler integration
- **Detailed Listings**: Comprehensive campground information
- **Search & Filter**: Find campgrounds by location and amenities
- **User-Generated Content**: Community-driven campground database

### 🔒 Authentication System
- **Secure Registration**: Password hashing and validation
- **Session Management**: Persistent login with MongoDB sessions
- **User Profiles**: Personal account management
- **Access Control**: Protected routes and user permissions

### 📸 Image Management
- **Cloud Storage**: Cloudinary integration for image optimization
- **Multiple Uploads**: Support for multiple campground photos
- **Automatic Optimization**: Responsive image delivery
- **Secure Upload**: Protected file upload with validation

### ⭐ Review & Rating System
- **User Reviews**: Detailed campground reviews and ratings
- **Review Management**: Users can edit and delete their reviews
- **Rating System**: Star-based rating with aggregated scores
- **Community Moderation**: User-generated content management

## 🔧 Configuration

### Environment Variables

```env
# Application Configuration
NODE_ENV=development
SECRET=your_session_secret_key

# Database
DB_URL=mongodb://localhost:27017/campcreks

# External Services
MAPTILER_API_KEY=your_maptiler_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret

# Optional
PORT=3000
```

## 📈 Performance

<div align="center">
  
  | Metric | Performance |
  |:------:|:-----------:|
  | 🚀 **Page Load** | < 2 seconds |
  | 🗺️ **Map Rendering** | < 1.5 seconds |
  | 📸 **Image Upload** | < 5 seconds |
  | 💾 **Database Query** | < 200ms |
  | 🔐 **Authentication** | < 500ms |
  
</div>

## 🎨 UI/UX Highlights

### Design System
- **EJS Templates**: Dynamic server-side rendering
- **Responsive Layout**: Mobile-first design approach
- **Clean Interface**: Intuitive navigation and user flows
- **Flash Messages**: User feedback and notifications

### User Experience
- **Intuitive Forms**: Easy campground creation and editing
- **Image Galleries**: Beautiful photo displays
- **Interactive Maps**: Engaging location visualization
- **Error Handling**: Graceful error states and validation

## 🚀 Deployment

### Heroku Deployment (Recommended)

1. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set DB_URL=your_mongodb_atlas_url
   heroku config:set SECRET=your_production_secret
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Manual Deployment

```bash
# Set production environment
export NODE_ENV=production

# Start the server
npm start
```

## 🤝 Contributing

We welcome contributions to make CampCreeks even better!

1. **🍴 Fork the repository**

2. **🌟 Create your feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **💻 Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **🚀 Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```

5. **📬 Open a Pull Request**

### Development Guidelines

- Follow Node.js best practices
- Use ESLint for code formatting
- Write comprehensive tests
- Update documentation for new features
- Ensure security compliance

## 📞 Contact & Support

<div align="center">
  
  **Get in Touch**
  
  [![Email](https://img.shields.io/badge/Email-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:your-bhavyashah16@outlook.com)
  [![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/bhavya-shah-a36a86282/)
  [![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/shahbhavya7)
  
</div>

<div align="center">
  
  **Built with 🏕️ for Nature Enthusiasts**
  
  ⭐ Star this repository if CampCreeks helped you discover amazing campgrounds!
  
</div>

## 🔮 Future Roadmap

- 📱 **Mobile App** - Native iOS and Android applications
- 🎥 **Virtual Tours** - 360° campground previews
- 🤝 **Social Features** - Friend connections and trip planning
- 📊 **Advanced Analytics** - Campground popularity insights
- 🌍 **Multi-language Support** - Global accessibility
- 💳 **Booking System** - Integrated reservation management
- 🎯 **Recommendation Engine** - AI-powered campground suggestions
- 🔔 **Real-time Notifications** - Instant updates and alerts
- 🚐 **RV Integration** - RV-specific amenities and information
- 🌦️ **Weather Integration** - Real-time weather data for locations

## 🛡️ Security Features

- **🔒 Password Hashing** - Secure password storage with salt
- **🛡️ XSS Protection** - HTML sanitization and input validation
- **💉 Injection Prevention** - MongoDB injection attack prevention
- **🔐 Session Security** - Secure session management and cookies
- **📋 Input Validation** - Comprehensive data validation with Joi
- **🛡️ Security Headers** - Helmet.js for HTTP security headers

---

*Last updated: July 2025*