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
            <img src="data:image/png;base64,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" class="menu-comlang">
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