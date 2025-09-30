# Connect - Product Discovery Platform

A modern, responsive React application for browsing and discovering products with advanced filtering and search capabilities.

## 🚀 Features

- **Real-time Search** - Instantly search products by title or creator
- **Advanced Filtering** - Filter products by pricing options (Paid, Free, View-only)
- **Responsive Design** - Fully responsive grid layout that adapts to all screen sizes
- **State Management** - Redux Toolkit for efficient state management
- **Modern Styling** - SCSS with BEM methodology and nested selectors
- **Performance Optimized** - Memoized selectors for efficient filtering
- **Error Handling** - Graceful error states with retry functionality
- **Loading States** - Smooth loading indicators for better UX

## 🛠️ Technologies Used

- **React 19** - Latest React with modern hooks
- **Redux Toolkit** - State management with Redux best practices
- **React-Redux** - Official React bindings for Redux
- **Vite** - Next-generation frontend build tool
- **SCSS/Sass** - Advanced CSS preprocessing with variables and nesting
- **ESLint** - Code quality and consistency

## 📋 Prerequisites

Before running this project, make sure you have:

- **Node.js** (v20.17.0 or higher)
- **npm** (v11.6.1 or higher)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd connect
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

## 🏃 Running the Application

### Development Mode

Start the development server on `http://localhost:3000`:

```bash
npm start
```

or

```bash
npm run dev
```

### Production Build

Build the application for production:

```bash
npm run build
```

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

## 📁 Project Structure

```
connect/
├── public/              # Static assets
│   └── fonts/          # Font files
├── src/
│   ├── components/     # React components
│   │   ├── Header/
│   │   ├── Search/
│   │   ├── ProductGrid/
│   │   ├── ProductCard/
│   │   ├── Loading/
│   │   ├── Error/
│   │   └── NoResults/
│   ├── store/          # Redux store configuration
│   │   ├── store.js           # Store setup
│   │   ├── productsSlice.js   # Products state management
│   │   ├── filtersSlice.js    # Filters state management
│   │   └── selectors.js       # Memoized selectors
│   ├── styles/         # Global SCSS variables
│   │   └── _variables.scss
│   ├── App.jsx         # Main App component
│   ├── main.jsx        # Application entry point
│   ├── index.scss      # Global styles
│   └── fonts.scss      # Font definitions
├── package.json
├── vite.config.js      # Vite configuration
└── README.md
```

## 🎨 Styling Architecture

The project uses **SCSS** with a well-organized architecture:

- **Variables** (`src/styles/_variables.scss`) - Centralized design tokens
  - Colors (primary, secondary, brand, accents)
  - Spacing scale
  - Border radius values
  - Transitions
  - Breakpoints
  - Font families

- **BEM Methodology** - Block Element Modifier naming convention
- **CSS Modules** - Scoped styles for each component
- **Nested Selectors** - Leveraging SCSS nesting for cleaner code
- **Responsive Design** - Mobile-first approach with breakpoints

## 🗄️ State Management

The application uses **Redux Toolkit** with the following slices:

### Products Slice (`productsSlice.js`)
- Manages product data fetching
- Handles loading and error states
- Uses `createAsyncThunk` for API calls

### Filters Slice (`filtersSlice.js`)
- Manages search term
- Handles pricing filter selections
- Actions: `setSearchTerm`, `togglePricingFilter`, `resetPricingFilter`

### Selectors (`selectors.js`)
- **Memoized selectors** using `createSelector` for performance
- `selectFilteredProducts` - Efficiently filters products based on search and pricing

## 🌐 API

The application fetches data from:
```
https://closet-recruiting-api.azurewebsites.net/api/data
```

## 📱 Responsive Breakpoints

- **Desktop** - 1200px and above (4 columns)
- **Tablet** - 768px to 1199px (3 columns)
- **Mobile Large** - 480px to 767px (2 columns)
- **Mobile** - Below 480px (1 column)

## 🎯 Component Overview

### Header
Brand logo and navigation

### Search
Search input with filter checkboxes for pricing options

### ProductGrid
Responsive grid layout for products

### ProductCard
Individual product display with:
- Product image
- Title and creator
- Pricing information
- Badge indicators (Buy Now, Free, View Only)

### Loading
Animated spinner during data fetch

### Error
Error state with retry functionality

### NoResults
Empty state when no products match filters

## 🚀 Performance Features

- **Memoized Selectors** - Prevents unnecessary recalculations
- **Code Splitting** - Optimized bundle size
- **Lazy Loading** - Efficient resource loading
- **CSS Modules** - Scoped styles prevent conflicts

## 🔒 Code Quality

- ESLint configuration for React best practices
- Consistent code formatting
- Component-based architecture
- Proper error boundaries

## 📄 License

This project is private and not licensed for public use.

## 👨‍💻 Development

Built with modern web development best practices:
- Functional components with hooks
- Redux Toolkit for state management
- SCSS for advanced styling
- Vite for fast development and builds

---

**Happy Coding! 🎉**
