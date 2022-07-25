const common = require('./common')
var modal = require('./modal').element
var srcDataSetList = require('./srcDataSetList').element
var srcVariableList = require('./srcVariableList').element
var dstVariableList = require('./dstVariableList').element
var dstVariable = require('./dstVariable').element
var checkbox = require('./checkBox').element
var labelVar = require('./label').element
var input = require('./inputVariable').element 
var radioButton = require('./radioButton').element
var comboBox = require('./comboBox').element
var comboBoxWithChilderen = require('./comboBoxWithChilderen').element
var inputSpinner = require('./inputSpinner').element
var advancedSlider = require('./advancedSliderVariable').element
var wrapControl = require('./wrapControl').element
var computeBuilder = require('./computeBuilder').element
var formulaBuilder = require('./formulaBuilder').element
var labelHelp = require('./labelHelp').element
var optionsVar = require("./options").element
var preVar = require("./pre").element
var selectVar = require("./select").element
var sliderVariable = require("./sliderVariable").element
var tabsView = require('./tabs').element
var switchCase = require('./switchCase').element
var repMeasuresCTRL = require('./repMeasuresCtrl').element
var colorInput = require('./colorPicker').element
var fileOpenControl = require('./fileOpenControl').element
var labelHelpSixSigma = require('./labelHelpSixSigma').element

module.exports = {
    "common": common,
    "modal": modal,
    "srcVariableList": srcVariableList,
    "dstVariableList": dstVariableList,
    "dstVariable": dstVariable,
    "checkbox": checkbox,
    "labelVar": labelVar,
    "input": input,
    "radioButton": radioButton,
    "comboBox": comboBox,
    "comboBoxWithChilderen": comboBoxWithChilderen,
    "inputSpinner": inputSpinner,
    "advancedSlider": advancedSlider,
    "wrapControl": wrapControl,
    "computeBuilder": computeBuilder,
    "formulaBuilder": formulaBuilder,
    "labelHelp": labelHelp,
    "optionsVar": optionsVar,
    "preVar": preVar,
    "selectVar": selectVar,
    "sliderVariable": sliderVariable,
    "srcDataSetList": srcDataSetList,
    "tabsView": tabsView,
    "switchCase": switchCase,
    "repMeasuresCTRL":repMeasuresCTRL,
    "colorInput":colorInput,
    "fileOpenControl": fileOpenControl,
    "labelHelpSixSigma": labelHelpSixSigma,
}