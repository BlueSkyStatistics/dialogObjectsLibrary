var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
class mergeJoin extends baseElement{
    content;
    id;
    required = false;
    defaults;
    label = null
    htmlTemplate = `
    <div class="row" >
        <div class="col-6">
            <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">Join mapping{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
        </div>
    </div>
    <div class="row"  >
        <div class="col-3">
            <button type="button" class="btn btn-outline-secondary btn-text" onclick="addToJoin( modal_id = &quot;{{modal.id}}&quot; ,listOfVariablesToJoinBy =&quot;{{modal.id}}_{{ms.no}}_joinMap&quot; );">Add</button>
            <button type="button" class="btn btn-outline-secondary btn-text" onclick="removeFromJoin( listOfVariablesToJoinBy =&quot;{{modal.id}}_{{ms.no}}_joinMap&quot; );">Delete</button>
        </div>
        <div class="col-9">
            <div class="list-group ms-list"  id="{{modal.id}}_{{ms.no}}_joinMap" bs-type="joinMapping"  extractable=true extractionRule="{{ms.extraction}}" no="{{ms.no}}" >
                <ul class ="list-group" >
                </ul>
            </div>
        </div>                  
    </div>
    `
    constructor(modal, config) {
        super(modal, config);
        this.label = config.label
        this.id = `${modal.id}_${config.no}`
        if (config.required) {
            this.required = config.required
        }
        this.defaults = config.hasOwnProperty("default") ? config.default : ""
        this.content = Sqrl.Render(this.htmlTemplate, {
            modal: modal,
            ms: config
        })
    }
    clearContent() {

       
           /*  let count = 1
            let myid = this.id
            let ulist = document.getElementById(this.id + "_joinMap").getElementsByTagName("UL") */
            $(`#${this.id}_joinMap`).find("UL").children().each(function (index, element) {
                element.remove()
            })
           /*  $(`#${this.id}_measureList`).find("UL").children().each(function (index, element) {
                if (element.tagName != "UL")
                    element.remove()
                $(`#${myid}_depVarParent_${count}`).remove()
                count = count + 1
            }) */
    



      //  $(`#${this.id}`).val(this.defaults)
    }
    canExecute(refToBaseModal) {
        if (this.required && this.getVal().length > 0) {
            return true
        } else if (!this.required) {
            return true
        }
        dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Select control rule violation", message: `You need to make a selection in the Select control with label: "${this.label}"` })
        return false
    }
    // getVal() {
    //     var res = []
    //     res = $(`#${this.id}`).val()
    //     // res in null when the control is empty
    //     if (res != null) {
    //         if (res.length == 1) {
    //             return res[0]
    //         } else {
    //             return res
    //         }
    //     }
    //     else {
    //         //we return an empty string so that the call this.getVal().length does not create an exception 
    //         return "";
    //     }
    // }
}
module.exports.element = mergeJoin;