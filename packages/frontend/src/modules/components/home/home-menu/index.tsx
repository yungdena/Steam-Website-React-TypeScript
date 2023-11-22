import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../../../common/consts";
import { useGetAppsByTags, useGetTitle } from "../../../common/services/apps.service";
import { Tags } from "../../../common/utils/tags";

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
      getAppsByTagsMutation.mutate([tags], {
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
      <RecentContainer style={{ minHeight: "220px" }}>
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
        {Object.values(Tags).map((tag) => (
          <TagLink key={tag} onClick={() => handleTagClick(tag)}>
            {tag}
          </TagLink>
        ))}
      </RecentContainer>
      <RecentContainer style={{ background: "none", top: "960px" }}>
        <TagTitle>Recommended</TagTitle>
        <TagLink>Tags</TagLink>
        <TagLink
          onClick={() =>
            history.push(
              `/${APP_KEYS.ROUTER_KEYS.STORE}/?onlySpecialOffers=true`
            )
          }
        >
          Special Offers
        </TagLink>
        <TagLink
          onClick={() =>
            history.push(`/${APP_KEYS.ROUTER_KEYS.STORE}/?price=Free`)
          }
        >
          Free Games
        </TagLink>
      </RecentContainer>
      <RecentContainer style={{ background: "none", top: "1060px" }}>
        <TagTitle>BROWSE BY GENRE</TagTitle>
        <TagLink onClick={() => handleTagClick("Action")}>Action</TagLink>
        <TagLink onClick={() => handleTagClick("Adventure")}>Adventure</TagLink>
        <TagLink onClick={() => handleTagClick("Racing")}>Racing</TagLink>
        <TagLink onClick={() => handleTagClick("RPG")}>RPG</TagLink>
        <TagLink onClick={() => handleTagClick("Indie")}>Indie</TagLink>
        <TagLink onClick={() => handleTagClick("Simulation")}>
          Simulation
        </TagLink>
        <TagLink onClick={() => handleTagClick("Strategy")}>Strategy</TagLink>
        <TagLink onClick={() => handleTagClick("Early Access")}>
          Early Access
        </TagLink>
      </RecentContainer>
    </>
  );
};