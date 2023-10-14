// import React, { useEffect, useState } from "react";
// import { Post as PostType } from "../../types/post.interface";
// import AreaPost from "../post";
// import { getLocationPosts } from "../../services/post.service";
// import { AlbumWrapper, AlbumStyle } from "./AlbumStyles";

// interface Props {
//   areaId: number;
// }

// const loadImage = (src: string): Promise<void> => {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.src = src;
//     img.onload = () => {
//       resolve();
//     };
//     img.onerror = () => {
//       resolve();
//     };
//   });
// };

// const Album: React.FC<Props> = ({ areaId }) => {
//   const [posts, setPosts] = useState<PostType[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     setIsLoading(true);
//     getLocationPosts(areaId)
//       .then(async (matchedPosts) => {
//         await Promise.all(
//           matchedPosts.map((post) =>
//             post.image.map((imageUrl) => loadImage(imageUrl))
//           )
//         );

//         setPosts(matchedPosts);
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error:", error); // 네트워크 요청 중 발생한 에러 출력
//         setIsLoading(false);
//       });
//   }, [areaId]);

//   return (
//     <AlbumWrapper>
//       <AlbumStyle>
//         {isLoading ? (
//           <div>Loading...</div>
//         ) : (
//           posts.map((post, index) => (
//             <AreaPost comment={[]} {...post} key={index} />
//           ))
//         )}
//       </AlbumStyle>
//     </AlbumWrapper>
//   );
// };

// export default Album;

import React, { useEffect, useState } from "react";
import { Post as PostType } from "../../types/post.interface";
import AreaPost from "../post";
import { getLocationPosts } from "../../services/post.service";
import { AlbumWrapper, AlbumStyle } from "./AlbumStyles";

interface Props {
  areaId: number;
}

const loadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => resolve();
  });
};

const Album: React.FC<Props> = ({ areaId }) => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getLocationPosts(areaId)
      .then(async (matchedPosts) => {
        // 모든 이미지 로딩을 기다립니다.
        for (let post of matchedPosts) {
          for (let imageUrl of post.image) {
            await loadImage(imageUrl);
          }
        }

        setPosts(matchedPosts);
        setIsLoading(false); // 모든 이미지가 로드되면 로딩 상태를 false로 설정합니다.
      })
      .catch((error) => {
        console.error("Error:", error);
        setIsLoading(false);
      });
  }, [areaId]);

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
