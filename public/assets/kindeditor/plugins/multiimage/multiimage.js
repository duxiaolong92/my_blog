/*******************************************************************************
* KindEditor - WYSIWYG HTML Editor for Internet
* Copyright (C) 2006-2011 kindsoft.net
*
* @author Roddy <luolonghao@gmail.com>
* @site http://www.kindsoft.net/
* @licence http://www.kindsoft.net/license.php
*******************************************************************************/
!function(e){function t(e){this.init(e)}e.extend(t,{init:function(t){function n(t,n){e(".ke-status > div",t).hide(),e(".ke-message",t).addClass("ke-error").show().html(e.escape(n))}var i=this;t.afterError=t.afterError||function(e){alert(e)},i.options=t,i.progressbars={},i.div=e(t.container).html(['<div class="ke-swfupload">','<div class="ke-swfupload-top">','<div class="ke-inline-block ke-swfupload-button">','<input type="button" value="Browse" />',"</div>",'<div class="ke-inline-block ke-swfupload-desc">'+t.uploadDesc+"</div>",'<span class="ke-button-common ke-button-outer ke-swfupload-startupload">','<input type="button" class="ke-button-common ke-button" value="'+t.startButtonValue+'" />',"</span>","</div>",'<div class="ke-swfupload-body"></div>',"</div>"].join("")),i.bodyDiv=e(".ke-swfupload-body",i.div);var a={debug:!1,upload_url:t.uploadUrl,flash_url:t.flashUrl,file_post_name:t.filePostName,button_placeholder:e(".ke-swfupload-button > input",i.div)[0],button_image_url:t.buttonImageUrl,button_width:t.buttonWidth,button_height:t.buttonHeight,button_cursor:SWFUpload.CURSOR.HAND,file_types:t.fileTypes,file_types_description:t.fileTypesDesc,file_upload_limit:t.fileUploadLimit,file_size_limit:t.fileSizeLimit,post_params:t.postParams,file_queued_handler:function(e){e.url=i.options.fileIconUrl,i.appendFile(e)},file_queue_error_handler:function(n,i){var a="";switch(i){case SWFUpload.QUEUE_ERROR.QUEUE_LIMIT_EXCEEDED:a=t.queueLimitExceeded;break;case SWFUpload.QUEUE_ERROR.FILE_EXCEEDS_SIZE_LIMIT:a=t.fileExceedsSizeLimit;break;case SWFUpload.QUEUE_ERROR.ZERO_BYTE_FILE:a=t.zeroByteFile;break;case SWFUpload.QUEUE_ERROR.INVALID_FILETYPE:a=t.invalidFiletype;break;default:a=t.unknownError}e.DEBUG&&alert(a)},upload_start_handler:function(t){var n=this,i=e('div[data-id="'+t.id+'"]',n.bodyDiv);e(".ke-status > div",i).hide(),e(".ke-progressbar",i).show()},upload_progress_handler:function(e,t,n){var a=Math.round(100*t/n),r=i.progressbars[e.id];r.bar.css("width",Math.round(80*a/100)+"px"),r.percent.html(a+"%")},upload_error_handler:function(t){if(t&&t.filestatus==SWFUpload.FILE_STATUS.ERROR){var a=e('div[data-id="'+t.id+'"]',i.bodyDiv).eq(0);n(a,i.options.errorMessage)}},upload_success_handler:function(t,a){var r=e('div[data-id="'+t.id+'"]',i.bodyDiv).eq(0),o={};try{o=e.json(a)}catch(s){i.options.afterError.call(this,"<!doctype html><html>"+a+"</html>")}return 0!==o.error?(n(r,e.DEBUG?o.message:i.options.errorMessage),void 0):(t.url=o.url,e(".ke-img",r).attr("src",t.url).attr("data-status",t.filestatus).data("data",o),e(".ke-status > div",r).hide(),void 0)}};i.swfu=new SWFUpload(a),e(".ke-swfupload-startupload input",i.div).click(function(){i.swfu.startUpload()})},getUrlList:function(){var t=[];return e(".ke-img",self.bodyDiv).each(function(){var n=e(this),i=n.attr("data-status");i==SWFUpload.FILE_STATUS.COMPLETE&&t.push(n.data("data"))}),t},removeFile:function(t){var n=this;n.swfu.cancelUpload(t);var i=e('div[data-id="'+t+'"]',n.bodyDiv);e(".ke-photo",i).unbind(),e(".ke-delete",i).unbind(),i.remove()},removeFiles:function(){var t=this;e(".ke-item",t.bodyDiv).each(function(){t.removeFile(e(this).attr("data-id"))})},appendFile:function(t){var n=this,i=e('<div class="ke-inline-block ke-item" data-id="'+t.id+'"></div>');n.bodyDiv.append(i);var a=e('<div class="ke-inline-block ke-photo"></div>').mouseover(function(){e(this).addClass("ke-on")}).mouseout(function(){e(this).removeClass("ke-on")});i.append(a);var r=e('<img src="'+t.url+'" class="ke-img" data-status="'+t.filestatus+'" width="80" height="80" alt="'+t.name+'" />');a.append(r),e('<span class="ke-delete"></span>').appendTo(a).click(function(){n.removeFile(t.id)});var o=e('<div class="ke-status"></div>').appendTo(a);e(['<div class="ke-progressbar">','<div class="ke-progressbar-bar"><div class="ke-progressbar-bar-inner"></div></div>','<div class="ke-progressbar-percent">0%</div></div>'].join("")).hide().appendTo(o),e('<div class="ke-message">'+n.options.pendingMessage+"</div>").appendTo(o),i.append('<div class="ke-name">'+t.name+"</div>"),n.progressbars[t.id]={bar:e(".ke-progressbar-bar-inner",a),percent:e(".ke-progressbar-percent",a)}},remove:function(){this.removeFiles(),this.swfu.destroy(),this.div.html("")}}),e.swfupload=function(e,n){return new t(e,n)}}(KindEditor),KindEditor.plugin("multiimage",function(e){var t=this,n="multiimage",i=(e.undef(t.formatUploadUrl,!0),e.undef(t.uploadJson,t.basePath+"php/upload_json.php")),a=t.pluginsPath+"multiimage/images/",r=e.undef(t.imageSizeLimit,"1MB"),o=(e.undef(t.imageFileTypes,"*.jpg;*.gif;*.png"),e.undef(t.imageUploadLimit,20)),s=e.undef(t.filePostName,"imgFile"),l=t.lang(n+".");t.plugin.multiImageDialog=function(d){var c=d.clickFn,u=e.tmpl(l.uploadDesc,{uploadLimit:o,sizeLimit:r}),h=['<div style="padding:20px;">','<div class="swfupload">',"</div>","</div>"].join(""),f=t.createDialog({name:n,width:650,height:510,title:t.lang(n),body:h,previewBtn:{name:l.insertAll,click:function(){c.call(t,m.getUrlList())}},yesBtn:{name:l.clearAll,click:function(){m.removeFiles()}},beforeRemove:function(){(!e.IE||e.V<=8)&&m.remove()}}),p=f.div,m=e.swfupload({container:e(".swfupload",p),buttonImageUrl:a+("zh_CN"==t.langType?"select-files-zh_CN.png":"select-files-en.png"),buttonWidth:"zh_CN"==t.langType?72:88,buttonHeight:23,fileIconUrl:a+"image.png",uploadDesc:u,startButtonValue:l.startUpload,uploadUrl:e.addParam(i,"dir=image"),flashUrl:a+"swfupload.swf",filePostName:s,fileTypes:"*.jpg;*.jpeg;*.gif;*.png;*.bmp",fileTypesDesc:"Image Files",fileUploadLimit:o,fileSizeLimit:r,postParams:e.undef(t.extraFileUploadParams,{}),queueLimitExceeded:l.queueLimitExceeded,fileExceedsSizeLimit:l.fileExceedsSizeLimit,zeroByteFile:l.zeroByteFile,invalidFiletype:l.invalidFiletype,unknownError:l.unknownError,pendingMessage:l.pending,errorMessage:l.uploadError,afterError:function(e){t.errorDialog(e)}});return f},t.clickToolbar(n,function(){t.plugin.multiImageDialog({clickFn:function(n){0!==n.length&&(e.each(n,function(e,n){t.afterUpload&&t.afterUpload.call(t,n.url,n,"multiimage"),t.exec("insertimage",n.url,n.title,n.width,n.height,n.border,n.align)}),setTimeout(function(){t.hideDialog().focus()},0))}})})}),function(){window.SWFUpload||(window.SWFUpload=function(e){this.initSWFUpload(e)},SWFUpload.prototype.initSWFUpload=function(e){try{this.customSettings={},this.settings=e,this.eventQueue=[],this.movieName="SWFUpload_"+SWFUpload.movieCount++,this.movieElement=null,SWFUpload.instances[this.movieName]=this,this.initSettings(),this.loadFlash(),this.displayDebugInfo()}catch(t){throw delete SWFUpload.instances[this.movieName],t}},SWFUpload.instances={},SWFUpload.movieCount=0,SWFUpload.version="2.2.0 2009-03-25",SWFUpload.QUEUE_ERROR={QUEUE_LIMIT_EXCEEDED:-100,FILE_EXCEEDS_SIZE_LIMIT:-110,ZERO_BYTE_FILE:-120,INVALID_FILETYPE:-130},SWFUpload.UPLOAD_ERROR={HTTP_ERROR:-200,MISSING_UPLOAD_URL:-210,IO_ERROR:-220,SECURITY_ERROR:-230,UPLOAD_LIMIT_EXCEEDED:-240,UPLOAD_FAILED:-250,SPECIFIED_FILE_ID_NOT_FOUND:-260,FILE_VALIDATION_FAILED:-270,FILE_CANCELLED:-280,UPLOAD_STOPPED:-290},SWFUpload.FILE_STATUS={QUEUED:-1,IN_PROGRESS:-2,ERROR:-3,COMPLETE:-4,CANCELLED:-5},SWFUpload.BUTTON_ACTION={SELECT_FILE:-100,SELECT_FILES:-110,START_UPLOAD:-120},SWFUpload.CURSOR={ARROW:-1,HAND:-2},SWFUpload.WINDOW_MODE={WINDOW:"window",TRANSPARENT:"transparent",OPAQUE:"opaque"},SWFUpload.completeURL=function(e){if("string"!=typeof e||e.match(/^https?:\/\//i)||e.match(/^\//))return e;window.location.protocol+"//"+window.location.hostname+(window.location.port?":"+window.location.port:"");var t=window.location.pathname.lastIndexOf("/");return path=0>=t?"/":window.location.pathname.substr(0,t)+"/",path+e},SWFUpload.prototype.initSettings=function(){this.ensureDefault=function(e,t){this.settings[e]=void 0==this.settings[e]?t:this.settings[e]},this.ensureDefault("upload_url",""),this.ensureDefault("preserve_relative_urls",!1),this.ensureDefault("file_post_name","Filedata"),this.ensureDefault("post_params",{}),this.ensureDefault("use_query_string",!1),this.ensureDefault("requeue_on_error",!1),this.ensureDefault("http_success",[]),this.ensureDefault("assume_success_timeout",0),this.ensureDefault("file_types","*.*"),this.ensureDefault("file_types_description","All Files"),this.ensureDefault("file_size_limit",0),this.ensureDefault("file_upload_limit",0),this.ensureDefault("file_queue_limit",0),this.ensureDefault("flash_url","swfupload.swf"),this.ensureDefault("prevent_swf_caching",!0),this.ensureDefault("button_image_url",""),this.ensureDefault("button_width",1),this.ensureDefault("button_height",1),this.ensureDefault("button_text",""),this.ensureDefault("button_text_style","color: #000000; font-size: 16pt;"),this.ensureDefault("button_text_top_padding",0),this.ensureDefault("button_text_left_padding",0),this.ensureDefault("button_action",SWFUpload.BUTTON_ACTION.SELECT_FILES),this.ensureDefault("button_disabled",!1),this.ensureDefault("button_placeholder_id",""),this.ensureDefault("button_placeholder",null),this.ensureDefault("button_cursor",SWFUpload.CURSOR.ARROW),this.ensureDefault("button_window_mode",SWFUpload.WINDOW_MODE.WINDOW),this.ensureDefault("debug",!1),this.settings.debug_enabled=this.settings.debug,this.settings.return_upload_start_handler=this.returnUploadStart,this.ensureDefault("swfupload_loaded_handler",null),this.ensureDefault("file_dialog_start_handler",null),this.ensureDefault("file_queued_handler",null),this.ensureDefault("file_queue_error_handler",null),this.ensureDefault("file_dialog_complete_handler",null),this.ensureDefault("upload_start_handler",null),this.ensureDefault("upload_progress_handler",null),this.ensureDefault("upload_error_handler",null),this.ensureDefault("upload_success_handler",null),this.ensureDefault("upload_complete_handler",null),this.ensureDefault("debug_handler",this.debugMessage),this.ensureDefault("custom_settings",{}),this.customSettings=this.settings.custom_settings,this.settings.prevent_swf_caching&&(this.settings.flash_url=this.settings.flash_url+(this.settings.flash_url.indexOf("?")<0?"?":"&")+"preventswfcaching="+(new Date).getTime()),this.settings.preserve_relative_urls||(this.settings.upload_url=SWFUpload.completeURL(this.settings.upload_url),this.settings.button_image_url=SWFUpload.completeURL(this.settings.button_image_url)),delete this.ensureDefault},SWFUpload.prototype.loadFlash=function(){var e,t;if(null!==document.getElementById(this.movieName))throw"ID "+this.movieName+" is already in use. The Flash Object could not be added";if(e=document.getElementById(this.settings.button_placeholder_id)||this.settings.button_placeholder,void 0==e)throw"Could not find the placeholder element: "+this.settings.button_placeholder_id;t=document.createElement("div"),t.innerHTML=this.getFlashHTML(),e.parentNode.replaceChild(t.firstChild,e),void 0==window[this.movieName]&&(window[this.movieName]=this.getMovieElement())},SWFUpload.prototype.getFlashHTML=function(){var e="";return KindEditor.IE&&KindEditor.V>8&&(e=' classid = "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"'),['<object id="',this.movieName,'"'+e+' type="application/x-shockwave-flash" data="',this.settings.flash_url,'" width="',this.settings.button_width,'" height="',this.settings.button_height,'" class="swfupload">','<param name="wmode" value="',this.settings.button_window_mode,'" />','<param name="movie" value="',this.settings.flash_url,'" />','<param name="quality" value="high" />','<param name="menu" value="false" />','<param name="allowScriptAccess" value="always" />','<param name="flashvars" value="'+this.getFlashVars()+'" />',"</object>"].join("")},SWFUpload.prototype.getFlashVars=function(){var e=this.buildParamString(),t=this.settings.http_success.join(",");return["movieName=",encodeURIComponent(this.movieName),"&amp;uploadURL=",encodeURIComponent(this.settings.upload_url),"&amp;useQueryString=",encodeURIComponent(this.settings.use_query_string),"&amp;requeueOnError=",encodeURIComponent(this.settings.requeue_on_error),"&amp;httpSuccess=",encodeURIComponent(t),"&amp;assumeSuccessTimeout=",encodeURIComponent(this.settings.assume_success_timeout),"&amp;params=",encodeURIComponent(e),"&amp;filePostName=",encodeURIComponent(this.settings.file_post_name),"&amp;fileTypes=",encodeURIComponent(this.settings.file_types),"&amp;fileTypesDescription=",encodeURIComponent(this.settings.file_types_description),"&amp;fileSizeLimit=",encodeURIComponent(this.settings.file_size_limit),"&amp;fileUploadLimit=",encodeURIComponent(this.settings.file_upload_limit),"&amp;fileQueueLimit=",encodeURIComponent(this.settings.file_queue_limit),"&amp;debugEnabled=",encodeURIComponent(this.settings.debug_enabled),"&amp;buttonImageURL=",encodeURIComponent(this.settings.button_image_url),"&amp;buttonWidth=",encodeURIComponent(this.settings.button_width),"&amp;buttonHeight=",encodeURIComponent(this.settings.button_height),"&amp;buttonText=",encodeURIComponent(this.settings.button_text),"&amp;buttonTextTopPadding=",encodeURIComponent(this.settings.button_text_top_padding),"&amp;buttonTextLeftPadding=",encodeURIComponent(this.settings.button_text_left_padding),"&amp;buttonTextStyle=",encodeURIComponent(this.settings.button_text_style),"&amp;buttonAction=",encodeURIComponent(this.settings.button_action),"&amp;buttonDisabled=",encodeURIComponent(this.settings.button_disabled),"&amp;buttonCursor=",encodeURIComponent(this.settings.button_cursor)].join("")},SWFUpload.prototype.getMovieElement=function(){if(void 0==this.movieElement&&(this.movieElement=document.getElementById(this.movieName)),null===this.movieElement)throw"Could not find Flash element";return this.movieElement},SWFUpload.prototype.buildParamString=function(){var e=this.settings.post_params,t=[];if("object"==typeof e)for(var n in e)e.hasOwnProperty(n)&&t.push(encodeURIComponent(n.toString())+"="+encodeURIComponent(e[n].toString()));return t.join("&amp;")},SWFUpload.prototype.destroy=function(){try{this.cancelUpload(null,!1);var e=null;if(e=this.getMovieElement(),e&&"unknown"==typeof e.CallFunction){for(var t in e)try{"function"==typeof e[t]&&(e[t]=null)}catch(n){}try{e.parentNode.removeChild(e)}catch(i){}}return window[this.movieName]=null,SWFUpload.instances[this.movieName]=null,delete SWFUpload.instances[this.movieName],this.movieElement=null,this.settings=null,this.customSettings=null,this.eventQueue=null,this.movieName=null,!0}catch(a){return!1}},SWFUpload.prototype.displayDebugInfo=function(){this.debug(["---SWFUpload Instance Info---\n","Version: ",SWFUpload.version,"\n","Movie Name: ",this.movieName,"\n","Settings:\n","	","upload_url:               ",this.settings.upload_url,"\n","	","flash_url:                ",this.settings.flash_url,"\n","	","use_query_string:         ",this.settings.use_query_string.toString(),"\n","	","requeue_on_error:         ",this.settings.requeue_on_error.toString(),"\n","	","http_success:             ",this.settings.http_success.join(", "),"\n","	","assume_success_timeout:   ",this.settings.assume_success_timeout,"\n","	","file_post_name:           ",this.settings.file_post_name,"\n","	","post_params:              ",this.settings.post_params.toString(),"\n","	","file_types:               ",this.settings.file_types,"\n","	","file_types_description:   ",this.settings.file_types_description,"\n","	","file_size_limit:          ",this.settings.file_size_limit,"\n","	","file_upload_limit:        ",this.settings.file_upload_limit,"\n","	","file_queue_limit:         ",this.settings.file_queue_limit,"\n","	","debug:                    ",this.settings.debug.toString(),"\n","	","prevent_swf_caching:      ",this.settings.prevent_swf_caching.toString(),"\n","	","button_placeholder_id:    ",this.settings.button_placeholder_id.toString(),"\n","	","button_placeholder:       ",this.settings.button_placeholder?"Set":"Not Set","\n","	","button_image_url:         ",this.settings.button_image_url.toString(),"\n","	","button_width:             ",this.settings.button_width.toString(),"\n","	","button_height:            ",this.settings.button_height.toString(),"\n","	","button_text:              ",this.settings.button_text.toString(),"\n","	","button_text_style:        ",this.settings.button_text_style.toString(),"\n","	","button_text_top_padding:  ",this.settings.button_text_top_padding.toString(),"\n","	","button_text_left_padding: ",this.settings.button_text_left_padding.toString(),"\n","	","button_action:            ",this.settings.button_action.toString(),"\n","	","button_disabled:          ",this.settings.button_disabled.toString(),"\n","	","custom_settings:          ",this.settings.custom_settings.toString(),"\n","Event Handlers:\n","	","swfupload_loaded_handler assigned:  ",("function"==typeof this.settings.swfupload_loaded_handler).toString(),"\n","	","file_dialog_start_handler assigned: ",("function"==typeof this.settings.file_dialog_start_handler).toString(),"\n","	","file_queued_handler assigned:       ",("function"==typeof this.settings.file_queued_handler).toString(),"\n","	","file_queue_error_handler assigned:  ",("function"==typeof this.settings.file_queue_error_handler).toString(),"\n","	","upload_start_handler assigned:      ",("function"==typeof this.settings.upload_start_handler).toString(),"\n","	","upload_progress_handler assigned:   ",("function"==typeof this.settings.upload_progress_handler).toString(),"\n","	","upload_error_handler assigned:      ",("function"==typeof this.settings.upload_error_handler).toString(),"\n","	","upload_success_handler assigned:    ",("function"==typeof this.settings.upload_success_handler).toString(),"\n","	","upload_complete_handler assigned:   ",("function"==typeof this.settings.upload_complete_handler).toString(),"\n","	","debug_handler assigned:             ",("function"==typeof this.settings.debug_handler).toString(),"\n"].join(""))},SWFUpload.prototype.addSetting=function(e,t,n){return this.settings[e]=void 0==t?n:t},SWFUpload.prototype.getSetting=function(e){return void 0!=this.settings[e]?this.settings[e]:""},SWFUpload.prototype.callFlash=function(functionName,argumentArray){argumentArray=argumentArray||[];var movieElement=this.getMovieElement(),returnValue,returnString;try{returnString=movieElement.CallFunction('<invoke name="'+functionName+'" returntype="javascript">'+__flash__argumentsToXML(argumentArray,0)+"</invoke>"),returnValue=eval(returnString)}catch(ex){throw"Call to "+functionName+" failed"}return void 0!=returnValue&&"object"==typeof returnValue.post&&(returnValue=this.unescapeFilePostParams(returnValue)),returnValue},SWFUpload.prototype.selectFile=function(){this.callFlash("SelectFile")},SWFUpload.prototype.selectFiles=function(){this.callFlash("SelectFiles")},SWFUpload.prototype.startUpload=function(e){this.callFlash("StartUpload",[e])},SWFUpload.prototype.cancelUpload=function(e,t){t!==!1&&(t=!0),this.callFlash("CancelUpload",[e,t])},SWFUpload.prototype.stopUpload=function(){this.callFlash("StopUpload")},SWFUpload.prototype.getStats=function(){return this.callFlash("GetStats")},SWFUpload.prototype.setStats=function(e){this.callFlash("SetStats",[e])},SWFUpload.prototype.getFile=function(e){return"number"==typeof e?this.callFlash("GetFileByIndex",[e]):this.callFlash("GetFile",[e])},SWFUpload.prototype.addFileParam=function(e,t,n){return this.callFlash("AddFileParam",[e,t,n])},SWFUpload.prototype.removeFileParam=function(e,t){this.callFlash("RemoveFileParam",[e,t])},SWFUpload.prototype.setUploadURL=function(e){this.settings.upload_url=e.toString(),this.callFlash("SetUploadURL",[e])},SWFUpload.prototype.setPostParams=function(e){this.settings.post_params=e,this.callFlash("SetPostParams",[e])},SWFUpload.prototype.addPostParam=function(e,t){this.settings.post_params[e]=t,this.callFlash("SetPostParams",[this.settings.post_params])},SWFUpload.prototype.removePostParam=function(e){delete this.settings.post_params[e],this.callFlash("SetPostParams",[this.settings.post_params])},SWFUpload.prototype.setFileTypes=function(e,t){this.settings.file_types=e,this.settings.file_types_description=t,this.callFlash("SetFileTypes",[e,t])},SWFUpload.prototype.setFileSizeLimit=function(e){this.settings.file_size_limit=e,this.callFlash("SetFileSizeLimit",[e])},SWFUpload.prototype.setFileUploadLimit=function(e){this.settings.file_upload_limit=e,this.callFlash("SetFileUploadLimit",[e])},SWFUpload.prototype.setFileQueueLimit=function(e){this.settings.file_queue_limit=e,this.callFlash("SetFileQueueLimit",[e])},SWFUpload.prototype.setFilePostName=function(e){this.settings.file_post_name=e,this.callFlash("SetFilePostName",[e])},SWFUpload.prototype.setUseQueryString=function(e){this.settings.use_query_string=e,this.callFlash("SetUseQueryString",[e])},SWFUpload.prototype.setRequeueOnError=function(e){this.settings.requeue_on_error=e,this.callFlash("SetRequeueOnError",[e])},SWFUpload.prototype.setHTTPSuccess=function(e){"string"==typeof e&&(e=e.replace(" ","").split(",")),this.settings.http_success=e,this.callFlash("SetHTTPSuccess",[e])},SWFUpload.prototype.setAssumeSuccessTimeout=function(e){this.settings.assume_success_timeout=e,this.callFlash("SetAssumeSuccessTimeout",[e])},SWFUpload.prototype.setDebugEnabled=function(e){this.settings.debug_enabled=e,this.callFlash("SetDebugEnabled",[e])},SWFUpload.prototype.setButtonImageURL=function(e){void 0==e&&(e=""),this.settings.button_image_url=e,this.callFlash("SetButtonImageURL",[e])},SWFUpload.prototype.setButtonDimensions=function(e,t){this.settings.button_width=e,this.settings.button_height=t;var n=this.getMovieElement();void 0!=n&&(n.style.width=e+"px",n.style.height=t+"px"),this.callFlash("SetButtonDimensions",[e,t])},SWFUpload.prototype.setButtonText=function(e){this.settings.button_text=e,this.callFlash("SetButtonText",[e])},SWFUpload.prototype.setButtonTextPadding=function(e,t){this.settings.button_text_top_padding=t,this.settings.button_text_left_padding=e,this.callFlash("SetButtonTextPadding",[e,t])},SWFUpload.prototype.setButtonTextStyle=function(e){this.settings.button_text_style=e,this.callFlash("SetButtonTextStyle",[e])},SWFUpload.prototype.setButtonDisabled=function(e){this.settings.button_disabled=e,this.callFlash("SetButtonDisabled",[e])},SWFUpload.prototype.setButtonAction=function(e){this.settings.button_action=e,this.callFlash("SetButtonAction",[e])},SWFUpload.prototype.setButtonCursor=function(e){this.settings.button_cursor=e,this.callFlash("SetButtonCursor",[e])},SWFUpload.prototype.queueEvent=function(e,t){void 0==t?t=[]:t instanceof Array||(t=[t]);var n=this;if("function"==typeof this.settings[e])this.eventQueue.push(function(){this.settings[e].apply(this,t)}),setTimeout(function(){n.executeNextEvent()},0);else if(null!==this.settings[e])throw"Event handler "+e+" is unknown or is not a function"},SWFUpload.prototype.executeNextEvent=function(){var e=this.eventQueue?this.eventQueue.shift():null;"function"==typeof e&&e.apply(this)},SWFUpload.prototype.unescapeFilePostParams=function(e){var t,n=/[$]([0-9a-f]{4})/i,i={};if(void 0!=e){for(var a in e.post)if(e.post.hasOwnProperty(a)){t=a;for(var r;null!==(r=n.exec(t));)t=t.replace(r[0],String.fromCharCode(parseInt("0x"+r[1],16)));i[t]=e.post[a]}e.post=i}return e},SWFUpload.prototype.testExternalInterface=function(){try{return this.callFlash("TestExternalInterface")}catch(e){return!1}},SWFUpload.prototype.flashReady=function(){var e=this.getMovieElement();return e?(this.cleanUp(e),this.queueEvent("swfupload_loaded_handler"),void 0):(this.debug("Flash called back ready but the flash movie can't be found."),void 0)},SWFUpload.prototype.cleanUp=function(e){try{if(this.movieElement&&"unknown"==typeof e.CallFunction){this.debug("Removing Flash functions hooks (this should only run in IE and should prevent memory leaks)");for(var t in e)try{"function"==typeof e[t]&&(e[t]=null)}catch(n){}}}catch(i){}window.__flash__removeCallback=function(e,t){try{e&&(e[t]=null)}catch(n){}}},SWFUpload.prototype.fileDialogStart=function(){this.queueEvent("file_dialog_start_handler")},SWFUpload.prototype.fileQueued=function(e){e=this.unescapeFilePostParams(e),this.queueEvent("file_queued_handler",e)},SWFUpload.prototype.fileQueueError=function(e,t,n){e=this.unescapeFilePostParams(e),this.queueEvent("file_queue_error_handler",[e,t,n])},SWFUpload.prototype.fileDialogComplete=function(e,t,n){this.queueEvent("file_dialog_complete_handler",[e,t,n])},SWFUpload.prototype.uploadStart=function(e){e=this.unescapeFilePostParams(e),this.queueEvent("return_upload_start_handler",e)},SWFUpload.prototype.returnUploadStart=function(e){var t;if("function"==typeof this.settings.upload_start_handler)e=this.unescapeFilePostParams(e),t=this.settings.upload_start_handler.call(this,e);else if(void 0!=this.settings.upload_start_handler)throw"upload_start_handler must be a function";void 0===t&&(t=!0),t=!!t,this.callFlash("ReturnUploadStart",[t])},SWFUpload.prototype.uploadProgress=function(e,t,n){e=this.unescapeFilePostParams(e),this.queueEvent("upload_progress_handler",[e,t,n])},SWFUpload.prototype.uploadError=function(e,t,n){e=this.unescapeFilePostParams(e),this.queueEvent("upload_error_handler",[e,t,n])},SWFUpload.prototype.uploadSuccess=function(e,t,n){e=this.unescapeFilePostParams(e),this.queueEvent("upload_success_handler",[e,t,n])},SWFUpload.prototype.uploadComplete=function(e){e=this.unescapeFilePostParams(e),this.queueEvent("upload_complete_handler",e)},SWFUpload.prototype.debug=function(e){this.queueEvent("debug_handler",e)},SWFUpload.prototype.debugMessage=function(e){if(this.settings.debug){var t,n=[];if("object"==typeof e&&"string"==typeof e.name&&"string"==typeof e.message){for(var i in e)e.hasOwnProperty(i)&&n.push(i+": "+e[i]);t=n.join("\n")||"",n=t.split("\n"),t="EXCEPTION: "+n.join("\nEXCEPTION: "),SWFUpload.Console.writeLine(t)}else SWFUpload.Console.writeLine(e)}},SWFUpload.Console={},SWFUpload.Console.writeLine=function(e){var t,n;try{t=document.getElementById("SWFUpload_Console"),t||(n=document.createElement("form"),document.getElementsByTagName("body")[0].appendChild(n),t=document.createElement("textarea"),t.id="SWFUpload_Console",t.style.fontFamily="monospace",t.setAttribute("wrap","off"),t.wrap="off",t.style.overflow="auto",t.style.width="700px",t.style.height="350px",t.style.margin="5px",n.appendChild(t)),t.value+=e+"\n",t.scrollTop=t.scrollHeight-t.clientHeight}catch(i){alert("Exception: "+i.name+" Message: "+i.message)}})}(),function(){"function"==typeof SWFUpload&&(SWFUpload.queue={},SWFUpload.prototype.initSettings=function(e){return function(){"function"==typeof e&&e.call(this),this.queueSettings={},this.queueSettings.queue_cancelled_flag=!1,this.queueSettings.queue_upload_count=0,this.queueSettings.user_upload_complete_handler=this.settings.upload_complete_handler,this.queueSettings.user_upload_start_handler=this.settings.upload_start_handler,this.settings.upload_complete_handler=SWFUpload.queue.uploadCompleteHandler,this.settings.upload_start_handler=SWFUpload.queue.uploadStartHandler,this.settings.queue_complete_handler=this.settings.queue_complete_handler||null}}(SWFUpload.prototype.initSettings),SWFUpload.prototype.startUpload=function(e){this.queueSettings.queue_cancelled_flag=!1,this.callFlash("StartUpload",[e])},SWFUpload.prototype.cancelQueue=function(){this.queueSettings.queue_cancelled_flag=!0,this.stopUpload();for(var e=this.getStats();e.files_queued>0;)this.cancelUpload(),e=this.getStats()},SWFUpload.queue.uploadStartHandler=function(e){var t;return"function"==typeof this.queueSettings.user_upload_start_handler&&(t=this.queueSettings.user_upload_start_handler.call(this,e)),t=t===!1?!1:!0,this.queueSettings.queue_cancelled_flag=!t,t},SWFUpload.queue.uploadCompleteHandler=function(e){var t,n=this.queueSettings.user_upload_complete_handler;if(e.filestatus===SWFUpload.FILE_STATUS.COMPLETE&&this.queueSettings.queue_upload_count++,t="function"==typeof n?n.call(this,e)===!1?!1:!0:e.filestatus===SWFUpload.FILE_STATUS.QUEUED?!1:!0){var i=this.getStats();i.files_queued>0&&this.queueSettings.queue_cancelled_flag===!1?this.startUpload():this.queueSettings.queue_cancelled_flag===!1?(this.queueEvent("queue_complete_handler",[this.queueSettings.queue_upload_count]),this.queueSettings.queue_upload_count=0):(this.queueSettings.queue_cancelled_flag=!1,this.queueSettings.queue_upload_count=0)}})}();