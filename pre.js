

var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;

class preVar extends baseElement{
    content;
    id;
    htmlTemplate = `<pre id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" bs-type="label" class="h{{ms.h}} {{if(options.ms.style)}}{{ms.style}}{{/if}}">{{ms.label}}</pre>`

    constructor(modal, config) {
        super(modal, config)
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
    }
    
    canExecute() {
        return true
    }
    
    clearContent() {}
}

module.exports.element = preVar;