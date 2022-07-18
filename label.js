

var Sqrl = require('squirrelly');
const common = require("../library/common")
var baseElement = require('./baseElement').baseElement;

class labelVar extends baseElement {
    content;
    id;
    htmlTemplate = `<p id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" bs-type="label" class="h{{ms.h}} {{if(options.ms.style)}}{{ms.style}}{{/if}}">{{ms.label}}</p>`

    constructor(modal, config) {
        super(modal, config)
        this.id = `${modal.id}_${config.no}`
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
    }
    
    canExecute() {
        return true
    }
    
    clearContent() {}
}

module.exports.element = labelVar;