import TikTokEmbed from "./TiktokEmbed";
import './TiktokList.css'

export default function TikTokList() {
  const videos = [
    "7550271748952853782",
    "7546933833225178370",
    "7539510765036883222",
    "7537660279656566038",
    "7535453699812936982",
    "7534314332960820482",
    "7533663580378418454"
  ];

  return (
    <div className="tiktoklist">
      {videos.map(id => (
        <TikTokEmbed key={id} videoId={id} />
      ))}

      <script async src="https://www.tiktok.com/embed.js"></script>

    </div>
  );
}
