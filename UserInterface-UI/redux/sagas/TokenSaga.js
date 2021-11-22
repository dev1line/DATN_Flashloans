// import { put } from 'redux-saga/effects'
import Axios from 'axios';
import { put } from 'redux-saga/effects';
const URL = "http://localhost:3000/admin/api";

function* fetchToken(input) {
    console.log(input.payload);
    const username = input.payload.username;
    const password = input.payload.password;

    const mutation =
        `mutation($username: String!, $password: String!) {
            authenticateUserWithPassword(username: $username, password: $password)
                {
                token
                     item {
                  id
                  role
                  username
                }
              }
          }`;

    const data = yield Axios({
        url: URL,
        method: 'POST',
        data: {
            "query": mutation,
            "variables": {
                "username": username,
                "password": password,
            }
        }
    });
    const result = data.data.data.authenticateUserWithPassword.token;

    const query = `query getUsers{ allUsers {id username email role }} `;
    const users = yield Axios({
        url: URL,
        method: 'POST',
        data: {
            "query": query,
        },
        headers: {
            Authorization: `Bearer ${result}`
        }
    });
    console.log("saga token", result, users.data.data.allUsers);
    yield put({ type: "LOGIN_SUCCESS", token: result, users: users.data.data.allUsers });
    yield localStorage.setItem("token", result);
    yield localStorage.setItem("users", JSON.stringify(users.data.data.allUsers));
};
function* addUser(input) {
    const username = input.newUser.txtusername;
    const email = input.newUser.txtemail;
    const password = input.newUser.txtpassword;

    console.log("add user in saga:", input);

    const mutation = `mutation($username: String!, $email: String!, $password: String!) {
        createUser (
          data: {
            username:$username,
            email:$email,
            password:$password,
            role:Customer
          }
        ) {
          id
          username
          role
        }
      } `;
    const temp = "sEtRekpvJ4OIOAgpgt3alVz8FLIU6brS.glkGRYctwGS3U8SpbyE7KZxoRwHvL2hyl6uFm+lNFJ0";
    const res = yield Axios({
        url: URL,
        method: 'POST',
        data: {
            "query": mutation,
            "variables": {
                "username": username,
                "email": email,
                "password": password,
            }
        },
        headers: {
            Authorization: `Bearer ${temp}`
        }
    });
    yield put({ type: "ADD_USER_SUCCESS", res: res });
}
export {
    fetchToken,
    addUser,
};