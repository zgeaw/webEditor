/*
    menu - comlanguage
*/
import $ from '../../util/dom-core.js'
import Panel from '../panel.js'

// 构造函数
function Comlanguage(editor) {
    this.editor = editor
    this.$elem = $(
        `<div class="w-e-menu">
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAvZJREFUOBGNlF1Ik2EUx9327iMhiSlYUNmmBH2DFl14E1aXURAEOafpFMPRCIOKuhGiuzKbRRnoyE0U6iropos+rkuIvpBcKrnSXUyXDea2tvU7Y+/QZm4PnPe8zzn/83/+z/Oc99WU/Gf09vZuqKysPJROp49oNJqLwNKpVKpPq9W+CQaDb7u7u6NrlWr+DXo8HpNerz9P3AmRGT+NTQkO8mpiFnwIu7e4uPjQ5XLFJKeOVYQjIyNWEj7A2ym8jX/S1NQUUMHih4aGthkMhjO8XsKmUG1vbm6WRTMjR4iyHQBfQfI5Go06Ojo6gipoLe/1erewfQ/4nYlEoqG1tXVGcFp5uN1uI9scI/nV7/efKkQmNXa7fS4SiZxgJ9+oHRUOiSvyKC8v78RVA9hltVrrfD5fP3Od5NYZSbbbFYvFGo1G44TZbG4He1+Tvc0vTNw2m+1O9oxOozajvgDh05aWlh8IuIzSzng8vkepqKioo3gTNibFbW1ts7i+dYjyUhCNcv7XFUWpVWA+hvm5zTlBDg4ObiS5r5BCalJLS0sfnE5nBBEBOmSGmnqFm3Lx8kJd1mQyHWbuJa7Dp9X4Sg+ZhlSyrKzsLPHXmECnCZ+TS/mD5dpncnLypcVi2bu8vJyLkc8bOp0uFQgEwmoCMq0sonBT/ag5qSZ6enpSvIfUeZFeFMsX5NFwQ/WwP0fRbofD8ZOGPcACVyEq2DbJZPImX8knzq8Kso+IO67Q5eNcQoiza4TkFuQJkr94L9g2EMpxlUBkQ8R8OBx+nzknVHZBdEP6iE9oXkDFjqy6ceqv0cePMioWFhYGUTXBJ+STRi+WTHDUHcVFQ6HQY5lnCOUXhGxpgSr+gc9QvFWSxQyUyS5/wxEXfO6cONzvbLmBFaXZ37GVK8PDwxYwmWMR8FoDIQniWrojg8sDDwwM6EtLS9shvYBtZoEAfha/6ke6gtxCXk//7peWyyNUgSQNNTU1tRAdzPaphZz06KpBPoXd5Xf2QBJ/AfO0eotAz5lPAAAAAElFTkSuQmCC" class="menu-comlang">
        </div>`
    )
    this.type = 'panel'

    // 当前是否 active 状态
    this._active = false
}

// 原型
Comlanguage.prototype = {
    constructor: Comlanguage,

    onClick: function onClick() {
      this._createPanel();
    },

    _createPanel: function _createPanel() {
      var _this = this;

      var editor = this.editor;
      var config = editor.config;
      // 获取常用语配置
      var comLanguageTions = config.comLanguageTions || [];

      // 创建表情 dropPanel 的配置
      var tabConfig = [];
      var _html = []
      var Content = comLanguageTions.content
      Content.forEach(function (item) {
        _html.push('<li class="w-e-language-li">' + item + '</li>')
      })
      tabConfig.push({
        title: comLanguageTions.title,
        tpl: '<ul class="w-e-language">' + _html.join('') + '</ul>',
        events: [{
          selector: 'li.w-e-language-li',
          type: 'click',
          fn: function fn(e) {
            var target = e.target;
            var $target = $(target);
            var nodeName = $target.getNodeName();
            var insertHtml = void 0;
            insertHtml = $target.html();

            _this._insert(insertHtml);
            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
            return true;
          }
        }]
      })

      var panel = new Panel(this, {
        width: 300,
        height: 200,
        // 一个 Panel 包含多个 tab
        tabs: tabConfig
      });

      // 显示 panel
      panel.show();

      // 记录属性
      this.panel = panel;
    },

    // 插入表情
    _insert: function _insert(languageHtml) {
      var editor = this.editor;
      editor.cmd.do('insertHTML', languageHtml);
    }
  }

export default Comlanguage