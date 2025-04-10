import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [aiHistory, setAiHistory] = useState([]);
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/sales-reps")
      .then((res) => res.json())
      .then((data) => {
        setSales(data.salesReps);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch data:", err);
        setLoading(false);
      });
  }, []);

  const handleAskAI = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
  
    setAiLoading(true);
    setAiAnswer('');
    try {
      const res = await fetch('http://localhost:8000/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question }),
      });
      const data = await res.json();

      if (!data || !data.answer) {
        throw new Error("No valid answer received from AI.");
      }
  
      // Simulasi typing delay
      let i = 0;
      const typingInterval = setInterval(() => {
        setAiAnswer((prev) => data.answer.slice(0, i));
        i++;
        if (i > data.answer.length) {
          clearInterval(typingInterval);
          setAiLoading(false);
          setAiHistory((prev) => [...prev, { q: question, a: data.answer }]);
        }
      }, 20); // typing speed
    } catch (err) {
      setAiAnswer('An error occurred while contacting the AI.');
      setAiLoading(false);
    }
    setQuestion('');
  };

  return (
    <main className={styles.container}>
      <h1>Sales Representatives</h1>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {sales.map((rep, idx) => (
        <div key={idx} className={styles.card}>
          <div className={styles.name}>{rep.name}</div>
          <div className={styles.meta}>{rep.region} — {rep.role}</div>
          <div className={styles.skills}>
            <strong>Skills:</strong> {rep.skills.join(', ')}
          </div>
          <h4>Deals:</h4>
          <ul className={styles.deals}>
            {rep.deals.map((deal, i) => (
              <li key={i} className={styles.dealItem}>
                <span>{deal.client} - ${deal.value}</span>
                <span
                  className={`${styles.status} ${
                    deal.status.toLowerCase().includes('won')
                      ? styles['status-won']
                      : deal.status.toLowerCase().includes('progress')
                      ? styles['status-progress']
                      : styles['status-lost']
                  }`}
                >
                  {deal.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}        

      <hr style={{ margin: '2rem 0' }} />
      <h2>Ask a Question (AI Endpoint)</h2>
      <input
          type="text"
          placeholder="Enter your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className={styles.input}
        />
      <button className={styles.button} onClick={handleAskAI}>Ask</button>
      {aiLoading && <p>⏳ Thinking...</p>}

      {aiAnswer && !aiLoading && (
        <p><strong>AI:</strong> {aiAnswer}</p>
      )}

      {aiHistory.length > 0 && (
        <div style={{ marginTop: '2rem' }}>
          <h3>Previous Questions</h3>
          <ul style={{ paddingLeft: '1rem' }}>
            {aiHistory.map((entry, idx) => (
              <li key={idx} style={{ marginBottom: '1rem' }}>
                <p><strong>Q:</strong> {entry.q}</p>
                <p><strong>A:</strong> {entry.a}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </main>
  );
}
