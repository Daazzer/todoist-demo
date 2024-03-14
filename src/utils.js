export const uuid = () => {
  let uniqueId = null;
  try {
    uniqueId = crypto.randomUUID();
  } catch {
    const blobUrl = URL.createObjectURL(new Blob());
    URL.revokeObjectURL(blobUrl);
    uniqueId = blobUrl.slice(blobUrl.lastIndexOf('/') + 1);
  }
  return uniqueId.replace(/-/g, '');
};
