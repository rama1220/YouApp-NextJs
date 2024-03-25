import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BoxInterest({ title, paragraph }) {
  const router = useRouter();
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const savedInterests = JSON.parse(localStorage.getItem('interests'));
    if (savedInterests) {
      setInterests(savedInterests);
    }
  }, []);

  const handleEdit = () => {
    router.push('/EditInterest');
  };

  return (
    <>
      <div className="content-container interest">
        <div className={`Box-biodata relative`}>
          <div className="content text-black absolute">
            <div className="tag-about flex justify-between items-center text-white">
              <h2>{title}</h2>
              <div className="cursor-pointer icon-edit" onClick={handleEdit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" className="bi bi-pencil-square" viewBox="0 0 16 16">
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                </svg>
              </div>
            </div>
            <div className="interest-box mt-8">
              {interests.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {interests.map((interest, index) => (
                    <span key={index} className="bg-gray-400 text-white rounded-md px-3 py-1">
                      {interest}
                    </span>
                  ))}
                </div>
              ) : (
                <h2 className="text-white opacity-50 mt-8">{paragraph}</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
