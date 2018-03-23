/*
    menu - comlanguage
*/
import $ from '../../util/dom-core.js'
import Panel from '../panel.js'
import imageUrl from '../../imageConfig.js'

// 构造函数
function Comlanguage(editor) {
    this.editor = editor
    this.$elem = $(
        `<div class="w-e-menu">
            <img src="`+ imageUrl +`/language.png" class="cursor">
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