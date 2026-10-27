import { ArrowUpRight, Send } from "lucide-react";

function TelegramButton({ url }) {
  if (!url) return null;

  return (
    <a
      className="telegram-btn"
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <Send size={19} />
      CONNECT VIA TELEGRAM
      <ArrowUpRight size={19} />
    </a>
  );
}

export default TelegramButton;