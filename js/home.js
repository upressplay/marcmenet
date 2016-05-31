$(document).ready(function(){  

	site.home.initialize();

}); 

site.home = {
	
	initialize : function () {


		this.render();

		var thisobj = this;

		$( window ).resize(function() { thisobj.resize(); });
	    
    },
    render : function () {

    	var thisobj = this;

    	site.trace("render");

        $('#about').css({
            "background" : "#222",
            "color":"#FFF",
            });

        $('#home').css({
            "width" : "100%",
            });



    	this.resize();
        
    },    
        
    resize : function () {

    	
    	if(site.device == "mobile") {

            
    	} else {

            
    	}

        $('#about').css({
            "padding":this.about_p()+"px"
            });

        $('#home').css({
            "margin-top":this.home_t()+"px"
            });

        
            
    },

    home_t : function () {
        var value = 100 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .1;
        return value;
    },

    about_p : function () {
        var value = 100 * site.site_scale();
        if(site.device == "mobile") value = site.window_width() * .07;
        return value;
    },

};
