import { useState } from "react";

export const useFirebase = (
  config = {
    onError: () => {},
    onSuccess: () => {},
    onRequestService: () => {},
  }
) => {
  const [isLoading, setLoading] = useState(false);

  const [error, setError] = useState(null);

  const [data, setData] = useState(null);

  const { onError, onSuccess, onRequestService } = config || {};

  const onRequest = async (...params) => {
    setLoading(true);

    setError(null);

    await onRequestService(...params)
      .then((response) => {
        console.log(response);
        setData(response);

        setError(null);
        setLoading(false);
        // onSuccess && onSuccess(response);
      })
      .catch((error) => {
        setData(null);
        setError(error);
        // onError && onError(error);
      });

    setLoading(false);
  };

  return { isLoading, error, data, onRequest, setError };
};
//for using the hook this way is prefered

// const { data, isLoading, error, onRequest, setError } = useFirebase({
// onRequestService: Api.auth.createAccount,
// });
