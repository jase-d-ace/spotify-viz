import type { Ranking } from "@types";

export default function RankCheck({ rankings }: { rankings: Ranking }) {
  return (
    <div className="rank-check">
      <h2>Rank Check</h2>
      <div className="rank-check-container">
        <div className="rank-check-content">
          <h3>Rank Check Content</h3>
          <p>{rankings.letter_ranking}</p>
          <p>{rankings.number_ranking}</p>
          <p>{rankings.description}</p>
        </div>
      </div>
    </div>
  )
}