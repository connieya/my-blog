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

      return {
        meta,
        content,
        slug,
        readingTime: readingTime(content).minutes,
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
