export default {
  handleError(error) {
    let errorResult = null;
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      const httpStatus = error.response.status;
      const errorMsg = JSON.stringify(error.response.data);
      errorResult = `HTTP Status: ${httpStatus}, Error Data: ${errorMsg}`;
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      errorResult = error.request;
    } else {
      // Something happened in setting up the request that triggered an Error
      errorResult = error.message;
    }

    console.log(errorResult);

    return errorResult;
  }
};
