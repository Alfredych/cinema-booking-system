export default async function createRequest(options) {
  try {
    const response = await fetch('https://shfe-diplom.neto-server.ru/' + options.url, options);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};