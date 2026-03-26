export interface Heading {
  id: string;
  text: string;
  level: 2 | 3;
}

export function extractHeadings(mdxContent: string): Heading[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: Heading[] = [];

  let match;
  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const level = match[1].length as 2 | 3;
    const text = match[2].trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ\s-]/g, '')
      .replace(/\s+/g, '-');

    headings.push({ id, text, level });
  }

  return headings;
}
