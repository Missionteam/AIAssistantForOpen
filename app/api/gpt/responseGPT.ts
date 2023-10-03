const toJson = async (res:any) => {
    const json = await res.json();
    if(res.ok){
        return json;
    }else{
        throw new Error(json.message);
    }
}

export default async function getResponse(message:string) {
    const res = await fetch('http://localhost:8000/gpt/', {
        method: 'POST',
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            message: message
        })
    })
    return await toJson(res);
}