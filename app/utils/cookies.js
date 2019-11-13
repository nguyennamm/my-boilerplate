export function setCookie(cname, cvalue, hours) {
  const d = new Date();
  d.setTime(d.getTime() + hours * 60 * 60 * 1000); // (exdays * 24 * 60 * 60 * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function getCookie(cname) {
  const name = `${cname}=`;
  const ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i + 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }

  return '';
}

export function checkCookie(cname) {
  const user = getCookie(cname);
  if (user !== '') {
    return user;
  }
  return null;
}

export function deleteCookie(cname) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}
