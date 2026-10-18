# Titanic Survival Predictor UI

A responsive front-end demo built with HTML, CSS, and JavaScript.

## Files
- `index.html` — page structure and passenger form
- `style.css` — responsive styling
- `script.js` — summary updates and demo-only prediction behavior

## Run
Open `index.html` in a browser.

## Important: connect the trained model
The current JavaScript prediction is a demo heuristic, not a real prediction from your notebook. For real predictions, expose your saved scikit-learn pipeline through a backend (for example, Flask or FastAPI) and replace the demo section in `script.js` with a `fetch()` request. Make sure the backend uses the same feature order, encoding, and preprocessing as the trained model.
