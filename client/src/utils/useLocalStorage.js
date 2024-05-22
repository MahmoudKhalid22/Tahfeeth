function useLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export { useLocalStorage };
