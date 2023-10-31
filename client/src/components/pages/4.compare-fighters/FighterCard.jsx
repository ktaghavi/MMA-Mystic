function FighterCard({ fighter }) {
  return (
    <div className="fighter-card">
      <h3>{fighter.name}</h3>
      <p>Height: {fighter.height} inches</p>
      <p>Stance: {fighter.stance}</p>
      <p>Significant Strikes Landed per Minute: {fighter.SigLpM}</p>
      <p>Striking Accuracy: {fighter.StrAcc}%</p>
      <p>Significant Strikes Absorbed per Minute: {fighter.SApM}</p>
      <p>Striking Defense: {fighter.StrDef}%</p>
      <p>Takedowns Average: {fighter.TDAvg}</p>
      <p>Takedown Accuracy: {fighter.TDAcc}%</p>
      <p>Takedown Defense: {fighter.TDDef}%</p>
      <p>Submission Average: {fighter.SubAvg}</p>
    </div>
  );
}

export default FighterCard;