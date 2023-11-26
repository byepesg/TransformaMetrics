export async function useFetch(Endpoint, options = {}, auth = true) {
    if (!options['headers']) {
        options['headers'] = {};
    }
    //options['headers']['Content-Type'] = 'application/json';
    //options['headers']['Accept'] = 'application/json';
    //options['headers']['Access-Control-Allow-Origin'] = '*';
   // options['headers']['application/vnd.github.v3.raw'] = '*';

    
    
    //let api = `/api/v1`; 
    //let baseUrl = `${base}${api}${Endpoint}`;
    let baseUrl = `${Endpoint}`;
    //let baseUrl = `https://raw.githubusercontent.com/byepesg/TransformaMetrics/main/src/data/JSON.json`;
    console.info("Funcion Fetch : "+baseUrl) 
    
   
//   let token = sessionStorage.getItem('accessSessionToken');

//   if (token) {
//     // headers["Authorization"] = `Bearer ${token}`;
//     options['headers']['Authorization'] = 'Bearer ' + {token}
//   }
    
    if (auth) {
        
        //options['headers']['Authorization'] = 'Bearer ' + sessionStorage.getItem('accessSessionToken');
        
    }
    

    let data = {};
    let error = null;
    try {
        
        let res = await fetch(baseUrl, options);
        
        if (res.ok) {

            data = await res.json();
            //alert("its okay")
            
        } else {
            error = await res.json();
            //alert("its not okay")
        }
    } catch (e) {
        //error = e;
        //alert("Error, por favor contacte al proveedor")
        alert("No encuentro la peticion")
    }

    return { data, error };
}
