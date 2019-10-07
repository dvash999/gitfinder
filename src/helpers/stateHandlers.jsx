export function initStateField(field, _this) {
    return _this.setState({field: null})
}

export function startSpinner(_this) {
    return _this.setState({loading: true})
}

export function stopSpinner(_this) {
    return _this.setState({loading: false})
}

export default initStateField;
