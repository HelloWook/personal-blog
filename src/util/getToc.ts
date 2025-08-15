import { fromMarkdown } from 'mdast-util-from-markdown';
import { toHast } from 'mdast-util-to-hast';

const getToc = (markdown: string) => {
  const mdast = fromMarkdown(markdown);
  const hast = toHast(mdast);

  return hast;
};

export default getToc;
