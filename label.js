

var Sqrl = require('squirrelly');
const common = require("../library/common")

class labelVar {
    content;
    id;
    htmlTemplate = `<p id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" bs-type="label" class="h{{ms.h}} {{if(options.ms.style)}}{{ms.style}}{{/if}}">{{ms.label}}</p>`

    constructor(modal, config) {
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
    }
    
    canExecute() {
        return true
    }
    
    clearContent() {}
}

module.exports.element = labelVar;