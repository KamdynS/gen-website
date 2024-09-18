'use client';

import Image from "next/image";
import { useState, useEffect } from 'react';
import SpotifyPlayer from '@/components/SpotifyPlayer';

export default function Home() {
  const [timeTogether, setTimeTogether] = useState('');

  useEffect(() => {
    const calculateTimeTogether = () => {
      const startDate = new Date('2023-02-25T22:00:00Z'); // 5pm EST is 22:00 UTC
      const now = new Date();
      const diff = now.getTime() - startDate.getTime();

      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor((diff % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      const timeUnits = [
        { value: years, unit: 'year' },
        { value: months, unit: 'month' },
        { value: days, unit: 'day' },
        { value: hours, unit: 'hour' },
        { value: minutes, unit: 'minute' }
      ].filter(({ value }) => value > 0);

      const formattedTime = timeUnits.map(({ value, unit }, index) => {
        const pluralUnit = value !== 1 ? unit + 's' : unit;
        if (index === timeUnits.length - 1 && timeUnits.length > 1) {
          return `and ${value} ${pluralUnit}`;
        }
        return `${value} ${pluralUnit}`;
      }).join(', ');

      setTimeTogether(formattedTime);
    };

    calculateTimeTogether();
    const timer = setInterval(calculateTimeTogether, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-100 to-purple-200 p-8 pt-16">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Hello Gen. This is a website I made for you.</h2>
          <p className="text-gray-700">Happy Birthday! I love you sooooo much. And, as a little treat and a token of how much I love you, I made this website for you. I hope you like it! Here are some of my favorite memories with you (or just times I thought you looked pretty).</p>
        </div>

        <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/image4.jpg"  // Change to .jpg if using JPG
            alt="Easter Vigil"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/image63.jpg"  // Change to .jpg if using JPG
            alt="Christmas in Boston"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">Can you believe we have been together for {timeTogether}?</h2>
          <p className="text-gray-700">It has been absolutely wonderful, but definitely not enough. I cannot wait to spend even more time with you.</p>
        </div>

        <div className="relative h-64 rounded-lg overflow-hidden shadow-md">
          <Image
            src="/images/image381.jpg"  // Change to .jpg if using JPG
            alt="At the Theater"
            fill
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-purple-600">I love you Genevieve.</h2>
          <p className="text-gray-700">Come back to this website anytime you&apos;re missing me ❤️ I know I will. xoxo</p>
        </div>
      </div>
      <div className="fixed bottom-4 left-4 z-10">
        <div className="relative">
          <p className="text-pink-500 text-sm mb-2 ml-4">
            Click play to hear my playlist for Gen
            <span className="inline-block ml-2 transform rotate-90">→</span>
          </p>
          <SpotifyPlayer />
        </div>
      </div>
    </main>
  );
}
