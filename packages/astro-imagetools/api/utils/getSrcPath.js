import fs from 'fs';
import path from 'path';
import { cwd } from "../../utils/runtimeChecks.js";
import printWarning from "../../utils/printWarning.js";

// To strip off params when checking for file on disk.
const paramPattern = /\?.*/

/**
 * getSrcPath allows the use of `src` attributes relative to either the /public folder or project root.
 * 
 * It first checks to see if the src is a file relative to the cwd (project root).  
 * If the file isn't found, it will look in the /public folder.
 * Finally, if it still can't be found, the original input will be returned.
 */
export function getSrcPath(src) {
  // If this is already resolved to a file, return it.
  if (fs.existsSync(src.replace(paramPattern, ''))) return src;

  const rootPath = path.join(cwd, src);
  const rootTest = rootPath.replace(paramPattern, '')
  if (fs.existsSync(rootTest)) return rootPath;

  const publicPath = path.join(cwd, 'public', src);
  const publicTest = publicPath.replace(paramPattern, '')
  if (fs.existsSync(publicTest)) return publicPath;

  // Fallback
  printWarning({message: `"${src}" could not not be found at \n${rootTest} \n\tor \n${publicTest}`});
  return src;
}
