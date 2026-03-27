const getFormData = target => {
  const formData = new FormData(target);
  let data = Object.fromEntries(formData);

  data = Object.fromEntries(Object.entries(data).map(([key, value]) => {
    if (typeof value === 'string') {
      return [key, value.replace(/[<>{}]/g, '')];
    } else {
      return [key, value];
    }
  }));

  return data;
}

export default getFormData;