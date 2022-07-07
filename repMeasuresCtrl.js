var Sqrl = require('squirrelly');
class repMeasuresCTRL {
    content;
    id;
    htmlTemplate = `
    <a class="btn btn-sm btn-secondary btn-block mb-0" data-toggle="collapse" href="#{{modal.id}}_{{ms.no}}" role="button" aria-expanded="false" aria-controls="{{modal.id}}_{{ms.no}}">
    Click to Display/Hide Configuration for within-subject factor and measure
    <div class="ripple-container"></div>
    </a>
    <div class="collapse show mb-3" id="{{modal.id}}_{{ms.no}}" bs-type="repMeasuresCTRL">
        <div class="card card-body card-dark">
            <div>
                <div class="row" >
                <div class ="ml-2">
                NOTE:<br/><br/>
1. We need to reshape the data when running a repeated measures ANOVA on a wide dataset<br/>
2. We support multiple repeated measures for a single variable e.g. Blood Sugar measured at pretest, posttest and at a followup visit<br/>
3. You need to specify a repeated factor name e.g. Blood Sugar and the number of levels. We will create a factor variable e.g. named Blood Sugar with levels created from the names of the variables containing the repeated measures e.g. the levels of the factor will be pretest, posttest and followup<br/>
4. You need to specify a measure name e.g. Value. We will create a variable e.g. Value with all the Blood Sugar values corresponding to the pretest, posttest and followup for each subject.<br/>
5. We support a single between-subject and within-subject factor variable.<br/>
6. Future versions will support multiple measures as well as multiple between subject and within subject factor variables.<br/><br/>
                </div>
                    <div class="col-12">
                        <label  class="mt-2 mr-2 small-label">Within-Subject Factor Name</label>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-12">
                        <input class="w-75" type="text" bs-type="{{if(options.ms.type)}}{{ms.type}}{{#else}}text{{/if}}" 
                            id="{{modal.id}}_{{ms.no}}_factor" 
                            {{if(options.ms.placeholder)}} placeholder="{{ms.placeholder}}" {{/if}}
                            no="{{ms.no}}_factor" extractable=true extractionRule="{{ms.extraction}}" 
                            {{if(options.ms.wrapped)}} wrapped="{{ms.wrapped}}" {{/if}} 
                            {{if(options.ms.value !== undefined)}} default="{{ms.value}}" value="{{ms.value}}" {{#else}} default="" {{/if}}
                            {{if(options.ms.filter)}} filter="{{ms.filter}}" {{/if}} ondrop="dropToInput(event)">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-12">
                        <label class="mt-2 mr-2 small-label">Number of levels</label>
                        <input class="w-25" type="number" bs-type="text" id="{{modal.id}}_{{ms.no}}_levels" no="{{ms.no}}_levels" extractable=true extractionRule="{{ms.extraction}}" min="2" max="9999" step="1" value="2" default="2" >
                    </div>
                </div>
                <div class="row" >
                    <div class="col-12">
                        <button type="button" class="btn btn-outline-secondary btn-text" onclick="addToFactorList( factor = &quot;{{modal.id}}_{{ms.no}}_factor&quot;, levels = &quot;{{modal.id}}_{{ms.no}}_levels&quot;, factorList =&quot;{{modal.id}}_{{ms.no}}_factorList&quot; );">Add</button>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-6">
                        <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">New Within-subject factor variable{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
                    </div>
                </div>
                <div class="row"  >
                    <div class="col-9">
                        <div class="list-group ms-list"  id="{{modal.id}}_{{ms.no}}_factorList" bs-type="simpleFactorList"  extractable=true extractionRule="{{ms.extraction}}" no="{{ms.no}}_factorList" >
                            <ul class ="list-group" >
                            </ul>
                        </div>
                    </div>
                    <div class="col-3">
                        <button type="button" class="btn btn-outline-secondary btn-text" onclick="removeFromList( factorList =&quot;{{modal.id}}_{{ms.no}}_factorList&quot; );">Delete</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <label  class="mt-2 mr-2 small-label">Measure Name</label>
                    </div>
                </div>
                <div class="row ">
                    <div class="col-12">
                        <input class="w-75" type="text" bs-type="{{if(options.ms.type)}}{{ms.type}}{{#else}}text{{/if}}" 
                        id="{{modal.id}}_{{ms.no}}_measure" 
                        {{if(options.ms.placeholder)}} placeholder="{{ms.placeholder}}" {{/if}}
                        no="{{ms.no}}" extractable=true extractionRule="{{ms.extraction}}" 
                        {{if(options.ms.wrapped)}} wrapped="{{ms.wrapped}}" {{/if}} 
                        {{if(options.ms.value !== undefined)}} default="{{ms.value}}" value="{{ms.value}}" {{#else}} default="" {{/if}}
                        {{if(options.ms.filter)}} filter="{{ms.filter}}" {{/if}} ondrop="dropToInput(event)">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col-12">
                        <button type="button" class="btn btn-outline-secondary btn-text" onclick="addToMeasureList(measure=&quot;{{modal.id}}_{{ms.no}}_measure&quot;, measureList =&quot;{{modal.id}}_{{ms.no}}_measureList&quot;);">Add</button>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-6">
                        <label for="{{modal.id}}_{{ms.no}}" class="mt-2 mr-2 small-label {{if(options.ms.style)}}{{ms.style}}{{/if}}">New measure variable{{if(options.ms.required)}}<span class="required">*</span>{{/if}}</label>
                    </div>
                </div>
                <div class="row"  >
                    <div class="col-9">
                        <div class="list-group ms-list"  id="{{modal.id}}_{{ms.no}}_measureList" bs-type="simpleMeasureList"  extractable=true extractionRule="{{ms.extraction}}" no="{{ms.no}}_measureList" >
                            <ul class ="list-group" >
                            </ul>
                        </div>
                    </div>
                    <div class="col-3">
                            <button type="button" class="btn btn-outline-secondary btn-text" onclick="removeFromList( factorList =&quot;{{modal.id}}_{{ms.no}}_measureList&quot; );">Delete</button>
                    </div>
                </div>
                <div class="row" >
                    <div class="col-12">
                        <button type="button" id="{{modal.id}}_{{ms.no}}_createRepMeasures" class="btn btn-outline-secondary btn-text" onclick="createRepeatedMeasures( measureList =&quot;{{modal.id}}_{{ms.no}}_measureList&quot;, factorList =&quot;{{modal.id}}_{{ms.no}}_factorList&quot;, modelid = &quot;{{modal.id}}&quot;, no =&quot;{{ms.no}}&quot;);">Define</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    constructor(modal, config) {
        this.label = config.label
        this.id = `${modal.id}_${config.no}`
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }
    getVal() {
        return common.getVal(this.id)
    }
    canExecute(refToBaseModal) {
        let labelTemp = ""
        let temp = ""
        let newobj = ""
        let config1 = ""
        let dynamicRepeatedVariables = ""
        //Code that saves the dependent variable in repeated measures to objects. We need to do this as this control is created dynamically
        //This is so that we can bring up the history correctly
        //Fetching the dependent variable
        newobj = $(`#repeatedMeasuresAnovaW_repMeasuresConfig_depVar_1`)
        if (newobj != '') {
            //Getting the label
            labelTemp = $(`#repeatedMeasuresAnovaW_repMeasuresConfig_depVarParent_1`).find('h6').text()
            temp = newobj.html()
            config1 = {
                id: "repeatedMeasuresAnovaW",
                label: "test1",
                modalType: "two",
            }
            //Creating the object
            dynamicRepeatedVariables = {
                depVar_1: {
                    el: new dstVariableList(config1, {
                        label: labelTemp,
                        no: "repMeasuresConfig_depVar_1",
                        filter: "Numeric|Scale",
                        extraction: "NoPrefix|UseComma|Enclosed",
                        required:true,
                    }), r: ['{{ repMeasuresConfig_depVar_1 | safe}}']
                },
            };
            //Getting the contents 
            dynamicRepeatedVariables.depVar_1.el.content = temp
            refToBaseModal.objects["repMeasuresConfig_depVar_1"] = dynamicRepeatedVariables.depVar_1
        }
        let pointNum = 1
        let factorListCtrl = document.getElementById("repeatedMeasuresAnovaW_repMeasuresConfig_factorList");
        let factorlistItems = factorListCtrl.getElementsByClassName("list-group-item")
        let noOfMeasures = document.getElementById("repeatedMeasuresAnovaW_repMeasuresConfig_measureList").getElementsByClassName("list-group-item").length
        factorlistItems.forEach(function (value) {
            pointNum = pointNum * parseFloat(value.getAttribute("val"));
        })
        if (pointNum == 1) {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Incorrect levels for factor", message: "You must specify a Factor name with more that one level." })
            return false;
        }
        else if (factorlistItems.length > 1) {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "More than 1 within-subject factor specified", message: "We currently support a single within-subject factor. We will support multiple within-subject factor variables in an upcoming release." })
            return false;
        }
        else if (noOfMeasures > 1) {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "More than 1 measure specified", message: "We currently support a single measure. We will support multiple measures in an upcoming release." })
            return false;
        }
        else if (noOfMeasures == 0) {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Measure variable not specified", message: "Name for the neasure variable is not specified. You need to specify a measure name and click add." })
            return false;
        }
        else if (document.getElementById("repeatedMeasuresAnovaW_repMeasuresConfig_depVar_1") == undefined) {
            dialog.showMessageBoxSync({ type: "error", buttons: ["OK"], title: "Within-subject factor variable is not specified", message: "You need to click the Define button after entering a repeated factor variable name and measure name." })
            return false;
        }
        else {
            return true;
        }
    }
    clearContent() {
        let count = 1
        let myid = this.id
        let ulist = document.getElementById(this.id + "_factorList").getElementsByTagName("UL")
        $(`#${this.id}_factorList`).find("UL").children().each(function (index, element) {
            element.remove()
        })
        $(`#${this.id}_measureList`).find("UL").children().each(function (index, element) {
            if (element.tagName != "UL")
                element.remove()
            $(`#${myid}_depVarParent_${count}`).remove()
            count = count + 1
        })
    }
}
module.exports.element = repMeasuresCTRL;