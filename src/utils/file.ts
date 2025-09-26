import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import readingTime from 'reading-time';

type ContentMeta = {
  published: boolean;
};

export function getContents<T extends ContentMeta>(contentsPath: string) {
  const files = getMDXFiles(contentsPath);
  return files
    .filter((file) => {
      const { meta } = readMDXFile<T>(path.join(contentsPath, file));
      return meta.published;
    })
    .map((file) => {
      const { meta, content } = readMDXFile<T>(path.join(contentsPath, file));
      const slug = path.basename(file, path.extname(file));
       const clean = content
    .replace(/```[\s\S]*?```/g, ' ')      // fenced code block
    .replace(/`[^`]*`/g, ' ')             // inline code
    .replace(/<[^>]+>/g, ' ')             // JSX/MDX 컴포넌트
    .replace(/\s+/g, ' ')                 // 공백 정리
    .trim();


    // 🟢 wordsPerMinute 조정 (gatsby랑 비슷하게 260~27xw0)

     const minutes = Math.ceil(
    readingTime(clean, { wordsPerMinute: 260 }).minutes
  );

      return {
        meta,
        content,
        slug,
        readingTime: minutes,
      };
    });
}

function getMDXFiles(dir: string) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile<T extends any>(filePath: string) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(rawContent);

  return {
    meta: data as T,
    content,
  };
}
