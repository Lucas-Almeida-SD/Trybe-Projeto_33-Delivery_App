const setToLocalStorage = (key, object) => {
  localStorage.setItem(key, JSON.stringify(object));
};

export default setToLocalStorage;
