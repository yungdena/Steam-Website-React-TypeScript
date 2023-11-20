import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../../../common/consts";
import { useGetTitle } from "../../../common/services/apps.service";

import { RecentContainer, TagLink, TagTitle } from "./index.styled"

export const HomeMenu = () => {
  const [recentApps, setRecentApps] = useState<any>([]);
  const getAppsTitleMutation = useGetTitle();
  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    const fetchRecentAppsTitles = async () => {
      try {
        const parsedApps = JSON.parse(
          localStorage.getItem("recentGames") || "[]"
        );

        const titlesPromises = parsedApps.map(async (appId: string) => {
          try {
            const response = await getAppsTitleMutation.mutateAsync(appId);
            console.log(response);
            if (isMounted) {
              setRecentApps((prevTitles: string[]) => [
                ...prevTitles,
                { title: response.title, id: appId },
              ]);
            }
          } catch (error) {
            console.error(
              `Error fetching title for app with ID ${appId}`,
              error
            );
          }
        });

        await Promise.all(titlesPromises);
      } catch (error) {
        console.error("Error parsing recent apps IDs", error);
      }
    };

    fetchRecentAppsTitles();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      <RecentContainer>
        <TagTitle>Recently Viewed</TagTitle>
        {recentApps.slice(0, 7).map((app: any) => (
          <TagLink
            onClick={() =>
              history.push(`/${APP_KEYS.ROUTER_KEYS.APPS}/${app.id}`)
            }
            key={app.id}
          >
            {app.title}
          </TagLink>
        ))}
      </RecentContainer>
      <RecentContainer style={{ background: "none", top: "820px" }}>
        <TagTitle>Your Tags</TagTitle>
        <TagLink>FPS</TagLink>
        <TagLink>Fighting</TagLink>
        <TagLink>Action</TagLink>
        <TagLink>Open World</TagLink>
        <TagLink>Adventure</TagLink>
        <TagLink>Automobile Sim</TagLink>
      </RecentContainer>
      <RecentContainer style={{ background: "none", top: "1000px" }}>
        <TagTitle>Recommended</TagTitle>
        <TagLink>Tags</TagLink>
      </RecentContainer>
      <RecentContainer style={{ background: "none", top: "1080px" }}>
        <TagTitle>BROWSE BY GENRE</TagTitle>
        <TagLink>Action</TagLink>
        <TagLink>Adventure</TagLink>
        <TagLink>Racing</TagLink>
        <TagLink>RPG</TagLink>
        <TagLink>Indie</TagLink>
        <TagLink>Simulation</TagLink>
        <TagLink>Strategy</TagLink>
        <TagLink>Early Access</TagLink>
      </RecentContainer>
    </>
  );
};