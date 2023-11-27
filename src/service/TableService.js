import { useFetch } from './fetch.js';
export default class TableService {

    async getInfo(url) {
        const options = {
            method: 'GET',
            //mode: 'no-cors',
            
        };

        let { data, error } = await useFetch(url, options, true);
        
        if (error) throw error;
        
        return data;
    }
}
