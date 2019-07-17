/*
    menu - img
*/
import $ from '../../util/dom-core.js'
import { getRandom, arrForEach } from '../../util/util.js'
import Panel from '../panel.js'

// 构造函数
function Image(editor) {
    this.editor = editor
    const imgMenuId = getRandom('w-e-img')
    this.$elem = $('<div class="w-e-menu" id="' + imgMenuId + '"><img src="data:image/png;base64,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" class="menu-image"></div>')
    editor.imgMenuId = imgMenuId
    this.type = 'panel'

    // 当前是否 active 状态
    this._active = false
}

// 原型
Image.prototype = {
    constructor: Image,

    onClick: function () {
        const editor = this.editor
        const config = editor.config
        if (config.qiniu) {
            return
        }
        if (this._active) {
            this._createEditPanel()
        } else {
            this._createInsertPanel()
        }
    },

    _createEditPanel: function () {
        const editor = this.editor

        // id
        const width30 = getRandom('width-30')
        const width50 = getRandom('width-50')
        const width100 = getRandom('width-100')
        const delBtn = getRandom('del-btn')

        // tab 配置
        const tabsConfig = [
            {
                title: '编辑图片',
                tpl: `<div>
                    <div class="w-e-button-container" style="border-bottom:1px solid #f1f1f1;padding-bottom:5px;margin-bottom:5px;">
                        <span style="float:left;font-size:14px;margin:4px 5px 0 5px;color:#333;">最大宽度：</span>
                        <button id="${width30}" class="left">30%</button>
                        <button id="${width50}" class="left">50%</button>
                        <button id="${width100}" class="left">100%</button>
                    </div>
                    <div class="w-e-button-container">
                        <button id="${delBtn}" class="gray left">删除图片</button>
                    </dv>
                </div>`,
                events: [
                    {
                        selector: '#' + width30,
                        type: 'click',
                        fn: () => {
                            const $img = editor._selectedImg
                            if ($img) {
                                $img.css('max-width', '30%')
                            }
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    },
                    {
                        selector: '#' + width50,
                        type: 'click',
                        fn: () => {
                            const $img = editor._selectedImg
                            if ($img) {
                                $img.css('max-width', '50%')
                            }
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    },
                    {
                        selector: '#' + width100,
                        type: 'click',
                        fn: () => {
                            const $img = editor._selectedImg
                            if ($img) {
                                $img.css('max-width', '100%')
                            }
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    },
                    {
                        selector: '#' + delBtn,
                        type: 'click',
                        fn: () => {
                            const $img = editor._selectedImg
                            if ($img) {
                                $img.remove()
                            }
                            // 返回 true，表示该事件执行完之后，panel 要关闭。否则 panel 不会关闭
                            return true
                        }
                    }
                ]
            }
        ]

        // 创建 panel 并显示
        const panel = new Panel(this, {
            width: 300,
            tabs: tabsConfig
        })
        panel.show()

        // 记录属性
        this.panel = panel
    },

    _createInsertPanel: function () {
        const editor = this.editor
        const uploadImg = editor.uploadImg
        const config = editor.config

        // id
        const upTriggerId = getRandom('up-trigger')
        const upFileId = getRandom('up-file')
        const linkUrlId = getRandom('link-url')
        const linkBtnId = getRandom('link-btn')

        // tabs 的配置
        const tabsConfig = [
            {
                title: '上传图片',
                tpl: `<div class="w-e-up-img-container">
                    <div id="${upTriggerId}" class="w-e-up-btn">
                        <i class="w-e-icon-upload2"></i>
                    </div>
                    <div style="display:none;">
                        <input id="${upFileId}" type="file" multiple="multiple" accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"/>
                    </div>
                </div>`,
                events: [
                    {
                        // 触发选择图片
                        selector: '#' + upTriggerId,
                        type: 'click',
                        fn: () => {
                            const $file = $('#' + upFileId)
                            const fileElem = $file[0]
                            if (fileElem) {
                                fileElem.click()
                            } else {
                                // 返回 true 可关闭 panel
                                return true
                            }
                        }
                    },
                    {
                        // 选择图片完毕
                        selector: '#' + upFileId,
                        type: 'change',
                        fn: () => {
                            const $file = $('#' + upFileId)
                            const fileElem = $file[0]
                            if (!fileElem) {
                                // 返回 true 可关闭 panel
                                return true
                            }

                            // 获取选中的 file 对象列表
                            const fileList = fileElem.files
                            if (fileList.length) {
                                uploadImg.uploadImg(fileList)
                            }

                            // 返回 true 可关闭 panel
                            return true
                        }
                    }
                ]
            }, // first tab end
            {
                title: '网络图片',
                tpl: `<div>
                    <input id="${linkUrlId}" type="text" class="block" placeholder="图片链接"/></td>
                    <div class="w-e-button-container">
                        <button id="${linkBtnId}" class="right">插入</button>
                    </div>
                </div>`,
                events: [
                    {
                        selector: '#' + linkBtnId,
                        type: 'click',
                        fn: () => {
                            const $linkUrl = $('#' + linkUrlId)
                            const url = $linkUrl.val().trim()

                            if (url) {
                                uploadImg.insertLinkImg(url)
                            }

                            // 返回 true 表示函数执行结束之后关闭 panel
                            return true
                        }
                    }
                ]
            } // second tab end
        ] // tabs end

        // 判断 tabs 的显示
        const tabsConfigResult = []
        if ((config.uploadImgShowBase64 || config.uploadImgServer || config.customUploadImg) && window.FileReader) {
            // 显示“上传图片”
            tabsConfigResult.push(tabsConfig[0])
        }
        if (config.showLinkImg) {
            // 显示“网络图片”
            tabsConfigResult.push(tabsConfig[1])
        }

        // 创建 panel 并显示
        const panel = new Panel(this, {
            width: 300,
            tabs: tabsConfigResult
        })
        panel.show()

        // 记录属性
        this.panel = panel
    },

    // 试图改变 active 状态
    tryChangeActive: function (e) {
        const editor = this.editor
        const $elem = this.$elem
        if (editor._selectedImg) {
            this._active = true
            $elem.addClass('w-e-active')
        } else {
            this._active = false
            $elem.removeClass('w-e-active')
        }
    }
}

export default Image