const common = require("./common")

class BaseElement {
    id;
    
    constructor(modal, config) {}

    getVal() {
        return common.getVal(this.id)
    }

    clearContent() {
        return common.clearContent(this.id)
    }

    canExecute(refToBaseModal) {
        return true
    }
}


module.exports.baseElement = BaseElement