import { useFetch } from './fetch.js';
export default class TableService {

    async getInfo(url) {
        const options = {
            method: 'GET',
            
        };

        let { data, error } = await useFetch(url, options, true);
        
        if (error) throw error;
        
        return data;
    }
}
