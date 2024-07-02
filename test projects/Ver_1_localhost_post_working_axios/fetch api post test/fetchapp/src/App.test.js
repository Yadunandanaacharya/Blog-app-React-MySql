import { render, screen } from '@testing-library/react';
import App from './App';
import fetch from 'node-fetch'
import axios from 'axios'


const response = await fetch('https://api.github.com/users/github');
const data = await response.json();
console.log(data);

fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(json => {
        console.log("First user in the array:");
        console.log(json[0]);
        console.log("Name of the first user in the array:");
        console.log(json[0].name);
})

const body = {a: 1};
const response1 = await fetch('http://localhost:5000/post', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
});
const data1 = await response1.json();
console.log(data1);


const body2 = {a: 1};
const response2 = await fetch('https://httpbin.org/post', {
	method: 'post',
	body: JSON.stringify(body),
	headers: {'Content-Type': 'application/json'}
});
const data2 = await response2.json();
console.log(data2);


const postBackend = async() => {
  try {
    const res = await fetch('http://localhost:8000/frontend-to-backend', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        'message': 'Hi from frontend!'
      })
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data);
    }
  } catch (error) {
    console.error(error);
  }
}
postBackend();

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});


