;
(function($) {
	var Tab = function(tab) {
		var _this_ = this;
		this.tab = tab;
		//默认配置参数
		this.config = {
			//用来定义鼠标的触发类型，是click还是mouseover，默认是mouseover
			"triggerType": "mouseover",
			//内容切换效果，是直接切换还是淡入淡出
			"effect": "default",
			//默认展示第几个tab
			"invoke": 1,
			//tab是否自动切换，当指定了时间间隔，就表示自动切换，并且切换为指定时间间隔
			"auto": 5000
		};
		//如果配置参数存在，扩展调默认配置参数
		if(this.getConfig()) {
			$.extend(this.config, this.getConfig());
		}

		//保存对应的标签列表
		this.tabItems = this.tab.find("ul.tab-nav li");
		this.contentItems = this.tab.find("div.content-wrapp div.content-item");

		var config = this.config;
		if(config.triggerType === 'click') {
			this.tabItems.bind(config.triggerType, function() {
				_this_.invoke($(this));
			})
		} else if(config.triggerType === 'mouseover' || config.triggerType != 'click') {
			this.tabItems.mouseover(function() {
				_this_.invoke($(this));
			})
		}
		if(config.auto) {
			this.timer = null;
			this.loop = 0;
			this.autoplay();
			this.tab.hover(function() {
				window.clearInterval(_this_.timer);
			}, function() {
				_this_.autoplay();
			})
		}
		if(config.invoke > 1) {
			this.invoke(this.tabItems.eq(config.invoke - 1));
		}
	};
	Tab.prototype = {
		getConfig: function() {
			var config = this.tab.attr("data-config");
			if(config && config != "") {
				return $.parseJSON(config)
			} else {
				return null;
			}
		},
		invoke: function(currentTab) {
			var _this_ = this;

			var index = currentTab.index(); //索引
			var contentItems = this.contentItems;
			var effect = this.config.effect; //内容切换效果

			//tab切换
			currentTab.addClass("actived").siblings().removeClass("actived");
			if(effect === "default" || effect != "fade") {
				contentItems.eq(index).addClass("current").siblings().removeClass("current");
			} else {
				contentItems.eq(index).fadeIn().siblings().fadeOut();
			}

			if(this.config.auto) {
				_this_.loop = index;
			}

		},
		autoplay: function() { //自动播放
			var _this_ = this,
				tabItems = this.tabItems,
				tabLength = tabItems.size(),
				config = this.config;
			this.timer = window.setInterval(function() {
				_this_.loop++;
				if(_this_.loop >= tabLength) {
					_this_.loop = 0
				}
				tabItems.eq(_this_.loop).trigger(config.triggerType); //触发指定事件
			}, config.auto)

		}
	};
//	Tab.init = function(tabs) {
//		var _this_= this;
//		tabs.each(function(){
//			new _this_($(this))
//		})
//
//	}

    //注册成jq方法
	$.fn.extend({
		tab:function(){
			this.each(function(){
				new Tab($(this))
			})
			return this;
		}
	})
	window.Tab = Tab;
})(jQuery)