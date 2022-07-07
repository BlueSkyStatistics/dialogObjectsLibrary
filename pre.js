

var Sqrl = require('squirrelly');

class preVar {
    content;
    id;
    htmlTemplate = `<pre id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" bs-type="label" class="h{{ms.h}} {{if(options.ms.style)}}{{ms.style}}{{/if}}">{{ms.label}}</pre>`

    constructor(modal, config) {
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
    }
    
    canExecute() {
        return true
    }

    getVal() {
        return $(`#${this.id}`).text();
    }
    
    clearContent() {}
}

module.exports.element = preVar;