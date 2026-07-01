exports.main = async function (event) {
    return {
        statusCode:200,
        body: JSON.stringify({
            message: 'lambda function is working',
        }),
    };
};