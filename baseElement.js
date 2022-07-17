const common = require("./common")

class BaseElement {
    id;
    
    constructor(modal, config) {}

    getVal() {
        try{
            return common.getVal(this.id)
        } catch (ex) {
            return undefined
        }
    }

    clearContent() {
        try {
            return common.clearContent(this.id)
        } catch (ex) {
            return undefined
        }
        
    }

    canExecute(refToBaseModal) {
        return true
    }
}


module.exports.baseElement = BaseElement