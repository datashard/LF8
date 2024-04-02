import { Leaderboard } from "./routes/Leaderboard.js";
// import { FetchData } from "./routes/FetchData";
import { Home } from "./routes/Home.js";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/leaderboard',
    element: <Leaderboard />
  }
];

export default AppRoutes;
