import { get } from '../utils/axios';

export async function request() {
    console.log('here');
    const response = await get('/');
    console.log(response);
}