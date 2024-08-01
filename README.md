# Inventotrack

**Inventotrack** is a comprehensive order and inventory management software designed to streamline your business operations. Whether you're managing a small business or a large enterprise, our solution provides powerful tools to track orders, manage inventory levels, and optimize your supply chain.

## Features

- **Real-Time Order and Inventory Tracking**: Monitor your orders and inventory in real-time to ensure accurate and up-to-date information at your fingertips.

- **Automated Stock Alerts**: Get notified when inventory levels are low, preventing stockouts and ensuring you can fulfill customer demands promptly.

- **Detailed Reporting**: Generate in-depth reports to gain insights into your inventory and order management processes, helping you make informed decisions.

- **Supply Chain Optimization**: Improve your supply chain efficiency by leveraging our tools to manage inventory levels and track orders.

## Getting Started

### Prerequisites

- Ensure you have the required system specifications and dependencies installed before deploying Inventotrack.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/PolySpade/InventoTrack.git
   ```
2. Navigate to the project directory:
   ```bash
   cd inventotrack then cd frontend / cd backend
   ```
3. Install the necessary dependencies:
   ```bash
   npm install
   ```
4. Set up your environment variables by creating a `.env` file in the frontend and backend directory:
   ### Frontend
   ```
   VITE_MODE="<Development/Preview/Production>"
   VITE_PORT="3000"
   VITE_API_URL="http://localhost:3000"
   ```

   ### Backend
   ```
   ORIGIN="http://localhost:4000"
   NODE_ENV="<Development/Preview/Production>"
   DB_URL="<MONGODB URL>"
   PORT="4000"
   SECRET="<Any Secret Phrase>"

   ```

### Usage

1. Start the application, run this command for both frontend and backend folder.
   ```bash
   npm run dev
   ```
2. Access the frontend application at `http://localhost:3000` in your browser.
3. Access the backend server at `http://localhost:4000` in your browser.

## License

This project is licensed under the MIT License - see [MIT License](https://choosealicense.com/licenses/mit/) for details.

## Credits

This project was developed by **CSSWENG S13 GROUP 10**:

- Ang
- De Los Santos
- Presas
- Sanchez
- Sarreal
- To
- Veracruz
- Xu

---
