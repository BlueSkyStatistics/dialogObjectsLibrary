var Sqrl = require('squirrelly');

class optionsMenu {
    content;
    id;
    config;
    htmlTemplate = `
    <a class="btn btn-sm btn-secondary btn-block mb-0" data-toggle="collapse" href="#{{modal.id}}_{{ms.no}}" role="button" aria-expanded="false" aria-controls="{{modal.id}}_{{ms.no}}">
    {{if(options.ms.name)}} {{ms.name}} {{#else}} Options {{/if}}
    <div class="ripple-container"></div>
    </a>
    <div class="collapse" id="{{modal.id}}_{{ms.no}}">
      <div class="card card-body card-dark">
        <div>
          {{each(options.ms.content)}}
            {{ @this.content | safe }}
          {{/each}}
        </div>
      </div>
    </div>`

    constructor(modal, config) {
      this.content = Sqrl.Render(this.htmlTemplate, {modal: modal, ms: config})
      this.config = config;
      this.id = `${modal.id}_${config.no}`
    }

    canExecute() {
      return true
    }

    clearContent() {
    }
}

module.exports.element = optionsMenu;