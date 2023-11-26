export default function useSettingsAPI() {
    const APISettings = {
    
    token: '',
    baseURL: '',
    headers: new Headers({
        'Accept': 'application/json'
    }),
}
function pathAPI(){
    //return {base:'http://agroonline_end.test', apiVer:`/api/v1`}  
  return {base:'http://127.0.0.1:8000', apiVer:``} 
}
return {
    APISettings,
    pathAPI
}
}