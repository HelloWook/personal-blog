import React from 'react';
import { Activity } from '@/data/activity';

interface TimeLineProps {
  activities: Activity[];
}

const TimeLine = ({ activities }: TimeLineProps) => {
  return (
    <ul className='timeline timeline-snap-icon max-md:timeline-compact timeline-vertical'>
      {activities.map((activitie, idx) => {
        return (
          <li key={idx}>
            <div className='timeline-middle '>
              <TimelineSvg />
            </div>
            <div className={`${idx % 2 === 0 ? 'mb-10 timeline-start md:text-end ' : ' timeline-end md:mb-10'}`}>
              <time className='font-mono italic'>{activitie.date}</time>
              <div className='text-lg font-black'>{activitie.title}</div>
              <p data-testid={`social-link-${activitie.title}`} className='text-start'>
                {activitie.description}
              </p>
            </div>
            <hr />
          </li>
        );
      })}
    </ul>
  );
};

export default TimeLine;

const TimelineSvg = () => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-5 h-5'>
      <path
        fillRule='evenodd'
        d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
        clipRule='evenodd'
      />
    </svg>
  );
};
