import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../../../common/consts";
import { useGetAppsByTags, useGetTitle } from "../../../common/services/apps.service";

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

  const useTagClick = () => {
    const getAppsByTagsMutation = useGetAppsByTags();
    const history = useHistory();

    const handleTagClick = (tags: string) => {
      getAppsByTagsMutation.mutate(tags, {
        onSuccess: (data) => {
          history.push(`/store?tags=${tags}`);
        },
      });
    };

    return { handleTagClick };
  };

  const { handleTagClick } = useTagClick();

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
      <RecentContainer style={{ background: "none", top: "800px" }}>
        <TagTitle>Your Tags</TagTitle>
        <TagLink onClick={() => handleTagClick('FPS')}>FPS</TagLink>
        <TagLink>Fighting</TagLink>
        <TagLink>Action</TagLink>
        <TagLink>Open World</TagLink>
        <TagLink>Adventure</TagLink>
        <TagLink>Automobile Sim</TagLink>
      </RecentContainer>
      <RecentContainer style={{ background: "none", top: "960px" }}>
        <TagTitle>Recommended</TagTitle>
        <TagLink>Tags</TagLink>
      </RecentContainer>
      <RecentContainer style={{ background: "none", top: "1030px" }}>
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