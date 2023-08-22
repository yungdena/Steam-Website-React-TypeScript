export const handleNavigate =
  (history: any, route: string) => (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("navigate");
    event.preventDefault();

    history.replace(route);
    console.log("history replaced");
  };
