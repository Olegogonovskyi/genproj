
export  const LocalStorHelper= <T, >(key: string) => {
  const localStorResp = localStorage.getItem(key) || ''
  if(!localStorResp) {
    return {} as T
  } else {
    return JSON.parse(localStorResp) as T
  }

}