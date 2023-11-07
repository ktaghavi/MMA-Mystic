function FighterCard({ fighter }) {
  return (
    <div className="fighter-card">
      <h3>{fighter.name}</h3>
      <p>Height: {fighter.height}</p>
      <p>Weight: {fighter.weight}</p>
      <p>Reach: {fighter.reach}</p>
      <p>Stance: {fighter.stance}</p>
      <p>Significant Strikes Landed per Minute: {fighter.SLpM}</p>
      <p>Striking Accuracy: {fighter.Str_Acc}%</p>
      <p>Significant Strikes Absorbed per Minute: {fighter.SApM}</p>
      <p>Striking Defense: {fighter.Str_Def}%</p>
      <p>Takedowns Average: {fighter.TD_Avg}</p>
      <p>Takedown Accuracy: {fighter.TD_Acc}%</p>
      <p>Takedown Defense: {fighter.TD_Def}%</p>
      <p>Submission Average: {fighter.Sub_Avg}</p>
    </div>
  );
}

export default FighterCard;