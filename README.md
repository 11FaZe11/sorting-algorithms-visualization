# Algorithm Visualizer - Interactive Learning Platform

A comprehensive, interactive web application for learning and visualizing algorithms with beautiful neon-themed animations. Built with Next.js 16, React 19, and TypeScript.

![Algorithm Visualizer](public/placeholder-logo.svg)

## Features

### Algorithm Visualizations

- **Sorting Algorithms** (10 algorithms)
  - Bubble Sort, Selection Sort, Insertion Sort, Merge Sort, Quick Sort
  - Heap Sort, Radix Sort, Counting Sort, Shell Sort, Bucket Sort
  - Real-time bar chart visualization with color-coded states
  - Adjustable speed and array size controls

- **Search Algorithms** (6 algorithms)
  - Linear Search, Binary Search, Jump Search
  - Interpolation Search, Exponential Search, Ternary Search
  - Step-by-step visualization with highlighted elements
  - Target value selection and found/not found states

- **Pathfinding Algorithms** (4 algorithms)
  - Breadth-First Search (BFS), Depth-First Search (DFS)
  - Dijkstra's Algorithm, A* Algorithm
  - Interactive maze creation with drag-to-draw walls
  - Multiple maze generation patterns (Random, Recursive Division)
  - Click to set start/end positions

- **Graph Algorithms** (3 algorithms)
  - BFS and DFS for graph traversal
  - Dijkstra's Shortest Path
  - Interactive node-based visualization with weighted edges
  - Multiple graph generation patterns (Random, Complete, Tree)

### Educational Resources

- **Complete Algorithm Documentation**
  - Detailed pseudocode for every algorithm
  - Python implementations with docstrings
  - JavaScript implementations
  - Time and space complexity analysis
  - Best/worst case scenarios
  - Real-world use cases
  - Syntax highlighting for code blocks

### Interactive Learning Tools

- **12 Algorithm Practice Games**
  - Sort Race (drag-and-drop sorting)
  - Guess Master (binary search training)
  - Stack Tower (Tower of Hanoi puzzle)
  - Queue Master (queue management)
  - Maze Speedrun (pathfinding practice)
  - Complexity Match (memory game)
  - Recursion Tower (Fibonacci visualization)
  - Hash Table Hunt (collision handling)
  - Tree Builder (BST construction)
  - Graph Coloring (graph theory)
  - Greedy Coin (coin change problem)
  - Linked List Runner (list traversal)

### Development Tools

- **AI Chatbot**
  - Programming assistance powered by RapidAPI
  - Code explanation and debugging help
  - Syntax-highlighted responses
  - Copy-to-clipboard functionality

- **Code Editor**
  - In-browser JavaScript execution
  - Multiple file tabs with examples
  - Syntax highlighting
  - Console output capture
  - Code download and copy features

### Customization

- **7 Theme Options**
  - Neon Purple (default)
  - Ocean Blue, Sunset Orange, Forest Green
  - Cyberpunk Pink, Rose Gold, Purple Haze
  - Persistent theme selection with localStorage
  - Dynamic color transitions

### Design Features

- Animated particle background with connection lines
- Smooth animations and transitions throughout
- Fully responsive design (desktop, tablet, mobile)
- Touch-optimized controls for mobile devices
- Neon glow effects and modern UI
- Accessible design with proper ARIA labels

## Installation

### Prerequisites

- Node.js 18+ (recommended: Node.js 20+)
- npm, yarn, or pnpm package manager

### Clone the Repository

\`\`\`bash
git clone https://github.com/yourusername/algorithm-visualizer.git
cd algorithm-visualizer
\`\`\`

### Install Dependencies

Using npm:
\`\`\`bash
npm install
\`\`\`

Using yarn:
\`\`\`bash
yarn install
\`\`\`

Using pnpm:
\`\`\`bash
pnpm install
\`\`\`

### Environment Variables (Optional)

For the AI chatbot feature, create a `.env.local` file in the root directory:

\`\`\`env
# RapidAPI Key for AI Chatbot (optional)
NEXT_PUBLIC_RAPIDAPI_KEY=your_rapidapi_key_here
\`\`\`

Note: The AI chatbot is optional and the app works fully without it.

### Run Development Server

\`\`\`bash
npm run dev
# or
yarn dev
# or
pnpm dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## Usage Guide

### Sorting Visualizer

1. Navigate to the "Sorting" tab
2. Select an algorithm from the sidebar
3. Adjust array size and animation speed
4. Click "Generate New Array" to create random data
5. Press "Play" to watch the algorithm in action
6. View complexity and algorithm details below

### Search Visualizer

1. Navigate to the "Search" tab
2. Choose a search algorithm
3. Set the target value to find
4. Adjust array size and speed
5. Press "Play" to visualize the search process

### Pathfinding Visualizer

1. Navigate to the "Pathfinding" tab
2. Select an algorithm (BFS, DFS, Dijkstra, A*)
3. Choose a maze generation pattern or draw your own:
   - Click to toggle walls
   - Select "Edit Start" or "Edit End" to move positions
4. Press "Play" to find the path
5. Reset to generate a new maze

### Graph Visualizer

1. Navigate to the "Graph" tab
2. Pick a graph algorithm
3. Generate a graph (Random, Complete, or Tree)
4. Click nodes to set start and end points
5. Watch the algorithm explore the graph

### Algorithm Games

1. Click the floating game button (bottom right)
2. Select a game from the menu
3. Follow on-screen instructions
4. Track your score and improve your understanding

### Code Editor

1. Navigate to the "Code Editor" tab
2. Select or create a file tab
3. Write JavaScript code
4. Press "Run Code" to execute
5. View console output below the editor

### Theme Customization

1. Click the theme selector button (top right)
2. Choose from 7 color themes
3. Theme persists across sessions

## Technologies Used

- **Framework**: Next.js 16 (App Router)
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui + Radix UI
- **Animations**: Tailwind Animate + CSS Animations
- **Drag & Drop**: @dnd-kit
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

\`\`\`
algorithm-visualizer/
├── app/                          # Next.js App Router
│   ├── algorithms/              # Algorithm documentation page
│   ├── layout.tsx               # Root layout with theme provider
│   └── page.tsx                 # Main page with tabs
├── components/                   # React components
│   ├── games/                   # Algorithm practice games
│   ├── ui/                      # shadcn/ui components
│   ├── *-visualizer.tsx         # Visualization components
│   ├── *-control-panel.tsx      # Control components
│   ├── code-editor.tsx          # Code editor component
│   ├── ai-chat.tsx              # AI chatbot component
│   └── theme-selector.tsx       # Theme customization
├── lib/                         # Utility libraries
│   ├── sorting-algorithms.ts    # Sorting algorithm implementations
│   ├── search-algorithms.ts     # Search algorithm implementations
│   ├── pathfinding-algorithms.ts # Pathfinding algorithms
│   ├── graph-algorithms.ts      # Graph algorithms
│   └── algorithm-details.ts     # Algorithm documentation data
├── public/                      # Static assets
└── styles/                      # Global styles

\`\`\`

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimization

- Server-side rendering with Next.js
- Code splitting and lazy loading
- Optimized animations with CSS transforms
- Canvas-based rendering for complex visualizations
- Debounced resize handlers
- Efficient state management

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Algorithm implementations inspired by classic computer science textbooks
- UI components from shadcn/ui
- Icons from Lucide React
- Built with Next.js and React

## Support

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact: your.email@example.com

---

Built with ❤️ by Your Name
