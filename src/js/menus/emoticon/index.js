/*
    menu - emoticon
*/
import $ from '../../util/dom-core.js'
import Panel from '../panel.js'

// 构造函数
function Emoticon(editor) {
    this.editor = editor
    this.$elem = $(
        `<div class="w-e-menu">
            <img src="data:image/png;base64,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" class="menu-face">
        </div>`
    )
    this.type = 'panel'

    // 当前是否 active 状态
    this._active = false
}

// 原型
Emoticon.prototype = {
    constructor: Emoticon,

    onClick: function () {
        this._createPanel()
    },

    _createPanel: function () {
        const editor = this.editor
        const config = editor.config
        // 获取表情配置
        const emotions = config.emotions || []

        // 创建表情 dropPanel 的配置
        const tabConfig = []
        emotions.forEach(emotData => {
            const emotType = emotData.type
            const content = emotData.content || []

            // 这一组表情最终拼接出来的 html
            let faceHtml = ''

            // emoji 表情
            if (emotType === 'emoji') {
                content.forEach(item => {
                    if (item) {
                        faceHtml += '<span class="w-e-item">' + item + '</span>'
                    }
                })
            }
            // 图片表情
            if (emotType === 'image') {
                content.forEach(item => {
                    const src = item.src
                    const alt = item.alt
                    if (src) {
                        // 加一个 data-w-e 属性，点击图片的时候不再提示编辑图片
                        faceHtml += '<span class="w-e-item"><img class="custom-face" src="' + src + '" alt="' + alt + '" title="' + alt + '" data-w-e="1"/></span>'
                    }
                })
            }

            tabConfig.push({
                title: emotData.title,
                tpl: `<div class="w-e-emoticon-container">${faceHtml}</div>`,
                events: [
                    {
                        selector: 'span.w-e-item',
                        type: 'click',
                        fn: (e) => {
                            const target = e.target
                            const $target = $(target)
                            const nodeName = $target.getNodeName()

                            let insertHtml
                            if (nodeName === 'IMG') {
                                // 插入图片
                                insertHtml = $target.parent().html()
                            } else {
                                // 插入 emoji
                                insertHtml = '<span>' + $target.html() + '</span>'
                            }

                            this._insert(insertHtml)
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    }
                ]
            })
        })

        const panel = new Panel(this, {
            width: 300,
            height: 200,
            // 一个 Panel 包含多个 tab
            tabs: tabConfig
        })

        // 显示 panel
        panel.show()

        // 记录属性
        this.panel = panel
    },

    // 插入表情
    _insert: function (emotHtml) {
        const editor = this.editor
        editor.cmd.do('insertHTML', emotHtml)
    }
}

export default Emoticon