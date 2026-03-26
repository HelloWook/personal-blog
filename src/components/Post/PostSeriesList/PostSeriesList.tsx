import Link from 'next/link';
import {useTranslations} from 'next-intl';

const ALL_SERIES = 'All';

interface PostSeriesListProps {
  seriesList: string[];
  selectedSeries: string;
}

const PostSeriesList = ({ seriesList, selectedSeries }: PostSeriesListProps) => {
  const t = useTranslations('PostPage');
  const baseStyle = 'text-2xl';
  const activeStyle = 'font-bold underline';

  return (
    <div className='flex items-center justify-center gap-6 mb-8'>
      <Link
        href='/posts'
        className={`${baseStyle} ${selectedSeries === ALL_SERIES ? activeStyle : ''}`}
      >
        {t('all')}
      </Link>
      {seriesList.map((series) => (
        <Link
          key={series}
          href={`/posts?series=${encodeURIComponent(series)}`}
          className={`${baseStyle} ${selectedSeries === series ? activeStyle : ''}`}
        >
          {series}
        </Link>
      ))}
    </div>
  );
};

export default PostSeriesList;
