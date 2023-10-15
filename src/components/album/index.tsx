import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Post as PostType } from "../../types/post.interface";
import AreaPost from "../post";
import { getAllPosts, getLocationPosts } from "../../services/post.service";
import { RootState } from "../../store";
import { AlbumWrapper, AlbumStyle } from "./AlbumStyles";

interface AlbumProps {
  areaId: number | null;
  showAllPosts: boolean;
}

const loadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
};

const Album: React.FC<AlbumProps> = ({ areaId, showAllPosts }: AlbumProps) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const searchResults = useSelector((state: RootState) => state.search.posts);

  useEffect(() => {
    const loadPosts = async () => {
      if (searchResults.length > 0) {
        setPosts(searchResults);
        setIsLoading(false);
      } else if (showAllPosts) {
        try {
          const allPosts = await getAllPosts();
          for (let post of allPosts) {
            for (let imageUrl of post.image) {
              await loadImage(imageUrl);
            }
          }
          setPosts(allPosts);
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false);
        }
      } else if (areaId !== null) {
        try {
          const matchedPost = await getLocationPosts(areaId);

          for (let post of matchedPost) {
            for (let imageUrl of post.image) {
              await loadImage(imageUrl);
            }

            setPosts(matchedPost);
          }
        } catch (error) {
          console.error("Error:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    loadPosts();
  }, [areaId, searchResults, showAllPosts]);

  return (
    <AlbumWrapper>
      <AlbumStyle>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          posts.map((post, index) => (
            <AreaPost comment={[]} {...post} key={index} />
          ))
        )}
      </AlbumStyle>
    </AlbumWrapper>
  );
};

export default Album;
