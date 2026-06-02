import { useState, useEffect } from "react";

const useFetchForGET = (url, initialValue) => {
    const [Data, setData] = useState(initialValue);
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const getData = await fetch(url);

                const data = await getData.json();


                if (!getData.ok) {
                    console.log("Error Occured while fetching the Data", data.error);
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
return { Data, Loading, Error };
};

export default useFetchForGET;