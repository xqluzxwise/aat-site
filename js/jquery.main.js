(function($){'use strict';function Search(options){this.options=$.extend({container:null,hideOnClickOutside:false,menuActiveClass:'nav-active',menuOpener:'.nav-opener',menuDrop:'.nav-drop',toggleEvent:'click.search',outsideClickEvent:'click.search touchstart.search pointerdown.search MSPointerDown.search'},options);this.initStructure();this.attachEvents();}
Search.prototype={initStructure:function(){this.page=$('html');this.container=$(this.options.container);this.opener=this.container.find(this.options.menuOpener);this.drop=this.container.find(this.options.menuDrop);},attachEvents:function(){var self=this;if(activateResizeHandler){activateResizeHandler();activateResizeHandler=null;}
this.outsideClickHandler=function(e){if(self.isOpened()){var target=$(e.target);if(!target.closest(self.opener).length&&!target.closest(self.drop).length){self.hide();}}};this.openerClickHandler=function(e){e.preventDefault();self.toggle();};this.opener.on(this.options.toggleEvent,this.openerClickHandler);},isOpened:function(){return this.container.hasClass(this.options.menuActiveClass);},show:function(){this.container.addClass(this.options.menuActiveClass);if(this.options.hideOnClickOutside){this.page.on(this.options.outsideClickEvent,this.outsideClickHandler);}},hide:function(){this.container.removeClass(this.options.menuActiveClass);if(this.options.hideOnClickOutside){this.page.off(this.options.outsideClickEvent,this.outsideClickHandler);}},toggle:function(){if(this.isOpened()){this.hide();}else{this.show();}},destroy:function(){this.container.removeClass(this.options.menuActiveClass);this.opener.off(this.options.toggleEvent,this.clickHandler);this.page.off(this.options.outsideClickEvent,this.outsideClickHandler);}};var activateResizeHandler=function(){var win=$win,doc=$('html'),resizeClass='resize-active',flag,timer;var removeClassHandler=function(){flag=false;doc.removeClass(resizeClass);};var resizeHandler=function(){if(!flag){flag=true;doc.addClass(resizeClass);}
clearTimeout(timer);timer=setTimeout(removeClassHandler,500);};win.on('resize orientationchange',resizeHandler);};$.fn.search=function(options){return this.each(function(){var params=$.extend({},options,{container:this}),instance=new Search(params);$.data(this,'Search',instance);});};var ImageStretcher={getDimensions:function(data){var ratio=data.imageRatio||(data.imageWidth/data.imageHeight),slideWidth=data.maskWidth,slideHeight=slideWidth/ratio;if(slideHeight<data.maskHeight){slideHeight=data.maskHeight;slideWidth=slideHeight*ratio;}
return{width:slideWidth,height:slideHeight,top:(data.maskHeight- slideHeight)/ 2,
left:(data.maskWidth- slideWidth)/ 2
};},getRatio:function(image){if(image.prop('naturalWidth')){return image.prop('naturalWidth')/ image.prop('naturalHeight');
}else{var img=new Image();img.src=image.prop('src');return img.width/img.height;}},imageLoaded:function(image,callback){var self=this;var loadHandler=function(){callback.call(self);};if(image.prop('complete')){loadHandler();}else{image.one('load',loadHandler);}},resizeHandler:function(){var self=this;$.each(this.imgList,function(index,item){if(item.image.prop('complete')){self.resizeImage(item.image,item.container);}});},resizeImage:function(image,container){this.imageLoaded(image,function(){var styles=this.getDimensions({imageRatio:this.getRatio(image),maskWidth:container.width(),maskHeight:container.height()});image.css({width:styles.width,height:styles.height,marginTop:styles.top,marginLeft:styles.left});});},add:function(options){var container=$(options.container?options.container:window),image=typeof options.image==='string'?container.find(options.image):$(options.image);this.resizeImage(image,container);if(!this.win){this.resizeHandler=$.proxy(this.resizeHandler,this);this.imgList=[];this.win=$win;this.win.on('resize orientationchange',this.resizeHandler);}
this.imgList.push({container:container,image:image});}};function OpenClose(options){this.options=$.extend({addClassBeforeAnimation:true,hideOnClickOutside:false,activeClass:'active',opener:'.opener',slider:'.slide',animSpeed:400,effect:'fade',event:'click'},options);this.init();}
OpenClose.prototype={init:function(){if(this.options.holder){this.findElements();this.attachEvents();this.makeCallback('onInit',this);}},findElements:function(){this.holder=$(this.options.holder);this.opener=this.holder.find(this.options.opener);this.slider=this.holder.find(this.options.slider);},attachEvents:function(){var self=this;this.eventHandler=function(e){e.preventDefault();if(self.slider.hasClass(slideHiddenClass)){self.showSlide();}else{self.hideSlide();}};self.opener.bind(self.options.event,this.eventHandler);if(self.options.event==='over'){self.opener.bind('mouseenter',function(){if(!self.holder.hasClass(self.options.activeClass)){self.showSlide();}});self.holder.bind('mouseleave',function(){self.hideSlide();});}
self.outsideClickHandler=function(e){if(self.options.hideOnClickOutside){var target=$(e.target);if(!target.is(self.holder)&&!target.closest(self.holder).length){self.hideSlide();}}};if(this.holder.hasClass(this.options.activeClass)){$doc.bind('click touchstart',self.outsideClickHandler);}else{this.slider.addClass(slideHiddenClass);}},showSlide:function(){var self=this;if(self.options.addClassBeforeAnimation){self.holder.addClass(self.options.activeClass);}
self.slider.removeClass(slideHiddenClass);$doc.bind('click touchstart',self.outsideClickHandler);self.makeCallback('animStart',true);toggleEffects[self.options.effect].show({box:self.slider,speed:self.options.animSpeed,complete:function(){if(!self.options.addClassBeforeAnimation){self.holder.addClass(self.options.activeClass);}
self.makeCallback('animEnd',true);}});},hideSlide:function(){var self=this;if(self.options.addClassBeforeAnimation){self.holder.removeClass(self.options.activeClass);}
$doc.unbind('click touchstart',self.outsideClickHandler);self.makeCallback('animStart',false);toggleEffects[self.options.effect].hide({box:self.slider,speed:self.options.animSpeed,complete:function(){if(!self.options.addClassBeforeAnimation){self.holder.removeClass(self.options.activeClass);}
self.slider.addClass(slideHiddenClass);self.makeCallback('animEnd',false);}});},destroy:function(){this.slider.removeClass(slideHiddenClass).css({display:''});this.opener.unbind(this.options.event,this.eventHandler);this.holder.removeClass(this.options.activeClass).removeData('OpenClose');$doc.unbind('click touchstart',this.outsideClickHandler);},makeCallback:function(name){if(typeof this.options[name]==='function'){var args=Array.prototype.slice.call(arguments);args.shift();this.options[name].apply(this,args);}}};var slideHiddenClass='js-slide-hidden';(function(){var tabStyleSheet=$('<style type="text/css">')[0];var tabStyleRule='.'+ slideHiddenClass;tabStyleRule+='{position:absolute !important;left:-9999px !important;top:-9999px !important;display:block !important}';if(tabStyleSheet.styleSheet){tabStyleSheet.styleSheet.cssText=tabStyleRule;}else{tabStyleSheet.appendChild(document.createTextNode(tabStyleRule));}
$('head').append(tabStyleSheet);}());var toggleEffects={slide:{show:function(o){o.box.stop(true).hide().slideDown(o.speed,o.complete);},hide:function(o){o.box.stop(true).slideUp(o.speed,o.complete);}},fade:{show:function(o){o.box.stop(true).hide().fadeIn(o.speed,o.complete);},hide:function(o){o.box.stop(true).fadeOut(o.speed,o.complete);}},none:{show:function(o){o.box.hide().show(0,o.complete);},hide:function(o){o.box.hide(0,o.complete);}}};$.fn.openClose=function(opt){return this.each(function(){$(this).data('OpenClose',new OpenClose($.extend(opt,{holder:this})));});};$.fn.slideAccordion=function(opt){var options=$.extend({addClassBeforeAnimation:false,allowClickWhenExpanded:false,activeClass:'active',opener:'.opener',slider:'.slide',animSpeed:300,collapsible:true,event:'click'},opt);return this.each(function(){var accordion=$(this);var items=accordion.find(':has('+ options.slider+')');items.each(function(){var item=$(this);var opener=item.find(options.opener);var slider=item.find(options.slider);opener.bind(options.event,function(e){if(item.hasClass(options.activeClass)){if(options.allowClickWhenExpanded){return;}else if(options.collapsible){slider.slideUp(options.animSpeed,function(){hideSlide(slider);item.removeClass(options.activeClass);});}}else{var levelItems=item.siblings('.'+ options.activeClass);var sliderElements=levelItems.find(options.slider);item.addClass(options.activeClass);showSlide(slider).hide().slideDown(options.animSpeed);sliderElements.slideUp(options.animSpeed,function(){levelItems.removeClass(options.activeClass);hideSlide(sliderElements);});}
e.preventDefault();});if(item.hasClass(options.activeClass))
showSlide(slider);else
hideSlide(slider);});});};var showSlide=function(slide){return slide.css({position:'',top:'',left:'',width:''});};var hideSlide=function(slide){return slide.show().css({position:'absolute',top:-9999,left:-9999,width:slide.width()});};var $body=$('body');var $win=$(window);var $doc=$(document);$win.on('load',function(){$('#pageLoad').remove();});$('input, textarea').placeholder();$body.addClass('js-ready');$('.same-height, .table tr').each(function(i,el){var $this=$(el);$this.find('.height, td .cell').matchHeight({byRow:true});});var $counter=$('.counter');if($counter.length){$counter.counterUp({delay:10,time:2000});}
var $fancybox=$('.fancybox');if($fancybox.length){$fancybox.fancybox({padding:0,margin:0});}
$("#partner-slide").owlCarousel({items:6,slideSpeed:300,itemsTablet:[768,3],itemsMobile:[480,1],autoPlay:3000,touchDrag:false,pagination:false,mouseDrag:false});$("#testimonial-home-slide").owlCarousel({slideSpeed:300,paginationSpeed:400,singleItem:true,touchDrag:false,mouseDrag:false});$("#tour-slide").owlCarousel({navigation:true,slideSpeed:300,paginationSpeed:400,singleItem:true,touchDrag:false,pagination:false,mouseDrag:false});jcf.setOptions('Select',{wrapNative:false,wrapNativeOnMobile:false});jcf.replaceAll();$('.smooth-scroll').click(function(){if(location.pathname.replace(/^\//,'')==this.pathname.replace(/^\//,'')&&location.hostname==this.hostname){var target=$(this.hash);target=target.length?target:$('[name='+ this.hash.slice(1)+']');if(target.length){$('html, body').animate({scrollTop:target.offset().top},1000);return false;}}});$win.scroll(function(){if($(this).scrollTop()>=50){$('#scroll-to-top').fadeIn(200);}else{$('#scroll-to-top').fadeOut(200);}});$('#scroll-to-top').click(function(){$('body,html').animate({scrollTop:0},1000);});function isScrolledIntoView(elem){var docViewTop=$win.scrollTop();var docViewBottom=docViewTop+ $win.height();var elemTop=$(elem).offset().top;var elemBottom=elemTop+ $(elem).height();return((elemBottom<=docViewBottom)&&(elemTop>=docViewTop));}
var $progressBar=$('.progress-bar');if($progressBar.length){$win.scroll(function(){$progressBar.each(function(){var $this=$(this);if(isScrolledIntoView(this)===true){var bar_value=$this.attr('aria-valuenow')+'%';$this.width(bar_value);}});});}
var availableTags=window.availableTags;availableTags=[];$('#search-input').autocomplete({source:availableTags,appendTo:'.search-wrap .form-group'});$doc.on('click','.dropdown',function(e){e.stopPropagation();});$('#tabSelect').on('change',function(e){var id=$(this).val();$('a[href="'+ id+'"]').tab('show');});var doImageStretch=function(){$win.trigger('fontresize');$('.bg-stretch').each(function(){var container=$(this),img=container.find('img');ImageStretcher.resizeImage(img,container);});};$win.on('load',doImageStretch);$win.on('resize orientationchange',function(){setTimeout(doImageStretch,200);});$doc.ready(function(){var $sliderRange=$('#slider-range');var $amount=$('#amount');if($sliderRange.length){$sliderRange.slider({range:true,min:0,max:3000,values:[400,2600],slide:function(event,ui){$amount.val('$'+ ui.values[0]+' - $'+ ui.values[1]);}});$amount.val('$'+ $sliderRange.slider('values',0)+' - $'+ $sliderRange.slider('values',1));}});$('.ui-slider-handle').draggable();$doc.ready(function(){$.stellar({horizontalScrolling:false,verticalOffset:0});new WOW().init();});var onSCroll=function(){var sticky=$('#header'),scroll=$win.scrollTop();sticky.toggleClass('fixed-position',scroll>=120);};$win.scroll(onSCroll);onSCroll();var $openClose=$('.open-close');if($openClose.length){$openClose.openClose({activeClass:'active',opener:'.cart',slider:'.drop-down',hideOnClickOutside:true,animSpeed:0,effect:'slide'});}
var $langHolder=$('.language-holder');if($langHolder.length){$langHolder.openClose({activeClass:'active',opener:'.lang-opener',slider:'.lang-slide',hideOnClickOutside:true,animSpeed:0,effect:'slide'});}
var $footerHolder=$('.footer-holder');if($footerHolder.length){$footerHolder.slideAccordion({opener:'h3',slider:'.slide',collapsible:false,animSpeed:300});}
var $detailAcc=$('.detail-accordion');if($detailAcc.length){$detailAcc.slideAccordion({opener:'> a',slider:'.slide',collapsible:true,animSpeed:300});}
var $fiveColl=$('.has-mega-dropdown .five-col');if($fiveColl.length){$fiveColl.slideAccordion({opener:'.title',slider:'ul',collapsible:false,animSpeed:300});}
$body.search({hideOnClickOutside:true,menuActiveClass:'search-active',menuOpener:'.search-opener',menuDrop:'.form-group'});$body.search({hideOnClickOutside:false,menuActiveClass:'filter-active',menuOpener:'.btn-filter'});}(jQuery));