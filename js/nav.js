$(document).ready(function(){  

	site.nav.initialize();

}); 

site.nav = {
	
	initialize : function () {


		this.render();

		var thisobj = this;

		$( window ).resize(function() { thisobj.resize(); });
	    
    },
    render : function () {

    	var thisobj = this;

    	site.trace("render");

        $('#top_nav').css({
            "display":"block",
            "position":"absolute",
            "width":"100%",
            "background" : "rgba(0,0,0,0.4)",
            "text-align":"center",
            "z-index":"200",
            "top":this.top_nav_t()+"px",
            "left":"0"
            });

        $('#site_logo').css({
            "display":"block",
            "position":"absolute",
            "background":"#222222",
            "text-align":"center",
            "z-index":"201",
            "top":this.site_logo_wh() * -1+"px",
            "cursor":"pointer"
            });

        

        $('#nav_btns').css({
            "float":"right",
        });

        $('.nav_link').click(function(event){
            var id = $(this).attr('href');
            id = id.replace('/', '');
            site.trace("nav_btns a id "+id);           
            event.preventDefault();
            thisobj.nav_handler(id);
            
        });

        $('.nav_btn').css({
            "display":"inline-block",
            "text-align":"center",
            "font-family":"sf_movie_posterbold",
            "color":"#fff",
            "vertical-align":"top"
            });

        if(site.device == "desktop") {
            $('.nav_btn').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#b5b5b5", ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('.nav_btn').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#FFF", ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }

        $('.social_btn').css({
            "display":"inline-block",
            "text-align":"center",
            "color":"#fff",
            "vertical-align":"top"
            });

        if(site.device == "desktop") {
            $('.social_btn').mouseenter(function (event){  
               TweenMax.to($( this ), .25, {color:"#b5b5b5", ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('.social_btn').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {color:"#FFF", ease:"Power1.easeInOut", overwrite:2}); 
            });    

            $('.img_btn').mouseenter(function (event){  
                TweenMax.to($( this ).find('.img_btn_rest'), .5, {opacity:0, ease:"Power1.easeInOut", overwrite:2}); 
                TweenMax.to($( this ).find('.img_btn_roll'), .5, {opacity:1, ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('.img_btn').mouseleave(function (event){  
                TweenMax.to($( this ).find('.img_btn_rest'), .5, {opacity:1, ease:"Power1.easeInOut", overwrite:2}); 
                TweenMax.to($( this ).find('.img_btn_roll'), .5, {opacity:0, ease:"Power1.easeInOut", overwrite:2}); 
            });   
        }

        $('.img_btn').css({
            "display":"inline-block",
            "text-align":"center",
            "vertical-align":"top"
            });

        $('.img_btn_holder').css({
            "position":"relative",
            "width":"100%",
            "height":"100%"
            });

        $('.img_btn_rest').css({
            "position":"absolute",

            });

        $('.img_btn_roll').css({
            "position":"absolute",
            "opacity":"0",
            });

        $('.img_btn img').css({
            "width":"100%",
            "height":"auto"
            });
    	
        TweenMax.to($( "#site_logo" ), .5, {top:"0", ease:"Power1.easeInOut", overwrite:2}); 

        TweenMax.to($("#top_nav"), .5, {delay:.25, top:"0", ease:"Power1.easeInOut", overwrite:2}); 


    	this.resize();

        if(site.segments[0] != "" && site.segments[1] == undefined) {
            TweenMax.delayedCall(1, thisobj.scroll_to, ["#"+site.segments[0]], this);
        }
        
    },

    nav_handler : function (id) {

        site.trace("nav_handler id = "+id)   
        this.scroll_to("#"+id);
        site.set_url(id);
    },

    scroll_to :function (val) {
        site.trace("scroll_to val = "+val)
        var this_position = $( val ).position();
        this_position = this_position.top - $('#top_nav').height();
        site.trace("this_offset = "+this_position);

        TweenMax.to($( '#site_holder' ), 1, {delay:.5, scrollTo:{y:this_position}, ease:"Power2.easeOut"});
    },

    
        
    resize : function () {

    	
    	if(site.device == "mobile") {

            
    	} else {

            
    	}

        $('.nav_btn').css({
            "font-size":this.nav_btn_size()+"px",
            "padding":this.nav_btn_p()+"px"
            });

		$('#site_logo').css({
            "width":this.site_logo_wh()+"px",
            "height":this.site_logo_wh()+"px",
            "left":this.site_logo_l()+"px"
            });

        $('#nav_btns').css({
            "padding-right":this.nav_btns_r()+"px",
        });

        $('.social_btn').css({
            "font-size":this.social_btn_size()+"px",
            "line-height":this.social_btn_leading()+"px",
            "padding":this.social_btn_p()+"px"
            });
            
        $('.img_btn').add('.img_btn_holder').add('.img_btn_rest').add('.img_btn_roll').css({
            "width":this.img_btn_w()+"px",
            "height":this.img_btn_h()+"px",
            });
    },

    img_btn_w : function () {
        var value = 95 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    },

    img_btn_h : function () {
        var value = this.img_btn_w() * (100/105);
        return value;
    },

    social_btn_leading : function () {
        var value = 52 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .06;
        return value;
    },

    social_btn_p : function () {
        var value = 20 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .02;
        return value;
    },

    social_btn_size : function () {
        var value = 35 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    },

    nav_btns_r : function () {
        var value = 20 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .05;
        return value;
    },

    site_logo_l : function () {
        var value = 70 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .04;
        return value;
    },

    site_logo_wh : function () {
        var value = 152 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .15;
        return value;
    },

    nav_btn_p : function () {
        var value = 15 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .02;
        return value;
    },

    nav_btn_size : function () {
        var value = 60 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .06;
        return value;
    },

    top_nav_t : function () {
        var value = -72 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * -.1;
        return value;
    },
    

};
