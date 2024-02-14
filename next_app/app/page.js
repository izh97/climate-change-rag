'use client'

import styles from './page.module.css'
import React, { useState } from 'react';

export default function Home() {
  const [query, setQuery] = useState('');
  const [responseText, setResponseText] = useState('To save energy and protect the environment, I am currently in standby mode. Your first query may take a while.');
  const loadingMessages = [
    "Recycling some thoughts... Be right back!",
    "Gathering solar energy for some bright ideas...",
    "Planting the seeds for your answer... Stay tuned!",
    "Catching the wind for a breezy solution... Hang tight!",
    "Consulting the climate models... One moment, please.",
    "Filtering through data like clean water... Your answer is coming up!"
  ];
  const getRandomLoadingMessage = () => {
    const randomIndex = Math.floor(Math.random() * loadingMessages.length);
    return loadingMessages[randomIndex];
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponseText(getRandomLoadingMessage());

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
        <img src="/images/robot_helper.png" alt="Robot" className={styles.robotImage}/>
        <span className={styles.robotColon}>:</span>
        <div className={styles.response}>
          {responseText}
        </div>
      </div>
      <div className={styles.examples}>
        <h2>Try some sample questions like:</h2>
        <ul>
          <li>Can you provide examples of the effects of global warming on our environment?</li>
          <li>What is the main contributor to global warming worldwide?</li>
          <li>What can we do to help the environment?</li>
        </ul>
      </div>
    </main>
  )
}
