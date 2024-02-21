import React from "react";
import "./episodeBoxStyle.css";

type episodeBoxProps = {
  highlight: boolean;
  children: React.ReactNode;
};

function EpisodeBox({ highlight, children }: episodeBoxProps) {
  return (
    <div className={highlight ? "box active" : "box"}>
      <p>{children}</p>
    </div>
  );
}

export default EpisodeBox;
