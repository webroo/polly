function setValueAtPath(obj: any, path: string, value: any): any {
  const pathList = path.match(/[^.[\]]+/g) || [];

  // Keep track of the object at each depth as we drill down a nested path
  let pathObject = obj;

  pathList.forEach((path, index) => {
    if (index === pathList.length - 1) {
      // Set the value once we reach the last path segment
      pathObject[path] = value;
    } else if (pathObject[path]) {
      // If an object already exists at this path segment then update our ref
      pathObject = pathObject[path];
    } else {
      // Create a new object or array at this path segment depending on if
      // the next path segment is a number
      pathObject[path] = isNaN(+pathList[index + 1]) ? {} : [];
      pathObject = pathObject[path];
    }
  });

  return obj;
}

export function parseFormData(formData: FormData): any {
  return Array.from(formData).reduce((result, [key, value]) => {
    // Skip any internal nextjs form keys that start with '$'
    return key.startsWith('$') ? result : setValueAtPath(result, key, value);
  }, {} as any);
}
