import { useState, useEffect } from "react";

const useFetchForGET = (url, initialValue) => {
    const [data, setData] = useState(initialValue);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const getData = await fetch(url);

                const data = await getData.json();


                if (!getData.ok) {

                }
                setData(data);
                setError(null);
            }
             catch (error) {
            setError(error.message);
            setData(null);

        }
        setLoading(false);
    }
        fetchData();
}, [url]);
return { data, loading, error };
};

export default useFetchForGET;