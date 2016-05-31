$(document).ready(function(){  

	site.initialize();

}); 

var site = {
	max_width:1500,
	mobile_width: 700,
	tracking: true,
	debugging:true,
	cdn:"/",
	site_url:"",
    meta_title:"",
    meta_desc:"",
    device:"",
	initialize : function () {

        TweenMax.set($( "#site_holder" ), {opacity:"0"});

		$('#site_holder').css({
    		"display":"block"
    		});

        TweenMax.to($( "#site_holder" ), .5, {opacity:"1", ease:"Power1.easeInOut", overwrite:2}); 


		this.render();

		var thisobj = this;

		$( window ).resize(function() { thisobj.resize(); });
	    
    },
    render : function () {

    	var thisobj = this;

    	site.trace("render");

        $('img').css({
            "width":"100%",
            "height":"auto"
            });

        this.device_detect();

    	this.resize();
        
    },

    nav_handler : function (id) {

       
    },

    trace : function (val, key) {
    	if(this.debugging && window.console) console.log(val);
	    
    },

    pixel_depth : function () {
        var value = window.screen.pixelDepth;
        return value;
    },

    device_detect : function () {

        //site.trace("device_detect")

        var pixelDepth = this.pixel_depth();
        var width = this.window_width();
        var height = this.window_height();
        var isTouchDevice = 'ontouchstart' in document.documentElement;


        if ( this.window_width() < site.mobile_width ) {

            site.trace('mobile on desktop');

            return this.device = 'mobile'
        }
        if( pixelDepth == 24 && isTouchDevice == false ){

            site.trace('desktop');

            return this.device = 'desktop';

        } 
        if ( pixelDepth == 32 && isTouchDevice == true && width >= 768 ) {

            site.trace('tablet');

            return this.device = 'tablet';

        }
        if ( pixelDepth == 32 && isTouchDevice == true && height == 628 || height == 414 ) {

            site.trace('iphone 6+');

            return this.device = 'iphone 6+';

        }
        if ( pixelDepth == 32 && isTouchDevice == true ) {

            site.trace('mobile');

            return this.device = 'mobile';

        }

    },
        
    resize : function () {

        this.device_detect();
    	
		if(site.device == "mobile") {

            


		} else {

            
		}

	
            
    },


    query_string: function (name) {
        var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    },
    
    window_width : function () {
        var value = Math.round($('#site_holder').innerWidth());
        //if(value < this.max_width) value = value - 10;
        return value;
    },
    window_height : function () {
        var value = Math.round($('#site_holder').innerHeight());
        return value;
    },
    site_scale : function () {
        var value = this.window_width()/this.max_width;
        //if(value > 1) value = 1;
        //this.trace("site_scale = "+value);
        return value;
    },
    width : function () {
        var value = this.max_width * this.site_scale();
        return value;
    },
    height : function () {
        var value = this.window_height();
        return value;
    },

    min_height : function () {
        var value = 700 * this.site_scale();
        return value;
    },


    set_storage : function (name,value,exdays)
    {
        localStorage.setItem(name, value);
    },

    get_storage : function(name){
        var value = localStorage.getItem(name);
        return value;
    }, 

    set_url : function (seg1,seg2,seg3,title,desc,img) {
        if (!history.pushState) return;
        var url = "/"+seg1;
        if(seg2 != undefined && seg2 != "") url = url + "/" + seg2;
        if(seg3 != undefined && seg3 != "") url = url + "/" + seg3;

        history.pushState(null, null, url);

        site.trace("set_url title = "+title+" desc = "+desc+" img = "+img);

        if(seg1 == "") {
            title = site.meta_title;
            desc = site.meta_desc;
        }
        if(title == "" || title == undefined || title == null) title = site.meta_title;
        if(desc == "" || desc == undefined || desc == null) desc = site.meta_desc;
        if(img == "" || img == undefined || img == null) img = site.meta_img;

        $("meta[property='og:title']").attr('content', title);
        $("meta[property='og:description']").attr('content', desc);
        $("meta[property='og:image']").attr('content', img);
        $("meta[property='og:url']").attr('content', site.site_url + url);

        
    },

    share : function (val) {
    	site.trace("share val = "+val)

    	var title = "";
    	var desc = "";
    	var url = "";
    	var img = "";
        var hashtag = "furious7"

    	var metas = document.getElementsByTagName('meta');
        var i;
 
	    for (i = 0; i < metas.length; i++) {
	        if (metas[i].getAttribute("property") == "og:title") {
	            title = metas[i].getAttribute("content")
	        }
	        if (metas[i].getAttribute("property") == "og:description") {
	            desc = metas[i].getAttribute("content")
	        }

	        if (metas[i].getAttribute("property") == "og:url") {
	            url = metas[i].getAttribute("content")
	        }

	        if (metas[i].getAttribute("property") == "og:image") {
	            img = metas[i].getAttribute("content")
	        }
	        
	    }

	    if(val == "facebook") {
	    	var share_url = url;
	    	site.trace("share_url = "+share_url)
	    	share_url = encodeURIComponent(share_url);
	    	var url = "https://www.facebook.com/sharer/sharer.php?u="+share_url;
	    	window.open(url, "facebook_share", "width=600, height=400");
	    }

	    if(val == "twitter") {
	    	var share_txt = title;
	    	share_txt = share_txt.substring(0,107);
	    	var share_url = encodeURIComponent(url)
	    	var url = "http://twitter.com/share?text="+share_txt+"&url="+share_url+"&hashtags"+hashtag;
	    	site.trace("twitter_open url = "+url)
	    	window.open(url, "twitter_share", "width=600, height=400");
	    }

	    if(val == "google") {
	    	var share_url = url;
	    	site.trace("share_url = "+share_url)
	    	share_url = encodeURIComponent(share_url);
	    	var url = "https://plus.google.com/share?url="+share_url;
	    	window.open(url, "google_share", "width=600, height=600");
	    }

	    if(val == "linkedin") {
	    	var share_url = url;
	    	site.trace("share_url = "+share_url)
	    	share_url = encodeURIComponent(share_url);
	    	var url = "http://www.linkedin.com/shareArticle?mini=true&url="+url+"&title="+title+"&summary="+desc+"&source=madagascar";
	    	window.open(url, "google_share", "width=600, height=600");
	    }

	    site.trace("title = "+title);
	    site.trace("desc = "+desc);
	    site.trace("url = "+url);
	    site.trace("img = "+img);
 
    },

    div_display : function (id,display) {
        //site.trace("div_display id = "+id+" display = "+display)
        $(id).css({
            "display":display
            });
    },
    div_remove : function (id) {
        site.trace("div_remove id = "+id)
        $(id).remove();
    },
    linkify : function (text,target) {  
        var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;  
        return text.replace(urlRegex, function(url) {  
                return '<a href="' + url + '" target="'+target+'">' + url + '</a>';  
            })  
    }

};
