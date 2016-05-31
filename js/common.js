$(document).ready(function(){  

	site.common.initialize();

}); 

site.common = {
	
	initialize : function () {


		this.render();

		var thisobj = this;

		$( window ).resize(function() { thisobj.resize(); });
	    
    },
    render : function () {

    	var thisobj = this;

    	site.trace("render");

        $('.white_title').css({
            "font-family":"sf_movie_posterbold",
            "color":"#FFF",
            "text-transform":"uppercase"
            });

        $('.white_desc').css({
            "color":"#FFF",
            });

        $('.black_section_title').css({
            "font-family":"sf_movie_posterbold",
            "color":"#000",
            });

        $('.white_seciton_title').css({
            "font-family":"sf_movie_posterbold",
            "color":"#FFF",
            });

    	this.resize();
        
    },

        
    resize : function () {

    	
    	if(site.device == "mobile") {

            
    	} else {

            
    	}

        $('.white_title').css({
            "font-size":this.white_title_size()+"px",
            "line-height":this.white_title_leading()+"px",
            });

        $('.white_desc').css({
            "font-size":this.white_desc_size()+"px",
            "line-height":this.white_desc_leading()+"px",
            });

        $('.black_section_title').add('.white_seciton_title').css({
            "font-size":this.black_section_title_size()+"px",
            "line-height":this.black_section_title_leading()+"px",
            });
            
    },

    black_section_title_size : function () {
        var value = 130 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .11;
        return value;
    },

    black_section_title_leading : function () {
        var value = 260 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .14;
        return value;
    },

    white_desc_size : function () {
        var value = 18 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .03;
        return value;
    },

    white_desc_leading : function () {
        var value = 30 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .04;
        return value;
    },

    white_title_size : function () {
        var value = 72 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .08;
        return value;
    },

    white_title_leading : function () {
        var value = 90 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .15;
        return value;
    },

};
