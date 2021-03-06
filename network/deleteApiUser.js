import urls from '../constants/Urls';
const url = urls.apiRootUrl + urls.apiUsers;

export const deleteApiUser = async (id) => {
  try {
    // TODO: Make a DELETE call
    const res = await fetch(url + '/' + id);
    const resJson = await res.json();
    return resJson;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
};
