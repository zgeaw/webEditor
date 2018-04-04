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
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAAAXNSR0IArs4c6QAAA19JREFUOBGNlN1L02EUx7ff3HS6pmi6BFdBXiQR0k2ovah50RsihBeGU5FpGpJKf4EX3XQjtItKdIo6kS4SFLrqDctSqwuzqG5DKFMZaXPadLPPGT5jblo9cH7nPN9znu9zznme56fX/WN0dnaabTZbViAQMBsMBn8wGFyor69f/9sy/V5Oj8dThs+JnEHSEQ0JIUvIeCgUctfW1o5jx4040qGhoUNbW1suvV5/nuhXyCjygQx/oa1km4+uQAqQsfX19Xan0/kNOzJ2kPb3959g0RiE82TSVlNT8zoSGWMMDAwUE+sCtpBEucPh+KRCIqQEHSRokoBpCGsobVUF7aW7urpSU1JShkkij54X0ut5iZU+6To6OjQI70E4v7q66vgfQlnX1NS0jKpi3ZrJZJKswyNMmpubW8rsItJMoF88g4OD2RyWVezY0dfXl9bd3W0TnLJXqOw6ZiXtKxQsTIpuRp4S8FZA6a2mae8p67Hb7d4nmBo9PT3pZDVuNptnaFme4HILpG1Ue03mGn1JRp8GfCiAjISEBCHKRLLBjYKpwUITdjaSxcYWhRM3QhIltNKkWSyWA0xSKeGjCqiurn7BFSqg+WUNDQ1ehYuWw8BXjFmgKhMc0lkk0263708gIJkd9WTgE6calDSt7FiN73MsBuEKycmBm+XjZ7IFeaQUDqhd7mHswug5B3lZRGFwWCEOwbOm+Xy+eSY/AY+rAPRRsr+NjtzjKJ/O5XIlEn8XOaZw4vOZL87NzS1pcoWYTABWqgD0LbAjPFnWuxKjcLnTpoyMDLmT0q77Ub4r2M/xB8KZUOo52vBkc3OzoK6u7o0ESvlsNIy5wAYe9FcO8zDYVexUyqygt+HDpQ0l4M+ouIjDm1Ll6enjGME5vKhT6gGA5YDdgPQCC9Kw5SY8gtwF4QK2bvupyqHOQFglmCLV9fb22rnUk2DvlpeXHS0tLTtuA68oKfY/Ki/LaDQ+YNNcv99f1NjY+GMHqUwoQ5otGS+RTRvZTAi+26DfpWQvvU3a2NgoZ8MvKi6SqQK2M74D+SWwKWSUxbNs4gOz0jv1Pz2JbwT8Jr/I72q96DhS5ZTmQyJ//rNIBmJAgmCLbCJv3Q3ZS7C4sSepipReQpApL0UeitfrXWxtbf2t/LvpPwEzhCrZcgP6AAAAAElFTkSuQmCC" class="menu-face">
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
                        faceHtml += '<span class="w-e-item"><img src="' + src + '" alt="' + alt + '" title="' + alt + '" data-w-e="1"/></span>'
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