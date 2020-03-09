;
(function($) {
	var Tab = function(tab) {
		var _this = this;
		this.tab = tab;
		this.config = {
			"triggerType": "mouseover",
			"effect": "default",
			"invoke": 1,
			"auto": false
		}
		this.tabItems = tab.find("ul.tab-nav li");
		this.contentItems = tab.find(".content-wrapp .content-item");

		if(this.getConfig()) {
			//this.config=this.getConfig();
			$.extend(this.config, this.getConfig());
		}

		var config = this.config;
		if(config.triggerType === "click") {
			this.tabItems.bind(config.triggerType, function() {
				_this.invoke($(this))
			})
		} else {
			this.tabItems.mouseover(function() {
				_this.invoke($(this));
			})
		}

        if(config.auto){
        	this.timer=null;
        	this.loop=0;
        	this.autoplay();
        	tab.hover(function(){
        		window.clearInterval(_this.timer);
        	},function(){
        		_this.autoplay();
        	})
        }
	}

	Tab.prototype = {
		getConfig: function() {
			var config = this.tab.attr("data-config");
			if(config && config != "") {
				return $.parseJSON(config)
			} else {
				return null;
			}
		},
		invoke: function(tabItem) {
			var _this = this;
			var index = tabItem.index();
			var contentItems = this.contentItems;
			var config = this.config;
			tabItem.addClass("actived").siblings().removeClass("actived");
			if(config.effect === "fade") {
				contentItems.eq(index).fadeIn().siblings().fadeOut();
			} else {
				contentItems.eq(index).addClass("current").siblings().removeClass("current");
			}
			if(config.auto){
				this.loop=index;
			}
		},
		autoplay:function(){

			var _this = this,
			tabItems=this.tabItems,
			contentItems=this.contentItems,
			config=this.config;
			
			this.timer=window.setInterval(function(){
				_this.loop++;
				if(_this.loop>=tabItems.size()){
					_this.loop=0;
				}
				tabItems.eq(_this.loop).trigger(config.triggerType);
			},config.auto);
		}

	}

	$.fn.extend({
		tab: function() {
			this.each(function() {
				new Tab($(this))
			})
			return this;
		}
	});
	window.Tab = Tab;

})(jQuery)