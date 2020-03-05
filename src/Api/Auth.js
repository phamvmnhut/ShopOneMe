const {host} = require('./hostname');

const checkLogin = token =>
  fetch(`${host}check_login.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({token}),
  }).then(res => res.json());

const register = (email, name, password) =>
  fetch(`${host}register.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({email, name, password}),
  }).then(res => res.text());

/*
  const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem('@token');
    if (value !== null) {
      return value;
    }
    return '';
  } catch (error) {
    // Error retrieving data
    return '';
  }
};
*/

const getNewToken = token =>
  fetch(`${host}refresh_token.php`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({token}),
  }).then(res => res.text());

/*
const refreshToken = async () => {
  try {
    const token = await getToken();
    if (token === '' || token === 'TOKEN_KHONG_HOP_LE') {
      console.log('Chua co token');
    }
    const newToken = await getNewToken(token);
    await saveToken(newToken);
    console.log('TOKEN MOI: ' + newToken);
  } catch (e) {
    console.log(e);
  }
};
*/

module.exports = {
  checkLogin: checkLogin,
  register: register,
  getNewToken: getNewToken,
};
