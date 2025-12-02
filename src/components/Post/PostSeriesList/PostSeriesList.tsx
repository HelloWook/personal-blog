'use client';

import {useTranslations} from 'next-intl';

const ALL_SERIES = 'All';

interface PostSeriesListProps {
  seriesList: string[];
  onSeriesChange: (series: string) => void;
}

const PostSeriesList = ({ seriesList, onSeriesChange }: PostSeriesListProps) => {
  const t = useTranslations('PostPage');
  const buttonStyle = `text-2xl cursor-pointer`;

  return (
    <div className='flex items-center justify-center gap-6 mb-8'>
      <button className={buttonStyle} onClick={() => onSeriesChange(ALL_SERIES)}>
        {t('all')}
      </button>
      {seriesList.map((series) => (
        <button key={series} className={buttonStyle} onClick={() => onSeriesChange(series)}>
          {series}
        </button>
      ))}
    </div>
  );
};

export default PostSeriesList;
