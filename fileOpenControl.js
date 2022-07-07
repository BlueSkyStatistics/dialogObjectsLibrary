var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;


class fileOpenControl extends baseElement{
    content;
    id;
    value = null;
    required = false;
    type_expected = null;
    overwrite = null;
    allow_spaces=false;
        label = null
    width = "w-75"
    htmlTemplate = `<div class="{{if(options.ms.style)}}{{ms.style}}{{/if}} {{if(options.ms.ml)}}ml-{{ms.ml}}{{/if}}">
    <div class="row">
        <div class="col-12">
            <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
        </div>
    </div>
    <div class="row">
        <div class="col-8">
            <input class="w-100" type="text" bs-type="file" 
                   id="{{modal.id}}_{{ms.no}}" 
                   no="{{ms.no}}" extractable=true 
                   extractionRule="{{ms.extraction}}" 
                   disabled />
        </div>
        <div class="col-4">
            <button type="button" class="btn formula-btn p-1 w-100" onclick="openFileControlDialog('{{modal.id}}_{{ms.no}}', '{{if(options.ms.type)}}{{ms.type}}{{#else}}file{{/if}}')" >Choose {{if(options.ms.type)}}{{ms.type}}{{#else}}file{{/if}}</button>  
        </div>        
    </div>
    </div>`

    constructor(modal, config) {
        super(modal, config)
        this.label = config.label
        if (config.required) {
            this.required = config.required;
        }
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
    }
    
    canExecute(refToBaseModal) {
        var outer_this = this;
        if (this.required && (this.getVal() === "" || this.getVal() == undefined)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input field rule violation", message: `Field with label: "${outer_this.label}" needs to be populated to proceed`})
            return false
        } else if ( ! this.required && (this.getVal() === "" || this.getVal() == undefined)){
            return true
        }
        try {
            fs.statSync(this.getVal())
        } catch (ex) {
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "File input field rule violation", message: `The file input field with label: "${outer_this.label}" contains path that doesn't exists`})
            return false
        }
        return true
    }

    clearContent() {
        if (this.value !== null) {
            $(`#${this.id}`).val(this.value)
        } else {
            $(`#${this.id}`).val("")
        }
        
    }
}

module.exports.element = fileOpenControl;