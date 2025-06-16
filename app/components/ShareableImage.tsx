// File: app/components/ShareableImage.tsx
'use client';

import React, { forwardRef } from 'react';
import styles from './ShareableImage.module.css'; // <-- Impor file CSS Module

// Definisikan tipe data yang diterima komponen ini
interface StatsData {
  totalAdditions: number;
  totalDeletions: number;
  averageChangesPerDay: number;
  calendarWeeks: any[];
}
interface ShareableImageProps {
  data: StatsData;
  username: string;
}

// Fungsi helper untuk warna kalender, tetap sama
const getContributionHexColor = (count: number): string => {
  if (count === 0) return '#2d333b';
  if (count <= 2) return '#0e4429';
  if (count <= 6) return '#006d32';
  if (count <= 12) return '#26a641';
  return '#39d353';
};

const ShareableImage = forwardRef<HTMLDivElement, ShareableImageProps>(({ data, username }, ref) => {
  const currentMonthName = new Date().toLocaleString('id-ID', { month: 'long' });

  return (
    <div ref={ref} className={styles.container}>

      <div className={styles.statsWrapper}>
        <div className={styles.statItem}>
          <h3 className={styles.statLabel}>LOC Additions</h3>
          <p className={styles.statValue}>{`+${data.totalAdditions.toLocaleString()}`}</p>
        </div>
        <div className={styles.statItem}>
          <h3 className={styles.statLabel}>LOC Deletions</h3>
          <p className={styles.statValue}>{`-${data.totalDeletions.toLocaleString()}`}</p>
        </div>
        <div className={styles.statItem}>
          <h3 className={styles.statLabel}>Lines Changed / Day</h3>
          <p className={styles.statValue}>{Math.round(data.averageChangesPerDay).toLocaleString()}</p>
        </div>
      </div>

      <h2 className={styles.title}>{currentMonthName} Callender</h2>
      <div className={styles.calendarContainer}>
        <div className={styles.calendarGrid}>
          {data.calendarWeeks.map((week) =>
            week.contributionDays.map((day: any) => (
              <div
                key={day.date}
                className={styles.calendarCell}
                style={{ backgroundColor: getContributionHexColor(day.contributionCount) }} // Warna tetap inline karena dinamis
              />
            ))
          )}
        </div>
      </div>

      <p className={styles.footer}>GIT-STRAVA</p>
    </div>
  );
});

ShareableImage.displayName = 'ShareableImage';
export default ShareableImage;