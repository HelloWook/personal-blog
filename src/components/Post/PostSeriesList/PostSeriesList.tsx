import {useTranslations} from 'next-intl';

const ALL_SERIES = 'All';

interface PostSeriesListProps {
  seriesList: string[];
  selectedSeries: string;
  onSelect: (series: string) => void;
}

const PostSeriesList = ({ seriesList, selectedSeries, onSelect }: PostSeriesListProps) => {
  const t = useTranslations('PostPage');
  const baseStyle = 'text-2xl cursor-pointer';
  const activeStyle = 'font-bold underline';

  return (
    <div className='flex items-center justify-center gap-6 mb-8'>
      <button
        onClick={() => onSelect(ALL_SERIES)}
        className={`${baseStyle} ${selectedSeries === ALL_SERIES ? activeStyle : ''}`}
      >
        {t('all')}
      </button>
      {seriesList.map((series) => (
        <button
          key={series}
          onClick={() => onSelect(series)}
          className={`${baseStyle} ${selectedSeries === series ? activeStyle : ''}`}
        >
          {series}
        </button>
      ))}
    </div>
  );
};

export default PostSeriesList;
