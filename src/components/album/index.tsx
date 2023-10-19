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
  const [displayedPosts, setDisplayedPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [pageEndIndex, setPageEndIndex] = useState<number>(8);

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
          setDisplayedPosts(allPosts.slice(0, pageEndIndex));
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
  }, [areaId, pageEndIndex, searchResults, showAllPosts]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop !==
        document.documentElement.offsetHeight
      )
        return;
      if (
        window.innerHeight + window.scrollY + 1 >= document.body.offsetHeight ||
        window.innerHeight + document.documentElement.scrollTop !==
          document.documentElement.offsetHeight
      ) {
        setPageEndIndex((prevEndIndex) => prevEndIndex + 8);
      }
    }
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setDisplayedPosts(posts.slice(0, pageEndIndex));
  }, [pageEndIndex, posts]);

  return (
    <AlbumWrapper>
      <AlbumStyle>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          displayedPosts.map((post, index) => (
            <AreaPost comment={[]} {...post} key={index} />
          ))
        )}
      </AlbumStyle>
    </AlbumWrapper>
  );
};

export default Album;
