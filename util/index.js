export const ipfs2http = (ipfs_url) => {
  let url = new URL(ipfs_url);
  return url.pathname;
}