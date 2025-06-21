# 🛍️ YasirNest - Modern E-Commerce Platform

A beautiful, modern e-commerce web application built with React, TypeScript, and Tailwind CSS. This project demonstrates advanced frontend development skills with a focus on user experience, performance, and modern design patterns.

## ✨ Features

### 🎨 **Modern UI/UX Design**

- **Responsive Design**: Fully responsive across all devices
- **Modern Animations**: Smooth transitions and micro-interactions using Framer Motion
- **Glass Morphism**: Beautiful glass-like effects and gradients
- **Custom Components**: Reusable, accessible components with consistent styling

### 🛒 **E-Commerce Functionality**

- **Product Catalog**: Browse products with search and filtering
- **Product Details**: Detailed product pages with image galleries
- **Shopping Cart**: Full cart functionality with quantity management
- **Wishlist**: Add products to wishlist (UI ready)
- **Search & Filter**: Advanced search with category and price filters

### 🚀 **Performance & UX**

- **Loading States**: Beautiful loading animations and skeleton screens
- **Error Handling**: Graceful error states and user feedback
- **Local Storage**: Persistent cart data across sessions
- **Lazy Loading**: Optimized image loading for better performance
- **Smooth Navigation**: Client-side routing with React Router

### 📱 **Responsive & Accessible**

- **Mobile-First**: Optimized for mobile devices
- **Keyboard Navigation**: Full keyboard accessibility
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Touch-Friendly**: Optimized touch targets for mobile

## 🛠️ Technologies Used

### **Frontend Framework**

- **React 19**: Latest React with modern hooks and patterns
- **TypeScript**: Type-safe development experience
- **Vite**: Fast build tool and development server

### **Styling & UI**

- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Production-ready motion library
- **Lucide React**: Beautiful, customizable icons

### **State Management**

- **React Context**: Global state management for cart
- **Local Storage**: Persistent data storage

### **Routing**

- **React Router DOM**: Client-side routing

## 🎯 Key Features Showcase

### **1. Hero Section with Search**

- Animated hero section with gradient backgrounds
- Real-time search functionality
- Search results with product count

### **2. Advanced Product Filtering**

- Category-based filtering
- Price range slider
- Multiple sorting options (price, rating, name)
- Grid/List view toggle

### **3. Enhanced Product Cards**

- Hover effects with quick actions
- Stock status indicators
- Rating display with stars
- Discount badges
- Wishlist functionality

### **4. Shopping Cart Experience**

- Persistent cart across sessions
- Quantity management
- Real-time total calculation
- Order summary with tax calculation
- Empty cart state

### **5. Product Details Page**

- Image gallery with thumbnails
- Detailed product information
- Quantity selector
- Add to cart with quantity
- Related product suggestions (UI ready)

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd shop-nest
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Navbar.tsx      # Navigation with search
│   ├── ProductCard.tsx # Product display card
│   └── SplashScreen.tsx # Loading screen
├── pages/              # Page components
│   ├── Home.tsx        # Main product listing
│   ├── Cart.tsx        # Shopping cart
│   └── ProductDetails.tsx # Product detail page
├── context/            # React Context
│   └── CartContext.tsx # Cart state management
├── types/              # TypeScript type definitions
│   └── product.ts      # Product interface
├── utils/              # Utility functions
│   └── formatCurrency.ts # Currency formatting
└── App.tsx             # Main app component
```

## 🎨 Design System

### **Color Palette**

- **Primary**: Blue (#2563eb) to Purple (#7c3aed) gradient
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Green for success states, Red for errors

### **Typography**

- **Font**: Poppins (Google Fonts)
- **Weights**: 400 (Regular), 600 (Semi-bold)

### **Components**

- **Cards**: Rounded corners with subtle shadows
- **Buttons**: Consistent styling with hover states
- **Inputs**: Focus states with blue ring
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Customization

### **Adding New Features**

1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update routing in `App.tsx`
4. Add types in `src/types/`

### **Styling Changes**

- Modify Tailwind classes in components
- Add custom CSS in `src/index.css`
- Update color scheme in `tailwind.config.js`

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance Optimizations

- **Code Splitting**: Route-based code splitting
- **Image Optimization**: Lazy loading and proper sizing
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Local storage for cart persistence

## 🎯 Future Enhancements

- [ ] User authentication and profiles
- [ ] Payment integration (Stripe)
- [ ] Product reviews and ratings
- [ ] Advanced filtering (brand, color, size)
- [ ] Wishlist functionality
- [ ] Order history
- [ ] Admin dashboard
- [ ] PWA capabilities
- [ ] Dark mode toggle
- [ ] Internationalization (i18n)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Developer

**Yasir** - Frontend Developer

- **Portfolio**: [Portfolio](yasirarafath.vercel.app)
- **LinkedIn**: [LinkedIn](linkedin.com/mdyasirarafath)
- **GitHub**: [Github](github.com/mdyasir1)

---

⭐ **Star this repository if you found it helpful!**

---

_Built with ❤️ using React, TypeScript, and Tailwind CSS_
