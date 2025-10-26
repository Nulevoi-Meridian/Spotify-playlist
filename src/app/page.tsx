"use client";

import styles from "./page.module.css";

export default function Home() {
  const handleClick = async () => {
    window.location.href = "routes/auth/login";
  };

  return (
    <div className={styles.page}>
      <button type="button" onClick={handleClick}>
        Create playlist with Spotify
      </button>
    </div>
  );
}
