import { useState, useEffect } from "react";

const useFetch = (url) => {
    const[data, setData] = useState(null);
    const [isPending , setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, {signal: abortCont.signal}) //once this promise has been resolved(means gets the data), it goes to '.then()'
        //res is an object, it's not the data
        .then(res => {
            // console.log(res);
            if(!res.ok){
                throw Error('could not fetch data for that response')
            }
            return res.json()
        })
        .then((data) => {
            console.log(data);
            setData(data)
            setIsPending(false)
            setError(null)
        }).catch(err => {
            if (err.name === 'AbortError') {
                console.log('fetch aborted')
            } else {
                setIsPending(false)
                setError(err.message)
            }
        });
        return () => abortCont.abort();
    }, [url]);

    return {data, isPending, error}
}

export default useFetch;