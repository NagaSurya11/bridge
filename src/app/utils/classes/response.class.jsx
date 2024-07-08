
/**
* @class
*/
class Response {
    /**
     * @param { boolean } status
     * @param { string } message
     * @param { * } data
     */
    constructor(status, data) {
        this.status = status;
        this.data = data;
    }
}

export default Response;
