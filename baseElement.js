const common = require("./common")

module.exports.baseElement = class baseElement {
    id;
    
    getVal() {
        return common.getVal(this.id)
    }

    clearContent() {
        return common.clearContent(this.id)
    }

    canExecute(refToBaseModal) {
        return common.canExecute(this.id, refToBaseModal)
    }
}