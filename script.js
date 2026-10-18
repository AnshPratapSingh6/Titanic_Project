const form = document.getElementById('passengerForm');
const el = id => document.getElementById(id);
const portNames = {S:'Southampton', C:'Cherbourg', Q:'Queenstown'};
function updateSummary() {
  const pclass = Number(el('pclass').value);
  const sex = el('sex').value;
  const age = Number(el('age').value);
  const fare = Number(el('fare').value);
  const sibsp = Number(el('sibsp').value || 0);
  const parch = Number(el('parch').value || 0);
  const port = el('embarked').value;
  el('sumClass').textContent = ({1:'1st Class',2:'2nd Class',3:'3rd Class'})[pclass];
  el('sumSex').textContent = sex === 'female' ? 'Female' : 'Male';
  el('sumAge').textContent = `${age} years`;
  el('sumFare').textContent = `£${fare.toFixed(2)}`;
  el('sumFamily').textContent = sibsp + parch;
  el('sumPort').textContent = portNames[port];
}
['pclass','sex','age','fare','sibsp','parch','embarked'].forEach(id => {
  el(id).addEventListener('input', updateSummary);
  el(id).addEventListener('change', updateSummary);
});
form.addEventListener('submit', event => {
  event.preventDefault();
  updateSummary();

  // DEMO ONLY: this transparent heuristic is not your trained ML model.
  // Replace this section with a request to your backend/model endpoint.
  const pclass = Number(el('pclass').value);
  const sex = el('sex').value;
  const age = Number(el('age').value);
  const fare = Number(el('fare').value);
  const sibsp = Number(el('sibsp').value || 0);
  const parch = Number(el('parch').value || 0);
  let score = 0.15;
  if (sex === 'female') score += 0.55;
  if (pclass === 1) score += 0.15;
  else if (pclass === 2) score += 0.07;
  if (age < 16) score += 0.12;
  if (fare > 50) score += 0.05;
  if (sibsp + parch > 3) score -= 0.08;
  score = Math.max(0.03, Math.min(0.97, score));
  const survived = score >= 0.5;
  const card = el('resultCard');
  card.classList.toggle('survived', survived);
  card.classList.toggle('not-survived', !survived);
  el('resultSymbol').textContent = survived ? '✓' : '×';
  el('resultTitle').textContent = survived ? 'Likely survived' : 'Likely did not survive';
  el('resultText').textContent = survived
    ? 'The demo rules suggest a higher likelihood of survival for these details.'
    : 'The demo rules suggest a lower likelihood of survival for these details.';
  el('scoreText').textContent = `${Math.round(score * 100)}% demo score`;
  el('progressBar').style.width = `${Math.round(score * 100)}%`;
});
updateSummary();
