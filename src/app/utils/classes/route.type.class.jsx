class RouteType {
    /**
     *
     * @param { string } path
     * @param { React.LazyExoticComponent<() => React.JSX.Element> } element
     */
    constructor(path, element) {
        this.path = path;
        this.element = element;
        this.children = children;
    }
}

export default RouteType;