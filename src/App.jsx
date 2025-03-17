import { useState } from "react";

function App() {
  const [distribution, setDistribution] = useState("binomial");
  const [inputs, setInputs] = useState({});
  const [result, setResult] = useState(null);

  // Factorial function
  const factorial = (n) => (n <= 1 ? 1 : n * factorial(n - 1));

  // Binomial Probability Calculation
  const binomialProbability = (n, k, p) => {
    const nCk = factorial(n) / (factorial(k) * factorial(n - k));
    return nCk * Math.pow(p, k) * Math.pow(1 - p, n - k);
  };

  // Poisson Probability Calculation
  const poissonProbability = (k, lambda) => {
    return (Math.pow(lambda, k) * Math.exp(-lambda)) / factorial(k);
  };

  // Handle input changes
  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  // Calculate probability
  const calculate = () => {
    let res = 0;
    switch (distribution) {
      case "binomial":
        res = binomialProbability(
          parseInt(inputs.n),
          parseInt(inputs.k),
          parseFloat(inputs.p)
        );
        break;
      case "poisson":
        res = poissonProbability(parseInt(inputs.k), parseFloat(inputs.lambda));
        break;
      default:
        res = "Invalid selection";
    }
    setResult(res.toFixed(6));
  };

  return (
    <div className="container">
      <h2>Probability Calculator</h2>
      <select value={distribution} onChange={(e) => setDistribution(e.target.value)}>
        <option value="binomial">Binomial Distribution</option>
        <option value="poisson">Poisson Distribution</option>
      </select>

      <div>
        {distribution === "binomial" && (
          <>
            <input type="number" name="n" placeholder="n (trials)" onChange={handleChange} />
            <input type="number" name="k" placeholder="k (successes)" onChange={handleChange} />
            <input type="number" step="0.01" name="p" placeholder="p (success probability)" onChange={handleChange} />
          </>
        )}

        {distribution === "poisson" && (
          <>
            <input type="number" name="lambda" placeholder="λ (mean occurrences)" onChange={handleChange} />
            <input type="number" name="k" placeholder="k (actual occurrences)" onChange={handleChange} />
          </>
        )}
      </div>

      <button onClick={calculate}>Calculate Probability</button>

      {result !== null && <h3 className="result">Probability: {result}</h3>}
    </div>
  );
}

export default App;
