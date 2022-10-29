var Sqrl = require('squirrelly');
var baseElement = require('./baseElement').baseElement;
class selectDataset extends baseElement {
    content;
    id;
    required = false;
    defaults;
    label = null
    htmlTemplate = `<div>
    <div class="simple-select">
    <label id="{{modal.id}}_{{ms.no}}label" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">{{ms.label}} {{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
    <select class="form-select mb-3 w-100" bs-type="combobox" id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" extractable=false default="{{ms.default}}" extractionRule="{{ms.extraction}}">
        {{ each(options.ms.options) }}
            <option {{ if (options.ms.hasOwnProperty("default") && options.ms.default == @this)}} selected="selected"{{/if}}>{{@this}}</option>
        {{/each}}
    </select>
    <script>
        $(\`#{{modal.id}}_{{ms.no}}\`).on('change', function(){
            populateVariablesOfDataset('{{modal.id}}_{{ms.no}}selVars', $(this).find(':selected').text())
        })
    </script>
    </div>
    <h6 id="{{modal.id}}_{{ms.no}}src">{{if (options.ms.label)}}{{ms.label}}{{#else}}Source variables{{/if}}</h6>
    <div class="form-check list-group var-list" multiple
     id="{{modal.id}}_{{ms.no}}actVars"
     modal_id="{{modal.id}}"
     {{if (options.ms.action)}}act="{{ms.action}}"{{#else}}act="copy"{{/if}}  
     bs-type="cols" ondrop="drop(event)" ondragover="allowDrop(event)">
    </div>
    <h6 id="{{modal.id}}_{{ms.no}}tar">{{if (options.ms.label)}}{{ms.label}}{{#else}}Source variables{{/if}}</h6>
    <div class="form-check list-group var-list" multiple
     id="{{modal.id}}_{{ms.no}}selVars"
     modal_id="{{modal.id}}"
     {{if (options.ms.action)}}act="{{ms.action}}"{{#else}}act="copy"{{/if}}  
     bs-type="cols" ondrop="drop(event)" ondragover="allowDrop(event)">
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
        config.onselect_r = config.hasOwnProperty("onselect_r") ? JSON.stringify(config.onselect_r) : ""
            this.content = Sqrl.Render(this.htmlTemplate, {
            modal: modal,
            ms: config
        })
    }
    clearContent() {
        $(`#${this.id}actVars`).children().each(function(index, element) {
            element.remove()
        })
        $(`#${this.id}selVars`).children().each(function(index, element) {
            element.remove()
        })
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
    fillContent() {
        var activedataset = getActiveDataset()
        var datasets = getAllDatasets();
        var noOfdatasets = document.getElementById(this.id).length
        document.getElementById(this.id.concat("label")).innerHTML
                = "Select a dataset to join " + activedataset + " with";
        //Remove all the previously selected datasets
        if (noOfdatasets > 0) {
            for (i = 0; i < noOfdatasets; i++) {
                document.getElementById(this.id).remove(0);
            }
        }
        //Remove the active dataset
        datasets = datasets.filter(function (value, index, arr) {
            return value != activedataset;
        });
        //Add back all the active datasets
        datasets.forEach(element => {
            var option = document.createElement("option");
            option.text = element;
            document.getElementById(this.id).add(option);
        })
        document.getElementById(this.id.concat("src")).innerText = "Variables from the active dataset " +activedataset;
        document.getElementById(this.id.concat("tar")).innerText = "Variables from the selected dataset " +datasets[0];
        //Populate the variable list with the currect dataset
        if (datasets.length > 0) {
            populateVariablesOfDataset(this.id.concat("selVars"), datasets[0])
        }
        populateVariablesOfDataset(this.id.concat("actVars"), activedataset )
    }
}
module.exports.element = selectDataset;