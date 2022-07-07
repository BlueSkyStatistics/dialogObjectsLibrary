var Sqrl = require('squirrelly');
const common = require("../library/common")

class formulaControl {
    content;
    id;
    required = false;
    htmlTemplate = `
        <div class="formula-builder">
        <div class="row">
            <div class="col col-xx"></div>
            <div class="col col-rr">
                <h6>Formula Builder: Moving multiple variables with the move button uses a default separator of +, indicating independent variables without interaction terms. Mouse over symbols for help.{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</h6>
            </div>
        </div>
        <div class="row">
        <div class="col col-xx"></div>
        <div class="col col-rr">
            <div class="row pr-15">
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary 
                    formula-btn w-100 {{if(options.ms.default=="plus" )}}activated{{/if}}" val="+" 
                    onclick="toggleButton(event)" ondblclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click the <b>+</b> symbol then move the variables you want 
                    to separate with <b>+</b>. To insert just <b>+</b> , double click it">
                    <i class="fas fa-plus"></i>
                </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100" 
                        val="-" onclick="toggleButton(event)" ondblclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click the <b>-</b> symbol then move the variables you want 
                        to separate with <b>-</b>. To insert just <b>-</b>, double click it">
                        <i class="fas fa-minus"></i>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100 {{if(options.ms.default=="asterix" )}}activated{{/if}}" 
                    val="*" onclick="toggleButton(event)" ondblclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click the <b>*</b> symbol then move the variables you want 
                    to separate with <b>*</b>. To insert just <b>*</b>, double click it">
                        <i class="fas fa-asterisk"></i>
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100" 
                    val="/" onclick="toggleButton(event)"  ondblclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click the <b>/</b> symbol then move the variables you want to separate 
                    with <b>/</b>. To insert just <b>/</b>, double click it">
                        /
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100" 
                        val="(" onclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click the <b>(</b> symbol to insert it">
                        (
                    </button>
                </div>
                <div class="col p-0">
                    <button type="button" class="btn btn-outline-secondary formula-btn w-100" val=")" 
                        onclick="toFormula(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click the <b>)</b> symbol to insert it">
                        )
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col col-xx"></div>
        <div class="col col-rr">
            <div class="row pr-15">
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100" 
                    val="%in%" onclick="toggleButton(event)" ondblclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click the <b>%in%</b> symbol then move the variables you want 
                    to separate with <b>%in%</b>. To insert just <b>%in%</b>, double click it">
                    <b>%in%</b>
                </button>
                </div>
                <div class="col p-0">
                <button type="button" class="btn btn-outline-secondary formula-btn w-100" val="|" 
                    onclick="toFormula(event)"
                    data-toggle="tooltip" data-html="true" data-placement="top"   
                    title="Click the <b>|</b> symbol to insert it">
                    <b>|</b>
                </button>
                 </div>
                    <div class="col p-0">
                        <button type="button" class="btn btn-outline-secondary formula-btn w-100" val=":" 
                            onclick="toggleButton(event)" ondblclick="toFormula(event)"
                            data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Click the <b>:</b> symbol then move the variables you 
                        want to separate with <b>:</b>. To insert just <b>:</b> , 
                        double click it">
                        <b>:</b>
                    </button>
                </div>
                <div class="col col-3 p-0">
                    <select class="custom-select formula-select" onclick="toggleButton(event)" onchange="toggleButton(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Select the All N-way option and then move the variables to create N-way interactions">
                        <option value="2">All 2 ways</option>
                        <option value="3">All 3 ways</option>
                        <option value="4">All 4 ways</option>
                        <option value="5">All 5 ways</option>
                        <option value="6">All 6 way</option>
                        <option value="7">All 7 ways</option>
                        <option value="8">All 8 ways</option>
                        <option value="9">All 9 ways</option>
                        <option value="10">All 10 ways</option>
                    </select>
                </div>
                <div class="col col-2 p-0">
                <div class="formula-btn pl-1" val="^">
                    <b>^</b>
                    <input class="w-75 formula-select formula-options" type="number" 
                        bs-type="text" min="0" max="10000" step="1"  default="2" value="2" 
                        onclick="toggleSelect(event)" onchange="toggleSelect(event)"
                        data-toggle="tooltip" data-html="true" data-placement="top"   
                        title="Select a number and move the variables to add degree N polynomial terms">
                </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col col-xx">
            <button type="button" class="btn btn-outline-secondary btn-arrows" id="{{modal.id}}arrow{{ms.no}}">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>
        <div class="col col-rr">
            <textarea class="w-100" rows="3" 
                      type="text" bs-type="text" 
                      extractable="true" extractionRule="{{ms.extraction}}"  
                      id="{{modal.id}}_{{ms.no}}" 
                      modal_id="{{modal.id}}" no="{{ms.no}}" 
                      placeholder="Formula appears here" 
                      ondragover="allowDrop(event)" 
                      ondrop="dropToTextArea(event)"></textarea>
        </div>
    </div>
    </div>
    `
    constructor(modal, config) {
        this.label = config.label
        if(!config.hasOwnProperty("default"))
        {
            config.default ="plus"
        }
        if (config.required) {
            this.required = config.required;
        }
        this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
        this.id = `${modal.id}_${config.no}`
    }
    
    canExecute(refToBaseModal) {
        var outer_this = this;
        if (this.required &&  (this.getVal() =="" || this.getVal() == undefined)){
            dialog.showMessageBoxSync({type: "error", buttons: ["OK"], title: "Input rule violation", message: `The control with label: Formula Builder needs to be populated to proceed`})     
                return false
        }
        else
        {
            return true
        }
    }
    
    clearContent() {
        if (this.value !== null) {
            $(`#${this.id}`).val(this.value)
        } else {
            $(`#${this.id}`).val("")
        }
        
    }

    getVal() {
        return $(`#${this.id}`).val();
    }
}

module.exports.element = formulaControl;