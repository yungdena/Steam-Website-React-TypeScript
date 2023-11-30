import { APP_KEYS } from "../consts";
import { IApp } from "../types/app.interface";

export const handleNavigate =
  (history: any, route: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    history.replace(route);
  };

export const handleNavigateToApp = (appId: string, history: any) => {
  const recentGamesKey = "recentGames";
  const maxRecentGames = 7;

  let recentGames: string[] = JSON.parse(
    localStorage.getItem(recentGamesKey) || "[]"
  );

  const alreadyInList = recentGames.includes(appId);

  if (!alreadyInList) {
    if (recentGames.length >= maxRecentGames) {
      recentGames.shift();
    }

    recentGames.push(appId);

    localStorage.setItem(recentGamesKey, JSON.stringify(recentGames));
  }

  history.push("/" + APP_KEYS.ROUTER_KEYS.APPS + "/" + appId);
};