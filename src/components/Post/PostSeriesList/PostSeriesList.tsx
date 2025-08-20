'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface PostSeriesListProps {
  seriesList: string[];
}

const PostSeriesList = ({ seriesList }: PostSeriesListProps) => {
  const pathname = usePathname();
  //const searchParams = useSearchParams();

  return (
    <div className='flex items-center justify-center gap-6 mb-8'>
      <Link key={'All'} href={`${pathname}`} className='text-2xl '>
        All
      </Link>
      {seriesList.map((series) => (
        <Link key={series} href={`${pathname}?series=${series}`} className='text-2xl '>
          {series}
        </Link>
      ))}
    </div>
  );
};

export default PostSeriesList;
