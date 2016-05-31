$(document).ready(function(){  

	site.footer.initialize();

}); 

site.footer = {
	
	initialize : function () {


		this.render();

		var thisobj = this;

		$( window ).resize(function() { thisobj.resize(); });
	    
    },
    render : function () {

    	var thisobj = this;

    	site.trace("footerrender");

        $('#footer').css({
            "float":"left",
            "width":"100%",
            "background-color":"#4d4d4d",
            "color":"#FFF",
            "text-align":"right"
            });

        

        $('#footer_holder').css({
            "position":"relative",
            });

        $('#top_btn').css({
            "position":"absolute",
            "cursor":"pointer"
            });

        $('#top_btn').click(function(event){
            site.nav.scroll_to("#home");
            
        });

        if(site.device == "desktop") {
            $('#top_btn').mouseenter(function (event){  
               TweenMax.to($( this ), .5, {top:thisobj.top_btn_t_roll()+"px", ease:"Power1.easeInOut", overwrite:2}); 
            });

            $('#top_btn').mouseleave(function (event){  
                TweenMax.to($( this ), .5, {top:thisobj.top_btn_t()+"px", ease:"Power1.easeInOut", overwrite:2}); 
            });      
        }

        $('#copyright').css({
            "float":"right"
            });



        

        this.resize();
        
    },

    
    
        
    resize : function () {

    	
    	if(site.device == "mobile") {

            
    	} else {

            
    	}

        $('#footer').css({
            "font-size":this.footer_size()+"px",
            "line-height":this.footer_leading()+"px",
            "margin-top":this.footer_t()+"px"
            });

        $('#top_btn').css({
            "width":this.top_btn_wh()+"px",
            "left":this.top_btn_l()+"px",
            "top":this.top_btn_t()+"px"
            });

        $('#copyright').css({
            "margin":this.copyright_tb()+"px "+this.copyright_lr()+"px",
            "left":this.top_btn_l()+"px",
            "top":this.top_btn_t()+"px"
            });

        
            
    },

    

    footer_t : function () {
        var value = 40 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .2;
        return value;
    },

    copyright_tb : function () {
        var value = 40 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    copyright_lr : function () {
        var value = 24 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    },

    top_btn_l : function () {
        var value = (site.window_width() - this.top_btn_wh())/2;
        return value;
    },

    top_btn_t : function () {
        var value = -45 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * -.1;
        return value;
    },

    top_btn_t_roll : function () {
        var value = -55 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * -.15;
        return value;
    },

    top_btn_wh : function () {
        var value = 98 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .2;
        return value;
    },

    footer_size : function () {
        var value = 13 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    },

    footer_leading : function () {
        var value = 24 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },



    
    

};
