var Sqrl = require('squirrelly');
const common = require("./common")
class labelHelpSixSigma {
    content;
    id;
    htmlTemplate = `
<p id="{{modal.id}}_{{ms.no}}" no="{{ms.no}}" bs-type="label" class="h{{ms.h}} {{if(options.ms.style)}}{{ms.style}}{{/if}}">
<h5>SixSigma five part tutorial</h5>
<ul>
<li><a href="https://datascienceplus.com/six-sigma-dmaic-series-in-r-part-1/">Part-1</a></li>
<li><a href="https://datascienceplus.com/six-sigma-dmaic-series-in-r-part-2/">Part-2</a></li>
<li><a href="https://datascienceplus.com/six-sigma-dmaic-series-in-r-part-3/">Part-3</a></li>
<li><a href="https://datascienceplus.com/six-sigma-dmaic-series-in-r-part4/">Part-4</a></li>
<li><a href="https://datascienceplus.com/six-sigma-dmaic-series-in-r-part-5/">Part-5</a></li>
</ul>
<h5>QCC - quality control charting tutoria</h5>
<ul>
<li><a href="https://cran.r-project.org/web/packages/qcc/vignettes/qcc_a_quick_tour.html">Quality control charting</a></li>
</ul>
    `
    constructor(modal, config) {
        this.content = Sqrl.Render(this.htmlTemplate, { modal: modal, ms: config })
    }
    canExecute() {
        return true
    }
    clearContent() { }
}
module.exports.element = labelHelpSixSigma;