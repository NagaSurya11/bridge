class PostRequestWrapper {
    isAllDefined() {
        return Object.values(this).every(value => value !== undefined && value !== null);
    }
}

module.exports = PostRequestWrapper;