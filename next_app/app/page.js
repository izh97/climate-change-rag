'use client'

import styles from './page.module.css'
import React, { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [responseText, setResponseText] = useState('Let us help the environment!');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponseText('Thinking...')

    const formData = new FormData();
    formData.append('query', query);

    const response = await fetch(process.env.NEXT_PUBLIC_API_HOST + '/process_form', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      setResponseText(responseData.response)
    } else {
      console.error('Failed to submit:', response.statusText);
    }
  };

  return (
    <main className={styles.main}>
      <div>
        <h1>Query climate change and environmental data</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className={styles.responseContainer}>
        <img src="./robot_helper.png" alt="Robot" className={styles.robotImage}/>
        <span className={styles.colon}>:</span>
        <div className={styles.response}>
          {responseText}
        </div>
      </div>
      <div className={styles.examples}>
        <h2>Try some sample questions like:</h2>
        <ul>
          <li>Is climate change real?</li>
          <li>What can we do to help the environment?</li>
          <li>What is the main contributor to global warming?</li>
        </ul>
      </div>
    </main>
  )
}
