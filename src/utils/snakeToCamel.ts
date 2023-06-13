function snakeToCamel(snakeCaseString: string): string {
  return snakeCaseString.replace(/_([a-z])/g, (_, match) =>
    match.toUpperCase()
  );
}

function transformKeysToCamelCase(obj: any): any {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(transformKeysToCamelCase);
  }

  const transformedObj: any = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const camelCaseKey = snakeToCamel(key);
      transformedObj[camelCaseKey] = transformKeysToCamelCase(obj[key]);
    }
  }

  return transformedObj;
}

export default transformKeysToCamelCase;
