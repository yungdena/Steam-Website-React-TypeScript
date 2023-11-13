import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { APP_KEYS } from "../../../common/consts";
import { useUserData } from "../../../common/context/user-context";
import { useCreatePost } from "../../../common/services/community.service";
import { IPost } from "../../../common/types/Post.interface";
import { Header } from "../../header";
import { Footer } from "../../home/footer";
import { CancelButton } from "../../profile/edit/index.styled";
import { Background } from "../index.styled";
import { CreatePostButton, Input, MainContainer, PreviewImage, StyledTextArea } from "./index.styled";

export const CreatePost = () => {
  const UserDataContext = useUserData();
  const history = useHistory();

  const defaultPost: Partial<IPost> = {
    title: '',
    description: '',
    image: '',
    user: UserDataContext?.userData?._id || '',
    likes: {
      count: 0,
      users: []
    },
    comments: {},
  }

  const [post, setPost] = useState<IPost>(defaultPost as IPost);
  const [initialCloudinaryImageURL, setInitialCloudinaryImageURL] = useState<
    string | null
  >(null);
  const [cloudinaryImageURL, setCloudinaryImageURL] = useState<string | null>(
    initialCloudinaryImageURL
  );

  const createPostMutation = useCreatePost();
  const cloudinaryRef = useRef();
  const widgetRef = useRef<CloudinaryWidget | null>(null);

  interface CloudinaryWidget {
    open: () => void;
  }

  useEffect(() => {
    if (cloudinaryImageURL !== null) {
      setInitialCloudinaryImageURL(cloudinaryImageURL);
      if (post && cloudinaryImageURL) {
        setPost({ ...post, image: cloudinaryImageURL });
      }
    }
  }, [cloudinaryImageURL]);

  useEffect(() => {
    cloudinaryRef.current = (window as any).cloudinary;
    widgetRef.current = (cloudinaryRef.current as any).createUploadWidget(
      {
        cloudName: "didkbrlcz",
        uploadPreset: "deul5wc5"
      },
      function (err: any, result: any) {
        if (!err && result && result.info && result.info.secure_url) {
          setCloudinaryImageURL(result.info.secure_url);
        }
      }
    );
  }, []);

  const handleCreatePost = async () => {
    try {
      if (post && cloudinaryImageURL) {
        setPost({ ...post, image: cloudinaryImageURL });

        const newPost = await createPostMutation.mutateAsync({ postData: {...post} });
        history.push(`/${APP_KEYS.ROUTER_KEYS.COMMUNITY}`);
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (post) {
      setPost({ ...post, title: event.target.value });
    }
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    if (post) {
      setPost({ ...post, description: event.target.value });
    }
  };

  useEffect(() => {
    if (UserDataContext?.userData) {
      setPost({ ...post, user: UserDataContext?.userData?._id })
    }
  }, [UserDataContext])

  console.log({ postData: { ...post } });

  return (
    <>
      <Header />
      <Background>
        <MainContainer>
          {post && (
            <>
              <Input
                type="text"
                placeholder="Title"
                value={post.title}
                onChange={handleTitleChange}
              />
              <StyledTextArea
                placeholder="Description"
                value={post.description}
                onChange={handleDescriptionChange}
              />
            </>
          )}
          <CancelButton
            type="button"
            onClick={() => (widgetRef.current as CloudinaryWidget).open()}
            style={{ marginTop: "2rem" }}
          >
            Upload Image
          </CancelButton>
          <PreviewImage
            src={
              post.image ||
              "https://res.cloudinary.com/didkbrlcz/image/upload/v1699599822/preview-2_djgbzq.jpg"
            }
          />
          <CreatePostButton onClick={handleCreatePost}>Create Post</CreatePostButton>
        </MainContainer>
      </Background>
      <Footer />
    </>
  );
};
