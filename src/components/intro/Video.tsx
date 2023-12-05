import YouTube from "react-youtube";

export default function Video() {
  return (
    <YouTube
      videoId="h8LgupBsaxQ" //동영상 주소
      opts={{
        width: "100%",
        height: "600px",
        playerVars: {
          autoplay: 1, //자동 재생 여부
          modestbranding: 1, //컨트롤 바에 유튜브 로고 표시 여부
          loop: 1, //반복 재생
          playlist: "h8LgupBsaxQ", //반복 재생으로 재생할 플레이 리스트
        },
      }}
      onReady={(e) => {
        e.target.mute(); //소리 끔
      }}
    />
  );
}
